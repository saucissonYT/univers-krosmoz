

import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, isAbsolute, join, normalize, relative, resolve } from "node:path";
import { createServer } from "node:http";

const root = resolve(".");
const parsedPort = Number.parseInt(process.env.PORT || "3000", 10);
const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3000;
const host = process.env.HOST || "0.0.0.0";
const resendApiKey = process.env.RESEND_API_KEY || "";
const contactTo = process.env.CONTACT_TO || "universkrosmoz@gmail.com";
const resendFrom = process.env.RESEND_FROM || "Univers Krosmoz <onboarding@resend.dev>";
const rateLimit = new Map();
const pageDirectories = [
  "pages/chronologies",
  "pages/contact",
  "pages/histoire",
  "pages/jeux",
  "pages/lexique",
  "pages/media",
  "pages/personnages",
  "pages/regions"
];

const legacyDirectoryRedirects = new Map([
  ["chronologies-html", "pages/chronologies"],
  ["contact-html", "pages/contact"],
  ["histoire-html", "pages/histoire"],
  ["jeux-html", "pages/jeux"],
  ["lexique-html", "pages/lexique"],
  ["media-html", "pages/media"],
  ["personnages-html", "pages/personnages"],
  ["regions-html", "pages/regions"]
]);

const mimeTypes = {
  "": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf"
};

const longCacheExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".ico",
  ".ttf"
]);

function getStaticCacheHeaders(extension) {
  if (longCacheExtensions.has(extension)) {
    return {
      "cache-control": "public, max-age=31536000, immutable"
    };
  }

  if (extension === "") {
    return {
      "cache-control": "no-cache"
    };
  }

  return {
    "cache-control": "no-store"
  };
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function isInsideRoot(filePath) {
  const relativePath = relative(root, filePath);
  return relativePath === "" || (!relativePath.startsWith("..") && !isAbsolute(relativePath));
}

function readBody(request, maxLength = 32_000) {
  return new Promise((resolveBody, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxLength) {
        reject(new Error("payload_too_large"));
        request.destroy();
      }
    });
    request.on("end", () => resolveBody(body));
    request.on("error", reject);
  });
}

function cleanText(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function getIp(request) {
  const forwarded = request.headers["x-forwarded-for"];
  return String(Array.isArray(forwarded) ? forwarded[0] : forwarded || request.socket.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const item = rateLimit.get(ip) || { count: 0, resetAt: now + windowMs };
  if (item.resetAt < now) {
    item.count = 0;
    item.resetAt = now + windowMs;
  }
  item.count += 1;
  rateLimit.set(ip, item);
  return item.count > 5;
}

function findLegacyRedirect(pathname) {
  const legacyDirectoryMatch = pathname.match(/^\/([^/]+-html)\/(.+\.html)$/i);
  if (legacyDirectoryMatch) {
    const [, legacyDirectory, page] = legacyDirectoryMatch;
    const directory = legacyDirectoryRedirects.get(legacyDirectory);
    if (directory) {
      const targetPath = `/${directory}/${page}`;
      const filePath = normalize(join(root, targetPath));
      if (isInsideRoot(filePath) && existsSync(filePath) && statSync(filePath).isFile()) {
        return targetPath;
      }
    }
  }

  if (!/^\/[^/]+\.html$/i.test(pathname) || pathname === "/index") {
    return "";
  }

  const page = pathname.slice(1);
  for (const directory of pageDirectories) {
    const targetPath = `/${directory}/${page}`;
    const filePath = normalize(join(root, targetPath));
    if (isInsideRoot(filePath) && existsSync(filePath) && statSync(filePath).isFile()) {
      return targetPath;
    }
  }

  return "";
}

function redirectPermanent(request, response, location) {
  response.writeHead(301, {
    location,
    "cache-control": "public, max-age=3600"
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  response.end(`Moved permanently to ${location}`);
}

async function handleContact(request, response) {
  if (!resendApiKey) {
    sendJson(response, 500, { ok: false, message: "Le formulaire n'est pas encore configuré." });
    return;
  }

  const ip = getIp(request);
  if (isRateLimited(ip)) {
    sendJson(response, 429, { ok: false, message: "Trop d'envois rapprochés. Réessaie un peu plus tard." });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(request));
  } catch {
    sendJson(response, 400, { ok: false, message: "Message invalide." });
    return;
  }

  const name = cleanText(payload.name, 80);
  const subject = cleanText(payload.subject, 120);
  const message = cleanText(payload.message, 4000);
  const page = cleanText(payload.page, 500);

  if (!name || !subject || message.length < 10) {
    sendJson(response, 400, { ok: false, message: "Vérifie les champs du formulaire." });
    return;
  }

  const emailText = [
    `Nom ou pseudo : ${name}`,
    `Sujet : ${subject}`,
    `Page : ${page || "Non renseignée"}`,
    `IP : ${ip}`,
    "",
    "Message :",
    message
  ].join("\n");

  const resendAbort = AbortSignal.timeout(10_000);
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: resendAbort,
    headers: {
      authorization: `Bearer ${resendApiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [contactTo],
      subject: `[Univers Krosmoz] ${subject}`,
      text: emailText
    })
  });

  if (!resendResponse.ok) {
    sendJson(response, 502, { ok: false, message: "Impossible d'envoyer le message pour le moment." });
    return;
  }

  sendJson(response, 200, { ok: true, message: "Message envoyé. Merci pour ton retour." });
}

async function serveStatic(request, response) {
  const url = new URL(request.url || "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const legacyRedirect = findLegacyRedirect(pathname);
  if (legacyRedirect) {
    redirectPermanent(request, response, `${legacyRedirect}${url.search}`);
    return;
  }

  const requested = pathname === "/" ? "/index" : pathname;
  const routePath = pathname.startsWith("/result:") || pathname.startsWith("/result/")
    ? "/pages/jeux/jeu-personnage"
    : requested;
  const filePath = normalize(join(root, routePath));

  if (!isInsideRoot(filePath) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, {
    ...getStaticCacheHeaders(extension),
    "content-type": mimeTypes[extension] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", "http://localhost");

    if (request.method === "POST" && url.pathname === "/api/contact") {
      await handleContact(request, response);
      return;
    }

    if (request.method === "GET" || request.method === "HEAD") {
      await serveStatic(request, response);
      return;
    }

    response.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
    response.end("Method not allowed");
  } catch {
    sendJson(response, 500, { ok: false, message: "Erreur serveur." });
  }
}).listen(port, host, () => {
  console.log(`Univers Krosmoz listening on ${host}:${port}`);
});
