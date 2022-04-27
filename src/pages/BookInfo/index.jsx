import React from "react";
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import "./index.css";
import { updateBook } from "../../redux/features/books.feature";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";

const BookInfo = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = location.state || {};
  const { it } = location.state || {};

  let bookState = useSelector((store) => {
    return store["books"];
  });

  let { categories } = bookState;

  const schema = Yup.object().shape({
    title: Yup.string().required("Must be filled!"),
    author: Yup.string().required("Must be filled!"),
    category: Yup.string().required("Must be filled!"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data.id,
      img: data.img,
      title: data.title,
      author: data.author,
      category_name: data.category_name,
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        dispatch(updateBook(values))
        navigate("/");
        
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <>
      <Helmet>
        <title>Book Information</title>
      </Helmet>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <div className="book_img">
          <img src={`${data.img}`} alt="book img" />
        </div>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={8}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  label="title"
                  fullWidth
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  label="author"
                  fullWidth
                  {...getFieldProps("author")}
                  error={Boolean(touched.author && errors.author)}
                  helperText={touched.author && errors.author}
                />
              </Stack>
              <TextField
                  label="category_name"
                  fullWidth
                  disabled
                  {...getFieldProps("category_name")}
                  error={Boolean(touched.category_name && errors.category_name)}
                  helperText={touched.category_name && errors.category_name}
                />
            </Stack>
            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginTop: "2vw",
              }}
            >
              <Button
                type={"reset"}
                sx={{
                  backgroundColor: "#E7E4E4",
                  color: "#000000",
                  marginRight: "10px",
                }}
              >
                Reset
              </Button>
              <Button
                type={"submit"}
                sx={{ backgroundColor: "#FF8925", color: "#000000" }}
              >
                Save Changes
              </Button>
            </Container>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
};
export default BookInfo;
