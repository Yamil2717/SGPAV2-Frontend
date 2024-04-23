import { ProductModel } from "./Product";

interface SaleDetail {
    $id?: string;
    id: number;
    productID: number;
    product: ProductModel;
    saleID: number;
    sale: Sale;
    quantity: number;
    unitPrice: number;
}

interface Sale {
    $id?: string;
    id: number;
    client: string;
    saleDetails: SaleDetail[];
    total: number;
    date: string;
}

type SaleHistory = {
    $id: string;
    $values: Array<Sale>
}

export type { SaleDetail, Sale, SaleHistory }