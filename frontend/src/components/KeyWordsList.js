export default class KeyWordsList {
  $keyWordsList = null;
  data = null;

  constructor({ $target, initialData, onClick }) {
    this.$keyWordsList = document.createElement("ul");
    this.$keyWordsList.className = "KeyWordsList";

    $target.appendChild(this.$keyWordsList);

    this.data = initialData;
    this.onClick = onClick;

    this.init();
    this.render();
  }

  init() {
    this.$keyWordsList.addEventListener("click", (e) => {
      const { className, innerText } = e.target;
      if (className === "item") this.onClick(innerText);
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (!this.data.length) return;
    this.$keyWordsList.innerHTML = this.data
      .map((k) => `<li class="item">${k}</li>`)
      .join("");
  }
}
