import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";
import counters, { counterUpdatesEpic } from "./redux/counters";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import logger from "redux-logger";
import { combineEpics, createEpicMiddleware } from "redux-observable";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: { counters: counters.reducer },
  middleware:
    process.env.NODE_ENV !== "production"
      ? [...getDefaultMiddleware(), epicMiddleware, logger]
      : [...getDefaultMiddleware(), epicMiddleware],
  devTools: process.env.NODE_ENV !== "production"
});

epicMiddleware.run(combineEpics(counterUpdatesEpic));

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  spacing: {
    unit: 16
  }
});

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />

    <MuiThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/counter/:id" exact component={App} />
          </Switch>
        </Fragment>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
