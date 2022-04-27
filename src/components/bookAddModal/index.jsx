import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import "./index.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { addBook } from "../../redux/features/books.feature";

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";

const ModalWindow = (props) => {
  //
  let dispatch = useDispatch();
  // state
  let bookState = useSelector((store) => {
    return store["books"];
  });
  let { categories } = bookState;
  const handleClose = () => {
    props.onClick(false);
  };
  // image entities
  const fileInputRef = React.createRef();
  const [image, setImage] = React.useState();
  const [preview, setPreview] = React.useState();

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(undefined);
    }
  }, [image]);

  function onChange(event) {
    if (!event.target.files) return;
    setImage(event.target.files[0]);
  }
  // validation
  const schema = Yup.object().shape({
    title: Yup.string().required("Must be filled!"),
    author: Yup.string().required("Must be filled!"),
    category_name: Yup.string().required("Must be filled!"),
  });
  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      img:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFlx4x-DSoFn2AEBcxh-pURx2U7ECB4el5OztaFW3igFUXXDUK",
      title: "",
      author: "",
      category_name: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log("Values: ",values);
        dispatch(addBook(values));
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
      <Dialog
        open={props.open}
        onClose={handleClose}
        sx={{
          ".MuiPaper-root.MuiDialog-paper": {
            borderRadius: "20px",
            height: "700px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle>
          <Typography
            sx={{
              color: "#000",
              fontSize: "22px",
              fontFamily: "Fira sans",
              fontWeight: 600,
            }}
          >
            Add Book
          </Typography>
          <Typography
            sx={{
              color: "#233142",
              fontSize: "22px",
              fontFamily: "Fira sans",
              fontWeight: 600,
            }}
          >
            If you want to change image, just click on it 
          </Typography>
        </DialogTitle>
        {preview ? (
          <Box className="uploadArea">
            <img
              src={preview}
              style={{ objectFit: "cover", height: "240px" }}
              onClick={() => {
                setImage(undefined);
              }}
            />
          </Box>
        ) : (
          <Box className="uploadArea">
            <AddPhotoAlternateIcon
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current?.click();
              }}
              sx={{ color: "#CFCFCF", fontSize: "90px" }}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              accept="image/*"
              onChange={(event) => {
                onChange(event);
              }}
            />
          </Box>
        )}
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
                  {...getFieldProps("category_name")}
                  error={Boolean(touched.category && errors.category)}
                >
                  {categories.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
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
                  textTransform: "none",
                }}
              >
                Reset
              </Button>
              <Button
                type={"submit"}
                variant="contained"
                sx={{ color: "#FFF", textTransform: "none" }}
              >
                Save Book
              </Button>
            </Container>
          </Form>
        </FormikProvider>
      </Dialog>
    </>
  );
};
export default ModalWindow;
