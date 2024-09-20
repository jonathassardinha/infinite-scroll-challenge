const api = 'https://dummyjson.com/products';

export async function fetchProducts(skip: number, limit: number) {
    const url = `${api}?limit=${limit}&skip=${skip}&select=title,price,thumbnail`;
    const response = await fetch(url);
    const data: PagedData<Product> = await response.json();
    return data;
}