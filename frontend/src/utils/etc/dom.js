const dom = {
  setOpts({ $parent, value, text }) {
    const opts = document.createElement("option");
    opts.value = value;
    opts.text = text;

    $parent.add(opts);
  },
};

export default dom;
