import { BookService } from "../../services/BookService";
import { CategoryService } from "../../services/CategoryService";
import { AuthorService } from "../../services/AuthorService";
import { createSlice } from "@reduxjs/toolkit";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

let storeData = async () => {
  try {
    // await AsyncLocalStorage.setItem(
    //   "books",
    //   JSON.stringify(BookService.getAllBooks())
    // );
    await AsyncLocalStorage.setItem(
      "categories",
      JSON.stringify(CategoryService.getAllCategories())
    );
    await AsyncLocalStorage.setItem(
      "authors",
      JSON.stringify(AuthorService.getAllAuthors())
    );
  } catch (e) {
    //error
  }
};
storeData();
// localStorage.setItem("books",JSON.stringify(BookService.getAllBooks()))

const initialState = {
  books: JSON.parse(localStorage.getItem("books")) || [],
  allBooks: JSON.parse(localStorage.getItem("books")) || [],
  categories: JSON.parse(localStorage.getItem("categories")) || [],
  authors: JSON.parse(localStorage.getItem("authors")) || [],
};

console.log("state: ",initialState);

const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    updateToggle: function (state, action) {
      state.books = state.books.map((book) => {
        if (book.id === action.payload) {
          return {
            ...book,
            isFav: !book.isFav,
          };
        } else return book;
      });
    },
    sortData: function (state) {
      state.books = state.books.sort((a, b) =>
        (a["author"] || "")
          .toString()
          .localeCompare((b["author"] || "").toString())
      );
    },
    filterDataByCategory: function (state, action) {
      state.books = state.allBooks.filter(
        (item) => item.category_name === action.payload
      );
    },
    filterDataByAuthor: function (state, action) {
      state.books = state.allBooks.filter(
        (item) => item.author === action.payload
      );
    },
    filterAll: function (state) {
      state.books = state.allBooks.map((item) => item);
    },
    addBook: function (state, action) {
      let books = [...state.books];
      books.push(action.payload);
      let authors = [...state.authors];
      let author = {
        name: action.payload.author
      }
      authors.push(author);

      localStorage.setItem("authors",JSON.stringify(authors));
      localStorage.setItem("books",JSON.stringify(books))
      state.authors = JSON.parse(localStorage.getItem("authors")) || [];
      state.books =JSON.parse(localStorage.getItem("books")) || [];
    },
    deleteBook:function (state,action){
      let books = JSON.parse(localStorage.getItem("books"));
      let deleted = books.filter((item)=>item.id!=action.payload);
      localStorage.setItem("books",JSON.stringify(deleted));
      state.books = JSON.parse(localStorage.getItem("books")) || [];
    },
    updateBook: function (state,action){
      let books = JSON.parse(localStorage.getItem("books"));
      let updated = books.map((item,index)=>{
        if(item.id === action.payload.id){
          item.title = action.payload.title
          item.author = action.payload.author
          item.category_name = action.payload.category_name
        }
        return item 
      })
      localStorage.setItem("books",JSON.stringify(updated));
      state.books = JSON.parse(localStorage.getItem("books")) || [];
    }
  },
});
export const {
  updateToggle,
  sortData,
  filterDataByCategory,
  filterAll,
  filterDataByAuthor,
  addBook,
  deleteBook,
  updateBook
} = bookSlice.actions;
export default bookSlice.reducer;
