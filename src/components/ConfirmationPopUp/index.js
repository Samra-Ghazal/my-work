import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const DialogBox = (props) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(props.visible);
  }, [props.visible, props.message, props.header]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        id="dialog-component"
        open={open}
        onClose={handleClose}
        classes={{ paper: "shadow-sm-dark rounded-lg" }}
      >
        <div className="text-center p-5" id="dbox">
          <h4 className="font-weight-bold mt-2 font-family-roobert">
            {props.header}
          </h4>
          <p className="mb-0 mt-2 text-black-50 font-family-roobert">
            {props.message}
          </p>
          <div className="pt-4">
            <Button
              onClick={handleClose}
              className="btn-primary-normal mx-1"
              id="dbox-cancel"
            >
              <span className="btn-wrapper--label ">No</span>
            </Button>
            <Button
              onClick={() => {
                props.ok();
                handleClose();
              }}
              className="btn-primary-fill mx-1"
              id="dbox-ok"
            >
              <span className="btn-wrapper--label text-danger">
                Yes, Delete
              </span>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default DialogBox;
