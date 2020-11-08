export interface Product {
  id: number;
  name: string;
  description: string;
  effectiveDate: Date;
  expirationDate: Date;
  unitPrice: number;
  productCatalogId: number;
  productCatalog?: string;
}
