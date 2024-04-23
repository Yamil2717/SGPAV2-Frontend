interface ProductModel {
    $id?: string;
    id: number;
    name: string;
    description: string;
    price: number,
    stock: number,
    category_ID: number,
    category: {
        id: number,
        name: string
    }
}

type Products = Array<ProductModel>;


export type { ProductModel, Products };