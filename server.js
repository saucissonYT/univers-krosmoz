

import { createReadStream, existsSync, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
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
const pageLikeRateLimit = new Map();
const pageLikesFile = join(root, "data", "reactions", "page-likes.json");
let pageLikesCache = null;
let pageLikesWriteQueue = Promise.resolve();
const pageDirectories = [
  "pages/chronologies",
  "pages/contact",
  "pages/histoire",
  "pages/jeux",
  "pages/lexique",
  "pages/media",
  "pages/groupes",
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
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
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
  ".mp4",
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

  if (extension === "" || extension === ".html") {
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

function cleanPageKey(value) {
  const page = String(value || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/\.html$/i, "")
    .replace(/\/+$/g, "");

  if (!/^\/pages\/(?:personnages|regions|groupes)\/[a-z0-9-]+(?:-biographie)?$/i.test(page)) {
    return "";
  }

  if (/\/(?:personnages|regions|groupes)$/i.test(page)) {
    return "";
  }

  return page.toLowerCase();
}

function getPageFilePath(page) {
  return normalize(join(root, `${page}.html`));
}

function pageExists(page) {
  const filePath = getPageFilePath(page);
  return isInsideRoot(filePath) && existsSync(filePath) && statSync(filePath).isFile();
}

function cleanVoterId(value) {
  const voterId = String(value || "").trim();
  return /^[a-z0-9._:-]{16,160}$/i.test(voterId) ? voterId : "";
}

function getVoterHash(page, voterId) {
  return createHash("sha256").update(`${page}:${voterId}`).digest("hex");
}

function normalizePageLikesData(data) {
  const normalized = data && typeof data === "object" && data.pages && typeof data.pages === "object"
    ? data
    : { pages: {} };

  for (const [page, entry] of Object.entries(normalized.pages)) {
    if (!cleanPageKey(page) || !pageExists(page) || !entry || typeof entry !== "object") {
      delete normalized.pages[page];
      continue;
    }

    const voters = entry.voters && typeof entry.voters === "object" ? entry.voters : {};
    for (const [hash, status] of Object.entries(voters)) {
      if (!/^[a-f0-9]{64}$/i.test(hash) || status !== "active") {
        delete voters[hash];
      }
    }

    entry.voters = voters;
    entry.count = Object.keys(voters).length;
  }

  return normalized;
}

async function loadPageLikes() {
  if (pageLikesCache) {
    return pageLikesCache;
  }

  try {
    const content = await readFile(pageLikesFile, "utf8");
    const data = JSON.parse(content);
    pageLikesCache = normalizePageLikesData(data);
  } catch {
    pageLikesCache = { pages: {} };
  }

  return pageLikesCache;
}

async function savePageLikes(data) {
  normalizePageLikesData(data);
  pageLikesWriteQueue = pageLikesWriteQueue.then(async () => {
    await mkdir(join(root, "data", "reactions"), { recursive: true });
    await writeFile(pageLikesFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  });

  return pageLikesWriteQueue;
}

function getPageLikeEntry(data, page) {
  if (!data.pages[page]) {
    data.pages[page] = { count: 0, voters: {} };
  }

  const entry = data.pages[page];
  if (!entry.voters || typeof entry.voters !== "object") {
    entry.voters = {};
  }
  entry.count = Math.max(0, Number.parseInt(entry.count || 0, 10) || 0);
  return entry;
}

function getPageLikeStatus(entry, page, voterId) {
  if (!voterId) {
    return "none";
  }

  return entry.voters[getVoterHash(page, voterId)] === "active" ? "active" : "none";
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

function isPageLikeRateLimited(ip, page, voterHash) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const minimumDelayMs = 1200;
  const key = `${ip}:${page}:${voterHash}`;
  const item = pageLikeRateLimit.get(key) || { count: 0, resetAt: now + windowMs, lastAt: 0 };

  if (item.resetAt < now) {
    item.count = 0;
    item.resetAt = now + windowMs;
  }

  const tooSoon = now - item.lastAt < minimumDelayMs;
  item.count += 1;
  item.lastAt = now;
  pageLikeRateLimit.set(key, item);

  if (pageLikeRateLimit.size > 10_000) {
    for (const [storedKey, storedItem] of pageLikeRateLimit) {
      if (storedItem.resetAt < now) {
        pageLikeRateLimit.delete(storedKey);
      }
    }
  }

  return tooSoon || item.count > 20;
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
        return targetPath.replace(/\.html$/i, "");
      }
    }
  }

  if (!/^\/[^/]+\.html$/i.test(pathname) || pathname === "/index.html") {
    return "";
  }

  const page = pathname.slice(1);
  for (const directory of pageDirectories) {
    const targetPath = `/${directory}/${page}`;
    const filePath = normalize(join(root, targetPath));
    if (isInsideRoot(filePath) && existsSync(filePath) && statSync(filePath).isFile()) {
      return targetPath.replace(/\.html$/i, "");
    }
  }

  return "";
}

function findPrettyRedirect(pathname) {
  if (pathname === "/index.html") {
    return "/";
  }

  if (pathname.endsWith(".html")) {
    const filePath = normalize(join(root, pathname));
    if (isInsideRoot(filePath) && existsSync(filePath) && statSync(filePath).isFile()) {
      return pathname.replace(/\.html$/i, "");
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

async function handlePageLikes(request, response, url) {
  const data = await loadPageLikes();

  if (request.method === "GET") {
    const page = cleanPageKey(url.searchParams.get("page"));
    if (!page) {
      sendJson(response, 400, { ok: false, message: "Page invalide." });
      return;
    }
    if (!pageExists(page)) {
      sendJson(response, 404, { ok: false, message: "Page introuvable." });
      return;
    }

    const voterId = cleanVoterId(url.searchParams.get("voterId"));
    const entry = getPageLikeEntry(data, page);
    sendJson(response, 200, {
      ok: true,
      count: entry.count,
      status: getPageLikeStatus(entry, page, voterId)
    });
    return;
  }

  if (request.method !== "POST") {
    response.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
    response.end("Method not allowed");
    return;
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(request, 4_000));
  } catch {
    sendJson(response, 400, { ok: false, message: "Vote invalide." });
    return;
  }

  const page = cleanPageKey(payload.page);
  const voterId = cleanVoterId(payload.voterId);
  const action = payload.action === "unlike" ? "unlike" : "like";

  if (!page || !voterId) {
    sendJson(response, 400, { ok: false, message: "Vote invalide." });
    return;
  }
  if (!pageExists(page)) {
    sendJson(response, 404, { ok: false, message: "Page introuvable." });
    return;
  }

  const entry = getPageLikeEntry(data, page);
  const voterHash = getVoterHash(page, voterId);
  if (isPageLikeRateLimited(getIp(request), page, voterHash)) {
    sendJson(response, 429, {
      ok: false,
      message: "Trop d'actions rapprochées sur cette page. Réessaie dans quelques secondes.",
      count: entry.count,
      status: getPageLikeStatus(entry, page, voterId)
    });
    return;
  }

  const currentStatus = entry.voters[voterHash] || "none";

  if (action === "like" && currentStatus !== "active") {
    entry.voters[voterHash] = "active";
    entry.count += 1;
  } else if (action === "unlike" && currentStatus === "active") {
    delete entry.voters[voterHash];
    entry.count = Math.max(0, entry.count - 1);
  }

  await savePageLikes(data);
  sendJson(response, 200, {
    ok: true,
    count: entry.count,
    status: entry.voters[voterHash] === "active" ? "active" : "none"
  });
}

async function serveStatic(request, response) {
  const url = new URL(request.url || "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const legacyRedirect = findLegacyRedirect(pathname);
  if (legacyRedirect) {
    redirectPermanent(request, response, `${legacyRedirect}${url.search}`);
    return;
  }

  const prettyRedirect = findPrettyRedirect(pathname);
  if (prettyRedirect) {
    redirectPermanent(request, response, `${prettyRedirect}${url.search}`);
    return;
  }

  const requested = pathname === "/" ? "/index.html" : pathname;
  const routePath = pathname.startsWith("/result:") || pathname.startsWith("/result/")
    ? "/pages/jeux/jeu-personnage.html"
    : requested;
  const directFilePath = normalize(join(root, routePath));
  const htmlFilePath = extname(routePath)
    ? directFilePath
    : normalize(join(root, `${routePath}.html`));
  const filePath = existsSync(directFilePath) ? directFilePath : htmlFilePath;

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

    if ((request.method === "GET" || request.method === "POST") && url.pathname === "/api/page-likes") {
      await handlePageLikes(request, response, url);
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
