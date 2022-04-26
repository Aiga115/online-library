export class CategoryService {
  static categoryList = [
    {
      id: 1,
      name: "Business Education",
    },
    {
      id: 2,
      name: "Romance",
    },
  ];

  static getAllCategories() {
    return this.categoryList;
  }
}
