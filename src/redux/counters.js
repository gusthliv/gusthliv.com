import { createSlice } from "redux-starter-kit";
import { switchMapTo, map, flatMap } from "rxjs/operators";
import app from "./app";
import firebase from "../firebase";
import { Observable } from "rxjs";
import { ofType } from "redux-observable";

const counters = createSlice({
  slice: "counters",
  initialState: [],
  reducers: {
    onAdded: (state, action) => {
      state.unshift(action.payload);
    },
    onModified: (state, action) => {
      state.find(counter => counter.id === action.payload.id).value =
        action.payload.value;
    },
    onRemoved: (state, action) => {
      state.splice(
        state.findIndex(counter => counter.id === action.payload.id),
        1
      );
    }
  }
});

counters.actions.addCounter = () => () =>
  firebase.collection("counters").add({ value: 0 });

counters.actions.removeCounter = counter => () =>
  firebase
    .collection("counters")
    .doc(counter.id)
    .delete();

counters.actions.increment = counter => () =>
  firebase
    .collection("counters")
    .doc(counter.id)
    .set({ value: counter.value + 1 });

counters.actions.decrement = counter => () =>
  firebase
    .collection("counters")
    .doc(counter.id)
    .set({ value: counter.value - 1 });

export const counterUpdatesEpic = action$ =>
  action$.pipe(
    ofType(app.actions.initialize.toString()),
    switchMapTo(
      Observable.create(observer =>
        firebase.collection("counters").onSnapshot(observer)
      )
    ),
    flatMap(query => query.docChanges()),
    map(change => {
      const doc = {
        id: change.doc.id,
        value: change.doc.data().value
      };

      switch (change.type) {
        case "added":
          return counters.actions.onAdded(doc);
        case "modified":
          return counters.actions.onModified(doc);
        case "removed":
          return counters.actions.onRemoved(doc);
        default:
          throw Error("Invalid Type");
      }
    })
  );

export default counters;
