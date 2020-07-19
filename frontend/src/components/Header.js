export default class Header {
  $header = null;

  constructor({ $target }) {
    this.$header = document.createElement("header");
    $target.appendChild(this.$header);
  }
}
