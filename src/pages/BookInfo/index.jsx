import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import "./index.css";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
const BookInfo = () => {
  const schema = Yup.object().shape({
    title: Yup.string().required("Must be filled!"),
    author: Yup.string().required("Must be filled!"),
    category: Yup.string().required("Must be filled!"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      author: "",
      category: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        resetForm();
        setSubmitting(false);
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
          <img
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFlx4x-DSoFn2AEBcxh-pURx2U7ECB4el5OztaFW3igFUXXDUK"
            alt="book img"
          />
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
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  {...getFieldProps("category")}
                  error={Boolean(touched.category && errors.category)}
                >
                  <MenuItem value={10}>Business</MenuItem>
                  <MenuItem value={20}>Children's Book</MenuItem>
                </Select>
              </FormControl>
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
