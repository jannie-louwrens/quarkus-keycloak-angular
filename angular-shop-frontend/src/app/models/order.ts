export interface Order {
  id: number;
  customerId: string;
  product: string;
  productCatalog: string;
  orderDate: Date;
  quantity: number;
  unitPrice: number;
}
