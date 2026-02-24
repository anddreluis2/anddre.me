export interface GalleryImage {
  id: number;
  location: string;
  path: string;
  format: string;
  date?: string;
  analog?: boolean;
}

export interface GalleryGroup {
  label: string | null;
  images: GalleryImage[];
}
