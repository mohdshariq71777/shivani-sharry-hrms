export interface FetchedProduct {
  product_name: string,
  price: string,
  brand_name: string,
  product_id: number,
  created_date: string,
  images: {
    file_name: string,
    file_path: string
  }[]
}
