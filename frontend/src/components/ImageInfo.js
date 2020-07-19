export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, initialData, onClose }) {
    this.$imageInfo = document.createElement("div");
    this.$imageInfo.className = "Dimmed";
    $target.appendChild(this.$imageInfo);

    this.data = initialData;
    this.onClose = onClose;

    this.init();
    this.render();
  }

  init() {
    this.$imageInfo.addEventListener("click", (e) => {
      const { className } = e.target;
      if (className === "close" || className === "Dimmed") this.onClose();
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") this.onClose();
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const { visible, item } = this.data;

    if (visible) {
      const { name, url, temperament, origin } = item;

      this.$imageInfo.innerHTML = `
        <figure class="content-wrapper fade-in">
          <h1 class="title">
            <span>${name}</span>
            <span class="close">x</span>
          </h1>
          <img src="${url}" alt="${name}"/>        
          <figcaption class="description">
            <p>성격: ${temperament}</p>
            <p>태생: ${origin}</p>
          </figcaption>
        </figure>`;
      this.$imageInfo.classList.remove("hide");
    } else {
      const $contentWrapper = document.querySelector(".content-wrapper");

      // 이부분이 조금 어색하다 고민하면서 바꿔보자.
      if ($contentWrapper) {
        $contentWrapper.classList.add("fade-out");
        $contentWrapper.classList.remove("fade-in");
        setTimeout(() => {
          this.$imageInfo.classList.add("hide");
          $contentWrapper.remove();
        }, 1000);
      } else {
        this.$imageInfo.classList.add("hide");
      }
    }
  }
}
