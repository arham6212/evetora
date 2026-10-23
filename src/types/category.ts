export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}
