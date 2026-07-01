import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { slugify } from '@/data/content';

const uploadRoot = path.join(process.cwd(), 'public', 'uploads');
const maxImageSize = 8 * 1024 * 1024;

const extensionByType: Record<string, string> = {
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
};

function isFile(value: FormDataEntryValue | null): value is File {
  return typeof File !== 'undefined' && value instanceof File && value.size > 0;
}

function getExtension(file: File) {
  const fromType = extensionByType[file.type];
  if (fromType) return fromType;

  const fromName = path.extname(file.name).toLowerCase();
  return ['.gif', '.jpeg', '.jpg', '.png', '.webp'].includes(fromName) ? fromName : '';
}

function getUploadFolder(section: string) {
  const now = new Date();
  const safeSection = slugify(section || 'images') || 'images';
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');

  return {
    diskPath: path.join(uploadRoot, safeSection, year, month),
    publicPath: `/uploads/${safeSection}/${year}/${month}`
  };
}

export async function saveUploadedImage(value: FormDataEntryValue | null, prefix: string, section = 'images') {
  if (!isFile(value)) return '';
  if (!value.type.startsWith('image/')) throw new Error('Only image uploads are supported.');
  if (value.size > maxImageSize) throw new Error('Image uploads must be 8MB or smaller.');

  const extension = getExtension(value);
  if (!extension) throw new Error('Unsupported image type. Use JPG, PNG, WEBP, or GIF.');

  const folder = getUploadFolder(section);
  const safePrefix = slugify(prefix || 'image') || 'image';
  const filename = `${safePrefix}-${randomUUID()}${extension}`;
  const buffer = Buffer.from(await value.arrayBuffer());

  await mkdir(folder.diskPath, { recursive: true });
  await writeFile(path.join(folder.diskPath, filename), buffer);

  return `${folder.publicPath}/${filename}`;
}

export async function saveUploadedImages(values: FormDataEntryValue[], prefix: string, section = 'images') {
  const urls: string[] = [];

  for (const [index, value] of values.entries()) {
    const url = await saveUploadedImage(value, `${prefix}-${index + 1}`, section);
    if (url) urls.push(url);
  }

  return urls;
}
