export interface GalleryImage {
  id: number;
  location: string;
  path: string;
  format: string;
  date?: string;
}

export interface GalleryGroup {
  label: string | null;
  images: GalleryImage[];
}
