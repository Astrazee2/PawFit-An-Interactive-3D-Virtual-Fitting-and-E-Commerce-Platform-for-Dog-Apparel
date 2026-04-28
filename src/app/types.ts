export type Breed = 'Labrador Retriever' | 'Shih Tzu' | 'Dachshund' | 'Pomeranian' | 'Aspin/Mixed';
export type ApparelType = 'Shirt' | 'Coat' | 'Sweater' | 'Hoodie';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type FitConfidence = 'good' | 'check' | 'custom';
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';
export type UserRole = 'guest' | 'user' | 'admin';

export interface Measurements {
  backLength: number;
  neckGirth: number;
  chestGirth: number;
}

export interface PetProfile {
  id: string;
  name: string;
  breed: Breed;
  measurements: Measurements;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  apparelType: ApparelType;
  breedCompatibility: Breed[];
  sizesAvailable: Size[];
  images: string[];
  glbAsset?: string;
}

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingInfo: ShippingInfo;
}

export interface ShippingInfo {
  name: string;
  address: string;
  contactNumber: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  petProfiles: PetProfile[];
}

export interface SizeRecommendation {
  size: Size;
  confidence: FitConfidence;
}
