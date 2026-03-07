import { fetchGallery } from '../../lib/data';
import GalleryClient from './gallery-client';

export default async function Gallery() {
  const items = await fetchGallery();
  return <GalleryClient items={items} />;
}
