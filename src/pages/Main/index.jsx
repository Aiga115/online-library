import { Box, Button, IconButton, List } from "@mui/material";
import { Helmet } from "react-helmet-async";

import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AddBoxIcon from "@mui/icons-material/AddBox";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Main = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"50px"}}>
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
        <FormControl sx={{minWidth: 250 }}>
          <InputLabel htmlFor="author-list">Author</InputLabel>
          <Select native defaultValue="" id="author-list" label="Author">
            <option aria-label="None" value="" />
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </Select>
        </FormControl>
        <FormControl sx={{minWidth: 250 }}>
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
      <List></List>
    </div>
  );
};
export default Main;
