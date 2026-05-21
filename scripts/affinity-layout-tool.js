import fs from "node:fs/promises";

const HTML_PATH = "media-html/arbre-affinites.html";

const [, , command, ...args] = process.argv;

const usage = `
Usage:
  node scripts/affinity-layout-tool.js audit
  node scripts/affinity-layout-tool.js recenter
  node scripts/affinity-layout-tool.js space-families
  node scripts/affinity-layout-tool.js move-names <dy> <name...>
  node scripts/affinity-layout-tool.js move-region <minCy> <maxCy> <dy>
  node scripts/affinity-layout-tool.js move-title <dy> <title>

Examples:
  node scripts/affinity-layout-tool.js move-names 55 "ELELY DE PERCEDAL" "FLOPIN DE PERCEDAL" "PIN DE PERCEDAL"
  node scripts/affinity-layout-tool.js move-region 6200 7300 120
  node scripts/affinity-layout-tool.js move-title 120 "AUTRES PERSONNAGES DU KROSMOZ"
`;

if (!command) {
  console.log(usage.trim());
  process.exit(0);
}

let html = await fs.readFile(HTML_PATH, "utf8");
const svgMatch = html.match(/<svg\b[\s\S]*?<\/svg>/);

if (!svgMatch) {
  throw new Error(`No inline affinity SVG found in ${HTML_PATH}.`);
}

let svg = svgMatch[0];

function formatNumber(value) {
  return Number(value.toFixed(6)).toString();
}

function shiftNumericAttributes(block, attributes, dy) {
  return attributes.reduce((nextBlock, attribute) => {
    const pattern = new RegExp(`(?<=\\s)${attribute}="(-?\\d*\\.?\\d+)"`, "g");
    return nextBlock.replace(pattern, (_, value) => `${attribute}="${formatNumber(Number(value) + dy)}"`);
  }, block);
}

const FAMILY_ROWS = [
  { start: 300, title: 376, offset: 0, tokenPush: 180 },
  { start: 1000, title: 1150, offset: 1050, tokenPush: 180 },
  { start: 1800, title: 1900, offset: 2100, tokenPush: 180 },
  { start: 2500, title: 2600, offset: 3150, tokenPush: 180 },
  { start: 3300, title: 3400, offset: 4200, tokenPush: 180 },
  { start: 4100, title: 4200, offset: 5250, tokenPush: 180 },
  { start: 4800, title: 4900, offset: 6300, tokenPush: 180 },
  { start: 5400, title: 5485, offset: 7350, tokenPush: 220 },
  { start: 6400, title: 6525, offset: 8850, tokenPush: 220 }
];

const FAMILY_LAYOUT_BOTTOM_PADDING = 460;

function getFamilyRow(y) {
  return FAMILY_ROWS.reduce((current, row) => (y >= row.start ? row : current), FAMILY_ROWS[0]);
}

function layoutY(value, options = {}) {
  const y = Number(value);
  const row = getFamilyRow(y);
  const afterTitle = y > row.title + 18;
  return formatNumber(y + row.offset + (options.isTitle || !afterTitle ? 0 : row.tokenPush));
}

function layoutPathData(data) {
  const tokens = data.match(/[a-zA-Z]|-?\d*\.?\d+/g);
  if (!tokens) {
    return data;
  }

  const output = [];
  let command = "";
  let indexInCommand = 0;
  for (const token of tokens) {
    if (/^[a-zA-Z]$/.test(token)) {
      command = token;
      indexInCommand = 0;
      output.push(token);
      continue;
    }

    let nextToken = token;
    const upperCommand = command.toUpperCase();
    if (upperCommand === "V") {
      nextToken = layoutY(token);
    } else if ((upperCommand === "M" || upperCommand === "L") && indexInCommand % 2 === 1) {
      nextToken = layoutY(token);
    }

    output.push(nextToken);
    indexInCommand += 1;
  }

  return output.join(" ");
}

function spaceFamilies() {
  svg = svg.replace(/<text class="affinity-family-title"[^>]*>/g, (tag) => {
    return tag.replace(/(?<=\s)y="(-?\d*\.?\d+)"/g, (_match, value) => `y="${layoutY(value, { isTitle: true })}"`);
  });

  svg = svg.replace(/<path\b[^>]*\sd="([^"]+)"[^>]*>/g, (tag, data) => {
    return tag.replace(data, layoutPathData(data));
  });

  svg = svg.replace(/<(?!text class="affinity-family-title")[^>]+>/g, (tag) => {
    return tag.replace(/(?<=\s)(cy|y)="(-?\d*\.?\d+)"/g, (_match, attribute, value) => {
      return `${attribute}="${layoutY(value)}"`;
    });
  });

  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1]?.split(/\s+/).map(Number);
  if (viewBox?.length === 4) {
    const nextHeight = viewBox[3] + FAMILY_ROWS[FAMILY_ROWS.length - 1].offset + FAMILY_ROWS[FAMILY_ROWS.length - 1].tokenPush + FAMILY_LAYOUT_BOTTOM_PADDING;
    svg = svg.replace(/viewBox="([^"]+)"/, `viewBox="${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${formatNumber(nextHeight)}"`);
  }

  const height = svg.match(/\sheight="([^"]+)"/)?.[1];
  if (height) {
    svg = svg.replace(/\sheight="([^"]+)"/, ` height="${formatNumber(Number(height) + FAMILY_ROWS[FAMILY_ROWS.length - 1].offset + FAMILY_ROWS[FAMILY_ROWS.length - 1].tokenPush + FAMILY_LAYOUT_BOTTOM_PADDING)}"`);
  }
}

