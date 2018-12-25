import React from "react";
import { compose, pure, withState, withHandlers } from "recompose";
import { connect } from "react-redux";
import {
  Card,
  Typography,
  CardContent,
  CardHeader,
  IconButton,
  withStyles,
  Menu,
  MenuItem,
  Button,
  CardActions
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import counters from "../redux/counters";

const styles = theme => ({
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    cursor: "default",
    height: 270,
    border: `1px solid ${theme.palette.divider}`,
    transition: `box-shadow ${theme.transitions.duration.standard}ms`
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 72
  },
  arrowBack: {
    marginLeft: -10,
    marginTop: -8
  },
  cardActions: {
    marginLeft: "auto",
    marginBottom: 8,
    [theme.breakpoints.down("xs")]: {
      marginRight: "auto"
    }
  }
});

const Counter = ({
  counter,
  className,
  tabIndex,
  arrowBack,
  editable,
  setActive,
  classes,
  menuAnchor,
  elevation,
  setElevation,
  openMenu,
  closeMenu,
  increment,
  decrement,
  removeCounter
}) => (
  <Card
    className={`${classes.card} ${className}`}
    elevation={editable ? 0 : elevation}
    tabIndex={tabIndex || undefined}
    onClick={() => setActive && setActive(counter.id)}
    onMouseEnter={() => setElevation(2)}
    onMouseLeave={() => setElevation(0)}
  >
    <CardHeader
      title={
        arrowBack ? (
          <IconButton onClick={arrowBack} className={classes.arrowBack}>
            <ArrowBackIcon />
          </IconButton>
        ) : null
      }
      action={
        <IconButton onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>
      }
    />
    <CardContent className={classes.cardContent}>
      <Typography variant="h1">{counter.value}</Typography>
    </CardContent>
    {editable ? (
      <CardActions className={classes.cardActions}>
        <Button variant="contained" color="secondary" onClick={decrement}>
          Decrement
        </Button>
        <Button variant="contained" color="primary" onClick={increment}>
          Increment
        </Button>
      </CardActions>
    ) : null}
    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
      <MenuItem onClick={removeCounter}>Delete</MenuItem>
    </Menu>
  </Card>
);

export default compose(
  connect(),
  withStyles(styles),
  withState("menuAnchor", "setMenuAnchor", null),
  withState("elevation", "setElevation", 0),
  withHandlers({
    openMenu: ({ setMenuAnchor }) => e => {
      e.stopPropagation();
      setMenuAnchor(e.currentTarget);
    },
    closeMenu: ({ setMenuAnchor }) => e => {
      e.stopPropagation();
      setMenuAnchor(null);
    },
    increment: ({ counter, dispatch }) => () =>
      dispatch(counters.actions.increment(counter)),
    decrement: ({ counter, dispatch }) => () =>
      dispatch(counters.actions.decrement(counter)),
    removeCounter: ({ counter, dispatch }) => e => {
      e.stopPropagation();
      dispatch(counters.actions.removeCounter(counter));
    }
  }),
  pure
)(Counter);
