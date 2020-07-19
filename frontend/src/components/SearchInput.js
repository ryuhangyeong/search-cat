export default class SearchInput {
  $searchInput = null;

  constructor({ $target, onSearch, onKeyUp }) {
    this.$searchInput = document.createElement("input");
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.className = "SearchInput";
    this.$searchInput.autofocus = true;

    $target.appendChild(this.$searchInput);

    this.onSearch = onSearch;
    this.onKeyUp = onKeyUp;

    this.init();
  }

  init() {
    this.$searchInput.addEventListener("click", (e) => (e.target.value = ""));
    this.$searchInput.addEventListener("keyup", (e) => {
      const ENTER = 13;
      const {
        keyCode,
        target: { value },
      } = e;

      this.onKeyUp(value);

      if (keyCode === ENTER) this.onSearch();
    });
  }

  render() {}
}
