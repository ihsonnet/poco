import { slotAssets } from '@/data/imageSlots';
import { Image as ImageIcon } from 'lucide-react';

type Fit = 'cover' | 'contain';
const assets: Record<string, string | undefined> = slotAssets;

interface ImageSlotProps {
  slot?: string;
  src?: string;
  alt?: string;
  placeholder?: string;
  className?: string;
  fit?: Fit;
}

export function ImageSlot({ slot, src: imageSrc, alt = '', placeholder = 'Image here', className = '', fit = 'cover' }: ImageSlotProps) {
  const src = imageSrc || (slot ? assets[slot] : undefined);

  if (!src) {
    return (
      <div className={`image-slot image-slot-empty ${className}`} data-fit={fit}>
        <ImageIcon size={30} strokeWidth={1.6} />
        <span>{placeholder}</span>
      </div>
    );
  }

  return (
    <div className={`image-slot ${className}`} data-fit={fit}>
      <img src={src} alt={alt || placeholder} loading="lazy" />
    </div>
  );
}
