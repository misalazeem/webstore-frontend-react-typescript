interface Product {
  _id: string,
  name: string,
  description: string,
  image: string,
  price: number
}

export interface ProductsResponse {
  data: Product[];
}