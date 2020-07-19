import dom from "../utils/etc/dom.js";

export default class SearchSelect {
  $wrapper = null;
  $searchSelect = null;
  onChange = null;

  constructor({ $target, onChange }) {
    const requestLimits = [50, 25, 10];

    this.$wrapper = document.createElement("section");
    this.$searchSelect = document.createElement("select");
    this.$searchSelect.className = "SearchSelect";

    for (const limit of requestLimits)
      dom.setOpts({ $parent: this.$searchSelect, value: limit, text: limit });

    this.$wrapper.appendChild(this.$searchSelect);
    $target.appendChild(this.$wrapper);

    this.onChange = onChange;

    this.$searchSelect.addEventListener("change", (e) =>
      this.onChange(e.target.value)
    );
  }
}
