export interface TypeCategory {
  type_category_id: number,
  type_category_name: string,
  categories: { category_id: number, category_name: string }[]
}
