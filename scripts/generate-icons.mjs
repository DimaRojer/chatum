import fs from "node:fs";
import path from "node:path";

const iconsDir = path.resolve("src/assets/icons");
const outputFile = path.resolve("public/spritemap.svg");

const excludedIcons = new Set([
    "doc",
    "pdf",
    "xls",
    "zip",
]);

if (!fs.existsSync(iconsDir)) {
    console.error(`❌ Icons directory not found: ${iconsDir}`);
    process.exit(1);
}

const files = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith(".svg"))
    .filter((file) => {
        const name = path.basename(file, ".svg");

        return !excludedIcons.has(name);
    });

const symbols = files.map((file) => {
    const name = path.basename(file, ".svg");

    let svg = fs.readFileSync(
        path.join(iconsDir, file),
        "utf8"
    );

    const viewBox =
        svg.match(/viewBox=["']([^"']+)["']/i)?.[1] ||
        "0 0 24 24";

    svg = svg
        .replace(/<\?xml[\s\S]*?\?>/gi, "")
        .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
        .replace(/<svg\b[^>]*>/i, "")
        .replace(/<\/svg>/i, "")
        .trim();

    svg = svg.replace(
        /\bfill=(["'])(.*?)\1/gi,
        (match, quote, value) => {
            const color = value.trim().toLowerCase();

            if (color === "none") {
                return `fill=${quote}none${quote}`;
            }

            return `fill=${quote}currentColor${quote}`;
        }
    );

    svg = svg.replace(
        /\bstroke=(["'])(.*?)\1/gi,
        (match, quote, value) => {
            const color = value.trim().toLowerCase();

            if (color === "none") {
                return `stroke=${quote}none${quote}`;
            }

            return `stroke=${quote}currentColor${quote}`;
        }
    );

    svg = svg.replace(
        /\b(fill|stroke)\s*:\s*([^;}"']+)/gi,
        (match, property, value) => {
            const color = value.trim().toLowerCase();

            if (color === "none") {
                return `${property}:none`;
            }

            return `${property}:currentColor`;
        }
    );

    return `
    <symbol id="${name}" viewBox="${viewBox}" fill="none" stroke="currentColor">
        ${svg}
    </symbol>`;
});

const sprite = `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("\n")}</svg>`;

fs.mkdirSync(path.dirname(outputFile), {
    recursive: true,
});

fs.writeFileSync(outputFile, sprite);

console.log(
    `Generated ${files.length} icons → public/spritemap.svg`
);