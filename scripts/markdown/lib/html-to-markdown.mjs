// Turns one exported HTML page into the Markdown an agent gets for `Accept: text/markdown`.
// Keeps the page's <main> content; drops navigation, controls, icons and decorative glyphs.
import { parseHTML } from "linkedom";
import TurndownService from "turndown";

const SITE = "https://freetier.wiki";

// Removed before conversion: breadcrumbs, the repeated "On this page" lists, and UI chrome.
// Other navs in <main> are content (category tiles, related lists, changelog pages) and stay.
const DROP = [
  "script", "style", "noscript", "template", "svg", "button", "dialog", "input", "select", "textarea", "[hidden]",
  'nav[aria-label="Breadcrumb"]', 'nav[aria-label="On this page"]',
];

const BLOCK = new Set(["ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "DD", "DETAILS", "DIV", "DL", "DT", "FIGURE", "FOOTER", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HR", "LI", "OL", "P", "PRE", "SECTION", "SUMMARY", "TABLE", "UL"]);
const FORMATTING = new Set(["ABBR", "B", "BR", "CODE", "EM", "I", "KBD", "SMALL", "STRONG", "SUB", "SUP"]);

const role = (node) => node.getAttribute?.("role");
const isLabel = (node) =>
  node.nodeType === 1 && !BLOCK.has(node.nodeName) && !FORMATTING.has(node.nodeName) && !role(node) && node.textContent.trim() !== "";

// Card links wrap a whole tile (name, category, limits). Link only the name and keep the rest as text.
function unwrapCard(link, document) {
  const parts = [...link.children].filter((child) => !FORMATTING.has(child.nodeName));
  if (parts.length < 2) return;
  // The name is the first text in the tile, possibly followed by a count badge in the same span.
  // linkedom splits text at entities ("DevOps ", "&", " CI"), so collect every direct text node.
  const ownText = (node) => [...node.childNodes].filter((child) => child.nodeType === 3);
  const title = [link, ...link.querySelectorAll("*")].find((node) => ownText(node).some((text) => text.textContent.trim()));
  if (!title) return;
  const texts = ownText(title);
  const inner = document.createElement("a");
  inner.setAttribute("href", link.getAttribute("href"));
  inner.textContent = texts.map((text) => text.textContent).join("").trim();
  texts[0].replaceWith(inner);
  for (const text of texts.slice(1)) text.remove();
  // A tile inside a list item stays inline so the list stays tight; loose tiles each get their own block.
  const tile = document.createElement(link.parentNode?.nodeName === "LI" ? "span" : "div");
  tile.append(...link.childNodes);
  link.replaceWith(tile);
}

// Flex and grid gaps separate labels on screen; in text they would run together ("KoyebHosting").
function separateLabels(root, document) {
  for (const parent of [root, ...root.querySelectorAll("*")]) {
    const nodes = [...parent.childNodes].filter((node) => node.nodeType !== 8);
    for (let i = 1; i < nodes.length; i++) {
      const [before, after] = [nodes[i - 1], nodes[i]];
      if (!isLabel(before) || !isLabel(after)) continue;
      if (/[·:(/]\s*$/.test(before.textContent) || /^\s*[·,.;:)]/.test(after.textContent)) continue;
      parent.insertBefore(document.createTextNode(" · "), after);
    }
  }
}
const cellText = (content) => content.replace(/\s+/g, " ").trim().replace(/\|/g, "\\|");

function createTurndown() {
  const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced", emDelimiter: "*" });

  // The site's tables are ARIA grids built from divs. Render them as GFM tables.
  td.addRule("ariaCell", {
    filter: (node) => role(node) === "cell" || role(node) === "columnheader",
    replacement: (content) => ` ${cellText(content)} |`,
  });
  td.addRule("ariaRow", {
    filter: (node) => role(node) === "row",
    replacement: (content, node) => {
      const row = `\n|${content}\n`;
      const headers = node.querySelectorAll('[role="columnheader"]').length;
      return headers ? `${row}|${" --- |".repeat(headers)}\n` : row;
    },
  });
  td.addRule("ariaTable", {
    filter: (node) => role(node) === "table",
    replacement: (content) => `\n\n${content.trim()}\n\n`,
  });

  // Facts lists: <dl><div><dt>Card required</dt><dd>No</dd></div></dl> → "- **Card required:** No".
  td.addRule("definitionTerm", {
    filter: "dt",
    replacement: (content) => `\n- **${content.trim()}:** `,
  });
  td.addRule("definitionDetail", {
    filter: "dd",
    replacement: (content) => content.replace(/\s+/g, " ").trim(),
  });
  td.addRule("definitionGroup", {
    filter: (node) => node.nodeName === "DIV" && node.parentNode?.nodeName === "DL",
    replacement: (content) => `\n${content.trim()}\n`,
  });
  td.addRule("definitionList", {
    filter: "dl",
    replacement: (content) => `\n\n${content.trim()}\n\n`,
  });

  // FAQ answers sit in <details>; the question is the <summary> heading. Keep both as plain blocks.
  td.addRule("summary", {
    filter: "summary",
    replacement: (content) => `\n\n${content.trim()}\n\n`,
  });

  return td;
}

const turndown = createTurndown();

function meta(document, selector) {
  return document.querySelector(selector)?.getAttribute("content")?.trim() || undefined;
}

// Double-quoted YAML scalars accept JSON string escapes.
function frontmatter(fields) {
  const lines = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
  return lines.length ? `---\n${lines.join("\n")}\n---\n\n` : "";
}

export function htmlToMarkdown(html) {
  const { document } = parseHTML(html);
  const main = document.querySelector("main");
  if (!main) return null;

  for (const node of main.querySelectorAll(DROP.join(","))) node.remove();
  // Decorative glyphs ("!", "·" separators) are aria-hidden. Keep the gap they made so words don't run together.
  for (const node of main.querySelectorAll('[aria-hidden="true"]')) {
    const text = node.textContent.trim();
    if (node.children.length || !text) node.remove();
    else node.replaceWith(document.createTextNode(text === "·" ? " · " : " "));
  }
  for (const link of main.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (href.startsWith("/")) link.setAttribute("href", SITE + href);
    unwrapCard(link, document);
  }
  separateLabels(main, document);

  const body = turndown
    .turndown(main.innerHTML)
    // Turndown pads list markers to four columns ("-   item"); one space reads better and still nests.
    .replace(/^([ \t]*)(-|\d+\.)[ \t]+/gm, "$1$2 ")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const head = frontmatter({
    title: document.querySelector("title")?.textContent.trim(),
    description: meta(document, 'meta[name="description"]'),
    url: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    updated: meta(document, 'meta[property="article:modified_time"]'),
  });
  return `${head}${body}\n`;
}
