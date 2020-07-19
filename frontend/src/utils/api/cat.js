import request from "./request.js";

const cat = {
  fetch: (id) => request({ url: `/${id}` }),
  fetchList: (keyword, page = 1) =>
    request({ url: `/search?q=${keyword}&page=${page}` }),
  fetchRandom: (limit = 50) => request({ url: `/random?limit=${limit}` }),
};

export default cat;
