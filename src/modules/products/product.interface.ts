import { Model } from "mongoose";

export interface IVariant {
  type: string;
  value: string;
}

export interface IInventory {
  quantity: number;
  inStock: boolean;
}

// ---------  product interface ---------
export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
}

// ------------- product static model ------------
export interface IProductModel extends Model<IProduct> {
  isProductQuantityAvailable(id: string): Promise<IProduct | null>;
}
