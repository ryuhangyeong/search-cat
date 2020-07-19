import store from "./store.js";

const latestResult = {
  get() {
    return store.get("latestResult") || [];
  },
  set(list) {
    store.set("latestResult", list);
  },
};

export default latestResult;
