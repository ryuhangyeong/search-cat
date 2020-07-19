import themeUtil from "../utils/etc/themeUtil.js";

export default class ThemeToggleButton {
  $themeToggleButton = null;
  data = null;

  constructor({ $target, initialData, toToggle }) {
    this.$themeToggleButton = document.createElement("button");
    this.$themeToggleButton.className = "btn btn--theme";
    $target.appendChild(this.$themeToggleButton);

    this.data = initialData;
    this.toToggle = toToggle;

    this.init();

    this.render();
  }

  init() {
    this.$themeToggleButton.addEventListener("click", () => this.toToggle());
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const isDark = this.data;

    document.documentElement.setAttribute(
      "color-mode",
      themeUtil.getThemeColor(isDark)
    );

    this.$themeToggleButton.innerText = themeUtil.getThemeToggleButtonText(
      isDark
    );
  }
}
