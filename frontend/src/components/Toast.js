export default class Toast {
  $toast = null;
  data = null;
  app = null;

  constructor({ $target, initialData, duration = 2000, app }) {
    this.$toast = document.createElement("div");
    this.$toast.className = "Toast";
    $target.appendChild(this.$toast);

    this.data = initialData;
    this.duration = duration;
    this.app = app;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  active(message) {
    this.data = {
      visible: true,
      message,
    };

    this.app.state.toast = this.data;
    this.setState(this.data);
  }

  render() {
    const { visible, message } = this.data;

    if (visible) {
      this.$toast.classList.remove("hide");
      this.$toast.innerText = message;

      setTimeout(() => {
        this.app.state.toast = {
          visible: false,
          message: "",
        };

        this.setState(this.app.state.toast);
      }, this.duration);
    } else {
      this.$toast.classList.add("hide");
    }
  }
}
