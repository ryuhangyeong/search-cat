export default class Empty {
  $empty = null;
  data = null;

  constructor({ $target, initialData }) {
    this.$empty = document.createElement("section");
    this.$empty.className = "Empty";
    $target.appendChild(this.$empty);

    this.data = initialData;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data) {
      this.$empty.innerHTML = `<h2>검색 결과가 없어요!</h2>`;
      this.$empty.style.display = "flex";
    } else {
      this.$empty.style.display = "none";
    }
  }
}
