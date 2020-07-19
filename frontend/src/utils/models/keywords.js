import store from "./store.js";

const keywords = {
  get() {
    return store.get("keywords") || [];
  },
  set(k) {
    const LIMIT = 5;
    const keywords = this.get();
    const index = keywords.indexOf(k);

    if (index === -1) {
      if (keywords.length === LIMIT) keywords.pop();
    } else {
      keywords.splice(index, 1);
    }

    keywords.unshift(k);

    store.set("keywords", keywords);
  },
};

export default keywords;
