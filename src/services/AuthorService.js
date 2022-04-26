export class AuthorService {
  static authorList = [
    {
      id: 1,
      name: "Charles Duhigg",
    },
    {
      id: 2,
      name: "Daniel Kahneman",
    },
    {
      id: 3,
      name: "Lynn Painter",
    },
    {
      id: 4,
      name: "Aazey Eddings",
    },
  ];

  static getAllAuthors() {
    return this.authorList;
  }
}
