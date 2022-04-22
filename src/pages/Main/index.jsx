import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Divider, IconButton, Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import "./index.css";

import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Main = () => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const handleImgClick = () => {
    navigate('/book-info');
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <IconButton>
            <SortByAlphaIcon fontSize="large" />
          </IconButton>
          <Button variant="contained" startIcon={<CollectionsBookmarkIcon />}>
            All Books
          </Button>
        </Box>
        <Button variant="contained" startIcon={<AddBoxIcon />}>
          Add Book
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel htmlFor="author-list">Author</InputLabel>
          <Select native defaultValue="" id="author-list" label="Author">
            <option aria-label="None" value="" />
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel htmlFor="categories-list">Categories</InputLabel>
          <Select defaultValue="" id="categories-list" label="Categories">
            <ListSubheader>Fictional</ListSubheader>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <ListSubheader>NonFictional</ListSubheader>
            <MenuItem value={3}>Option 3</MenuItem>
            <MenuItem value={4}>Option 4</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <section>
        <div>
          <h1 className="category_header">Business Education</h1>
          <Divider />
          <Stack direction="row" spacing={8} style={{ margin: "20px auto" }}>
            <div>
              <div className="img_div">
                <img
                  src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFlx4x-DSoFn2AEBcxh-pURx2U7ECB4el5OztaFW3igFUXXDUK"
                  alt="book_img"
                  onClick={handleImgClick}
                />
              </div>
              {isFav ? (
                <FavoriteIcon sx={{ color: "red", m: "5px 0 5px 0" }} onClick={()=>setIsFav(false)}/>
              ) : (
                <FavoriteBorderIcon sx={{ color: "red", m: "5px 0 5px 0" }} onClick={()=>setIsFav(true)}/>
              )}
              <div>
                <p className="book_title">Title</p>
                <p className="book_author">Author</p>
              </div>
            </div>
          </Stack>
        </div>
      </section>
    </div>
  );
};
export default Main;
