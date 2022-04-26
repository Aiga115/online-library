export class BookService {
  static bookList = [
    {
      id: 1,
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFlx4x-DSoFn2AEBcxh-pURx2U7ECB4el5OztaFW3igFUXXDUK",
      title: "The power Of Habit",
      author: "Charles Duhigg",
      isFav: false,
      category_name: "Business Education",
    },
    {
      id: 2,
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFlx4x-DSoFn2AEBcxh-pURx2U7ECB4el5OztaFW3igFUXXDUK",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      isFav: false,
      category_name: "Business Education",
    },
    {
      id: 3,
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFlx4x-DSoFn2AEBcxh-pURx2U7ECB4el5OztaFW3igFUXXDUK",
      title: "Mr. Wrong Number",
      author: "Lynn Painter",
      isFav: false,
      category_name: "Romance",
    },
    {
      id: 4,
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFlx4x-DSoFn2AEBcxh-pURx2U7ECB4el5OztaFW3igFUXXDUK",
      title: "A Brush with Love",
      author: "Aazey Eddings",
      isFav: false,
      category_name: "Romance",
    },
  ];

  static getAllBooks() {
    return this.bookList;
  }
}