function getCharacterGroups(source) {
  return Array.from(source.matchAll(/<g><clipPath id="clip-restored-\d+">[\s\S]*?<\/g>/g)).map((match) => {
    const block = match[0];
    const name = block.match(/<text[^>]*>([^<]+)<\/text>/)?.[1] || "";
    const circleMatches = Array.from(block.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g));
    const visibleCircle = circleMatches[circleMatches.length - 1];
    return {
      block,
      index: match.index,
      name,
      cx: visibleCircle ? Number(visibleCircle[1]) : null,
      cy: visibleCircle ? Number(visibleCircle[2]) : null,
      r: visibleCircle ? Number(visibleCircle[3]) : null
    };
  });
}

function recenterPortrait(block) {
  const circleMatches = Array.from(block.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g));
  const visibleCircle = circleMatches[circleMatches.length - 1];
  if (!visibleCircle || !block.includes("<image ")) {
    return block;
  }

  const cx = Number(visibleCircle[1]);
  const cy = Number(visibleCircle[2]);
  const r = Number(visibleCircle[3]);

  const clipId = block.match(/<image [^>]*clip-path="url\(#([^)]+)\)"/)?.[1];
  if (clipId && !block.includes(`<clipPath id="${clipId}"`)) {
    block = block.replace("<g>", `<g><clipPath id="${clipId}"><circle cx="${formatNumber(cx)}" cy="${formatNumber(cy)}" r="${formatNumber(r)}"/></clipPath>`);
  }

  block = block.replace(/<clipPath([^>]*)><circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"\/?><\/clipPath>/g, (_match, attrs) => {
    return `<clipPath${attrs}><circle cx="${formatNumber(cx)}" cy="${formatNumber(cy)}" r="${formatNumber(r)}"/></clipPath>`;
  });

  return block.replace(/<image ([^>]*?)x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g, (_match, before, _x, _y, width, height) => {
    const imageWidth = Number(width);
    const imageHeight = Number(height);
    return `<image ${before}x="${formatNumber(cx - imageWidth / 2)}" y="${formatNumber(cy - imageHeight / 2)}" width="${width}" height="${height}"`;
  });
}

function replaceGroup(group, nextBlock) {
  svg = `${svg.slice(0, group.index)}${nextBlock}${svg.slice(group.index + group.block.length)}`;
}

function moveGroup(group, dy) {
  return recenterPortrait(shiftNumericAttributes(group.block, ["y", "cy"], dy));
}

function audit() {
  const bad = [];
  for (const group of getCharacterGroups(svg)) {
    const image = group.block.match(/<image [^>]*x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/);
    if (!image || group.cx == null || group.cy == null) {
      continue;
    }

    const dx = Number(image[1]) + Number(image[3]) / 2 - group.cx;
    const dy = Number(image[2]) + Number(image[4]) / 2 - group.cy;
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      bad.push({ name: group.name, dx: formatNumber(dx), dy: formatNumber(dy) });
    }
  }

  console.log(JSON.stringify({ badCount: bad.length, bad: bad.slice(0, 20) }, null, 2));
  return bad.length;
}

async function writeSvg() {
  html = html.replace(/<svg\b[\s\S]*?<\/svg>/, svg);
  await fs.writeFile(HTML_PATH, html, "utf8");
}

if (command === "audit") {
  process.exitCode = audit() ? 1 : 0;
} else if (command === "recenter") {
  const groups = getCharacterGroups(svg).reverse();
  for (const group of groups) {
    replaceGroup(group, recenterPortrait(group.block));
  }
  await writeSvg();
  audit();
} else if (command === "space-families") {
  spaceFamilies();
  await writeSvg();
  console.log("Family blocks spaced.");
  audit();
} else if (command === "move-names") {
  const dy = Number(args.shift());
  const names = new Set(args.map((name) => name.toUpperCase()));
  if (!Number.isFinite(dy) || !names.size) {
    throw new Error("move-names needs <dy> and at least one name.");
  }

  const groups = getCharacterGroups(svg).filter((group) => names.has(group.name.toUpperCase())).reverse();
  for (const group of groups) {
    replaceGroup(group, moveGroup(group, dy));
  }
  await writeSvg();
  console.log(`Moved ${groups.length} group(s).`);
  audit();
} else if (command === "move-region") {
  const [minCy, maxCy, dy] = args.map(Number);
  if (![minCy, maxCy, dy].every(Number.isFinite)) {
    throw new Error("move-region needs <minCy> <maxCy> <dy>.");
  }

  const groups = getCharacterGroups(svg)
    .filter((group) => group.cy != null && group.cy >= minCy && group.cy <= maxCy)
    .reverse();
  for (const group of groups) {
    replaceGroup(group, moveGroup(group, dy));
  }
  await writeSvg();
  console.log(`Moved ${groups.length} group(s).`);
  audit();
} else if (command === "move-title") {
  const dy = Number(args.shift());
  const title = args.join(" ").toUpperCase();
  if (!Number.isFinite(dy) || !title) {
    throw new Error("move-title needs <dy> and a title.");
  }

  let changed = 0;
  svg = svg.replace(/<text class="affinity-family-title"[^>]*>[^<]+<\/text>/g, (tag) => {
    const label = tag.replace(/<[^>]+>/g, "").trim().toUpperCase();
    if (label !== title) {
      return tag;
    }
    changed += 1;
    return shiftNumericAttributes(tag, ["y"], dy);
  });
  await writeSvg();
  console.log(`Moved ${changed} title(s).`);
} else {
  console.log(usage.trim());
  throw new Error(`Unknown command: ${command}`);
}
