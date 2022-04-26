import { BookService } from "../../services/BookService";
import { CategoryService } from "../../services/CategoryService";
import { AuthorService } from "../../services/AuthorService";
import { createSlice } from "@reduxjs/toolkit";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const initialState = {
  books: BookService.getAllBooks(),
  allBooks: BookService.getAllBooks(),
  categories: CategoryService.getAllCategories(),
  authors: AuthorService.getAllAuthors(),
};
// let storeData = async () => {
//   try {
//     await AsyncLocalStorage.setItem("books", books);
//   } catch (e) {
//     //error
//   }
// };
console.log("Initial State: ", initialState);
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
    filterDataByCategory: function(state,action){
      state.books = state.allBooks.filter((item)=>item.category_name===action.payload);
    },
    filterDataByAuthor: function(state,action){
      state.books = state.allBooks.filter((item)=>item.author===action.payload);
    },
    filterAll: function(state){
      state.books = state.allBooks.map((item)=>item);
    }
  },
});
export const { updateToggle, sortData, filterDataByCategory, filterAll, filterDataByAuthor } = bookSlice.actions;
export default bookSlice.reducer;
