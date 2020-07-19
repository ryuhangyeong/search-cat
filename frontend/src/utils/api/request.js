const API_ENDPOINT = "http://localhost:4001";

const defaultOpts = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const request = async ({ url, opts = defaultOpts }) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/api/cats${url}`, opts);
    const { ok } = res;

    if (ok) {
      const { data } = await res.json();

      return {
        data,
      };
    } else {
      const { message } = await res.json();

      throw {
        message,
      };
    }
  } catch (e) {
    throw e;
  }
};

export default request;
