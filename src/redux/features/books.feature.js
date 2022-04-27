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
    // await AsyncLocalStorage.setItem(
    //   "authors",
    //   JSON.stringify(AuthorService.getAllAuthors())
    // );
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
      state.allBooks =JSON.parse(localStorage.getItem("books")) || [];
    },
    deleteBook:function (state,action){
      let books = JSON.parse(localStorage.getItem("books"));
      let authors = JSON.parse(localStorage.getItem("authors"));
      let deleted = books.filter((item,index)=>index!=action.payload);
      let deletedAuthors = authors.filter((item,index)=>index!=action.payload);
      localStorage.setItem("books",JSON.stringify(deleted));
      localStorage.setItem("authors",JSON.stringify(deletedAuthors));
      state.books = JSON.parse(localStorage.getItem("books")) || [];
      state.authors = JSON.parse(localStorage.getItem("authors")) || [];
    },
    updateBook: function (state,action){
      console.log("update book: ",action.payload)
      
      let books = JSON.parse(localStorage.getItem("books"));
      let authors = JSON.parse(localStorage.getItem("authors"));
      let updated = books.map((item,index)=>{
        if(index === action.payload.it){
          item.title = action.payload.values.title
          item.author = action.payload.values.author
          item.category_name = action.payload.values.category_name
        }
        return item;
      })
      let updatedAuthor = authors.map((item,index)=>{
        if(index===action.payload.it){
          item.name = action.payload.values.author
        }
        return item;
      })

      console.log("Updated: ",updated);
      localStorage.setItem("books",JSON.stringify(updated));
      localStorage.setItem("authors",JSON.stringify(updatedAuthor));
      state.books = JSON.parse(localStorage.getItem("books")) || [];
      state.authors = JSON.parse(localStorage.getItem("authors")) || [];
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
