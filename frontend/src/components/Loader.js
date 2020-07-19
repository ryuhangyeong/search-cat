export default class Loader {
  $loader = null;
  data = null;

  constructor({ $target, initialData }) {
    this.$loader = document.createElement("div");
    this.$loader.className = "Dimmed";
    $target.appendChild(this.$loader);

    this.data = initialData;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data) {
      this.$loader.innerHTML = `
        <div class="loader-wrapper">
          <div class="loader"></div>
        </div>
      `;
      this.$loader.style.display = "block";
    } else {
      this.$loader.style.display = "none";
    }
  }
}
