export interface CategoryInterface {
  name: string;
  slug: string;
  keywords: [];
  description: string;
  image: string;
  status: string;
}

export interface SubCateryInterface {
  name: string;
  slug: string;
  category: CategoryInterface;
  keywords: [];
  description: string;
  image: string;
  status: string;
}

export interface ImageInterface {
  product: ProductsInterface;
  image: string;
  alt_text: string;
}

export interface VariantSerializer {
  id: number;
  title: string;
  size: {
    name: string;
    code: string;
  };
  quantity: null;
  price: number;
}

export interface ProductsInterface {
  id: number;
  supplier_name: string;
  name: string;
  slug: string;
  category: CategoryInterface;
  sub_category: SubCateryInterface;
  short_description: SubCateryInterface;
  description: string;
  keywords: [];
  images: ImageInterface;
  variants: string;
  thumbnail: string;
  price: number;
  variant: VariantSerializer;
  status: string;
}
