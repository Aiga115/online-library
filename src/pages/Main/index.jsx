import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Box, Button, IconButton, Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import "./index.css";

import {
  updateToggle,
  sortData,
  filterDataByCategory,
  filterDataByAuthor,
  filterAll,
  deleteBook,
} from "../../redux/features/books.feature";

import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import BookAddModal from "../../components/bookAddModal";

const Main = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  let dispatch = useDispatch();
  let [category, setCategory] = useState("");
  let [author, setAuthor] = useState("");
  let bookState = useSelector((store) => {
    return store["books"];
  });
  let { books } = bookState;
  let { categories } = bookState;
  let { authors } = bookState;

  let handleImgClick = () => {
    navigate("/book-info");
  };
  let handleFav = (id) => {
    dispatch(updateToggle(id));
  };
  let handleSort = () => {
    console.log("Sort activated");
    dispatch(sortData());
  };
  let handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  let handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  let handleFilterByCategory = (value) => {
    dispatch(filterDataByCategory(value));
  };
  let handleFilterByAuthor = (value) => {
    dispatch(filterDataByAuthor(value));
  };
  let handleFilterAll = () => {
    dispatch(filterAll());
    setCategory("");
    setAuthor("");
  };
  let handleDelete = (index) => {
    dispatch(deleteBook(index));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <IconButton onClick={handleSort}>
            <SortByAlphaIcon fontSize="large" />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<CollectionsBookmarkIcon />}
            onClick={() => handleFilterAll()}
          >
            All Books
          </Button>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddBoxIcon />}
          onClick={() => setOpen(true)}
        >
          Add Book
        </Button>
      </Box>
      <BookAddModal open={open} onClick={setOpen} />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel htmlFor="author-list">Authors</InputLabel>
          <Select
            defaultValue=""
            id="author-list"
            label="Author"
            value={author}
            onChange={handleAuthorChange}
          >
            {authors.map((item, index) => (
              <MenuItem
                key={index}
                value={item.name}
                onClick={() => handleFilterByAuthor(item.name)}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel htmlFor="categories-list">Categories</InputLabel>
          <Select
            defaultValue=""
            id="categories-list"
            label="Categories"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((item, index) => (
              <MenuItem
                key={index}
                value={item.name}
                onClick={() => handleFilterByCategory(item.name)}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <section>
        <div className="book_list">
          {books.length!==0?books.map((item, index) => {
            return (
              <div key={index} className="list_item">
                <h1 className="category_header">{item.category_name}</h1>
                <div>
                  <div className="img_div">
                    <Link to="/book-info" state={{ data: item, it: index }}>
                      <img src={`${item.img}`} alt={item.title} />
                    </Link>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "70px",
                    }}
                  >
                    {item.isFav ? (
                      <FavoriteIcon
                        sx={{ color: "red", m: "5px 0 5px 0" }}
                        onClick={() => handleFav(index)}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ color: "red", m: "5px 0 5px 0" }}
                        onClick={() => handleFav(index)}
                      />
                    )}
                    <DeleteIcon onClick={() => handleDelete(index)} />
                  </div>
                  <div>
                    <p className="book_title">{item.title}</p>
                    <p className="book_author">{item.author}</p>
                  </div>
                </div>
              </div>
            );
          }):<h1>There are no books added (Add Please)</h1>}
        </div>
      </section>
    </div>
  );
};
export default Main;
