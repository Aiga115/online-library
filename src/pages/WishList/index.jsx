import React ,{useState,useEffect} from "react";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Helmet } from "react-helmet-async";

const WishList = () => {
  
  let bookState = useSelector((store) => {
    return store["books"];
  });
  let { favBooks } = bookState;
  console.log("fav books: ",favBooks);
  return (
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>
      {favBooks?.map((item, index) => {
            return (
              <div key={index}>
                <h1 className="category_header">{item.category_name}</h1>
                <div>
                  <div className="img_div">
                      <img src={`${item.img}`} alt={item.title} />
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
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ color: "red", m: "5px 0 5px 0" }}
                      />
                    )}
                  </div>
                  <div>
                    <p className="book_title">{item.title}</p>
                    <p className="book_author">{item.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};
export default WishList;
