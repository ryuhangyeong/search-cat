export default class WatchEnd {
  $watchEnd = null;

  constructor({ $target, onObserve }) {
    this.$watchEnd = document.createElement("div");
    this.$watchEnd.className = "WatchEnd";
    $target.appendChild(this.$watchEnd);

    this.onObserve = onObserve;
    this.init();
  }

  init() {
    // 중복 코드이므로 리팩토링 예정
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        this.onObserve();
      });
    });

    io.observe(document.querySelector(".WatchEnd"));
  }
}
