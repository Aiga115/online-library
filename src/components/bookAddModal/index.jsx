import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

const ModalWindow = (props) => {
  
  const handleClose =()=>{
      props.onClick(false)
  }
  
  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        sx={{
          ".MuiPaper-root.MuiDialog-paper": {
            borderRadius: "20px",
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
        </DialogTitle>
      </Dialog>
    </>
  );
};
export default ModalWindow;
