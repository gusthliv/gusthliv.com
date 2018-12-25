import React from "react";
import { compose, pure, withHandlers } from "recompose";
import { connect } from "react-redux";
import { Grid, withTheme } from "@material-ui/core";
import Counter from "./Counter";
import ActiveCounter from "./ActiveCounter";

const Counters = ({ counters, active, setActive, closeActive, theme }) => (
  <Grid container spacing={theme.spacing.unit}>
    {counters.map(counter => (
      <Grid item xs={12} sm={6} md={4} key={counter.id}>
        <Counter counter={counter} setActive={setActive} />
        {active === counter.id ? (
          <ActiveCounter counter={counter} close={closeActive} />
        ) : null}
      </Grid>
    ))}
  </Grid>
);

export default compose(
  connect(state => ({ counters: state.counters })),
  withTheme(),
  withHandlers({
    setActive: ({ history }) => id => history.push(`/counter/${id}`),
    closeActive: ({ history }) => () => history.push(`/`)
  }),
  pure
)(Counters);
