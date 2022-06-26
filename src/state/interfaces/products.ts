export interface HomeProductsType {
  featured: [];
  recent_products: [];
  popular: [];
  electronics: [];
  footwear: [];
  baby_care: [];
  product: {};
  images: {};
  variants: [];
  loading: boolean;
  error: string;
  brandProducts: [];
}

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
  title: string;
  size: {
    name: string;
    code: string;
  };
  quantity: null;
  price: number;
}

export interface ProductsInterface {
  products: {
    id: number;
    supplier_name: string;
    name: string;
    slug: string;
    category: CategoryInterface;
    sub_category: SubCateryInterface;
    short_description: SubCateryInterface;
    description: string;
    keywords: [];
    thumbnail: string;
    price: number;
    variants: string;
    status: string;
  };
  variants: VariantSerializer;
  images: ImageInterface;
}

export interface HomeProductsType {
  featured: [];
  recent_products: [];
  popular: [];
  electronics: [];
  footwear: [];
  baby_care: [];
  product: {};
  images: {};
  variants: [];
  loading: boolean;
  error: string;
  brandProducts: [];
}
