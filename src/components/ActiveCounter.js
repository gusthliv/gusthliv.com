import React from "react";
import { compose, pure } from "recompose";
import { withStyles, Modal, withTheme } from "@material-ui/core";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import Counter from "./Counter";

const styles = theme => ({
  counter: {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: 480,
    height: 330,
    zIndex: 500,
    cursor: "auto",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("xs")]: {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      border: "none",
      borderRadius: 0,
      transform: "none"
    }
  }
});

const ActiveCounter = ({ counter, close, theme, classes }) => (
  <Modal open onClose={close} className={classes.root} disableAutoFocus>
    <Counter
      counter={counter}
      className={classes.counter}
      tabIndex="-1"
      arrowBack={useMediaQuery(theme.breakpoints.down("xs")) ? close : null}
      editable
    />
  </Modal>
);

export default compose(
  withStyles(styles),
  withTheme(),
  pure
)(ActiveCounter);
