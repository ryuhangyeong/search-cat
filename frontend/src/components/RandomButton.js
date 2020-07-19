export default class RandomButton {
  $randomButton = null;

  constructor({ $target, onRandom }) {
    this.$randomButton = document.createElement("button");
    this.$randomButton.classList = "RandomButton";
    this.$randomButton.innerText = "랜덤 |";
    $target.appendChild(this.$randomButton);

    this.onRandom = onRandom;
    this.init();
  }

  init() {
    this.$randomButton.addEventListener("click", () => this.onRandom());
  }
}
