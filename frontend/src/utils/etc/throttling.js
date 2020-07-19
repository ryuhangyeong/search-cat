const throttling = {
  checked: false,
  throttle(fn, duration) {
    if (!this.checked) {
      this.checked = setTimeout(() => {
        fn();
        this.checked = false;
      }, duration);
    }
  },
};
