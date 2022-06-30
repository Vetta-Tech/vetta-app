export interface CartData {
  expires: string;
  id: number;
  product: {
    name: string;
    price: number;
    slug: string;
    thumbnail: string;
  };
}

export interface FinalCart {
  id: number;
  total: number;
  sub_total: number;
  total_saved: number;
}

export interface CartState {
  loading: boolean;
  error: string;
  cartData: CartData[];
  final_cart: {
    id: number;
    total: number;
    sub_total: number;
    total_saved: number;
  };
  couponAddedSuccess: boolean;
  increaseQuantitySuccess: boolean;
  decreaseQuantitySuccess: boolean;
  coupon_add_error: string;

  price: number;
  cartDataNull: boolean | null;
}
