/**
 * Generates a minimal, valid one-page PDF at /public/resume.pdf so the
 * Resume links never 404 before you drop in your real resume.
 *
 * Run:  npm run resume:placeholder
 * Then replace /public/resume.pdf with your actual resume PDF.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "resume.pdf");

/** Build a PDF content stream with Helvetica text lines. */
function contentStream(lines) {
  let stream = "BT\n";
  for (const line of lines) {
    const { text, size, x, y, bold } = line;
    stream += `/${bold ? "F1" : "F2"} ${size} Tf\n`;
    stream += `1 0 0 1 ${x} ${y} Tm\n`;
    stream += `(${text}) Tj\n`;
  }
  stream += "ET\n";
  return stream;
}

const pageW = 612; // US Letter width in points
const lines = [
  { text: "GALI ESHWAR REDDY", size: 24, x: 72, y: 700, bold: true },
  { text: "Operations & Controls | Financial Analysis | Reconciliation | Process Improvement", size: 12, x: 72, y: 672, bold: false },
  { text: "Bengaluru, Karnataka, India", size: 11, x: 72, y: 654, bold: false },
  { text: "Email: eshwarreddy.gali@outlook.com", size: 11, x: 72, y: 638, bold: false },
  { text: "Placeholder resume - replace this file", size: 11, x: 72, y: 580, bold: true },
  { text: "Drop your actual resume PDF at: public/resume.pdf", size: 11, x: 72, y: 562, bold: false },
  { text: "Every Resume button on the site points to this file,", size: 11, x: 72, y: 544, bold: false },
  { text: "so swapping the file updates the whole site at once.", size: 11, x: 72, y: 526, bold: false },
];

const stream = contentStream(lines);
const streamLength = Buffer.byteLength(stream, "latin1");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${streamLength} >>\nstream\n${stream}endstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = Buffer.byteLength(pdf, "latin1");
pdf += "xref\n";
pdf += `0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
pdf += `startxref\n${xrefStart}\n%%EOF\n`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, pdf, "latin1");
console.log(`Wrote placeholder resume to ${outPath}`);
console.log("Replace it with your real resume PDF (same filename) when ready.");