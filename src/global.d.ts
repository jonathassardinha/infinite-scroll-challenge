declare global {
    interface Product {
        id: number;
        title: string;
        price: number;
        thumbnail: string;
    }
    interface PagedData<Record> {
        limit: number;
        products: Record[];
        total: number;
    }
}
export { }