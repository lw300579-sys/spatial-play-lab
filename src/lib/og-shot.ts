import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export async function shotDataUri(filename: string, width = 680, height = 630) {
  const file = path.join(process.cwd(), "public/shots", filename);
  const png = await sharp(await readFile(file))
    .resize(width, height, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}
