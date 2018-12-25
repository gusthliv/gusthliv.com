import React from "react";
import { compose, pure, lifecycle, withHandlers } from "recompose";
import { connect } from "react-redux";
import Counters from "./Counters";
import { Fab, withStyles, withTheme } from "@material-ui/core";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import app from "../redux/app";
import counters from "../redux/counters";

const styles = theme => ({
  root: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 90
    }
  },
  fab: {
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      position: "fixed",
      bottom: theme.spacing.unit,
      right: theme.spacing.unit,
      marginBottom: 0,
      zIndex: 500
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      marginRight: 0
    }
  }
});

const App = ({
  classes,
  theme,
  match: {
    params: { id }
  },
  history,
  addCounter
}) => (
  <div className={classes.root}>
    <Fab
      variant={
        useMediaQuery(theme.breakpoints.down("xs")) ? "round" : "extended"
      }
      color="primary"
      className={classes.fab}
      onClick={addCounter}
    >
      <AddIcon className={classes.extendedIcon} />
      {useMediaQuery(theme.breakpoints.down("xs")) ? "" : "New Counter"}
    </Fab>

    <Counters active={id} history={history} />
  </div>
);

export default compose(
  connect(),
  withStyles(styles),
  withTheme(),
  withHandlers({
    addCounter: ({ dispatch }) => () => dispatch(counters.actions.addCounter())
  }),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(app.actions.initialize());
    }
  }),
  pure
)(App);
