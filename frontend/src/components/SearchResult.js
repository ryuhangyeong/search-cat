export default class SearchResult {
  $wrapper = null;
  $searchResult = null;
  data = null;

  constructor({ $target, initialData, onOpen }) {
    this.$wrapper = document.createElement("section");
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";

    this.$wrapper.appendChild(this.$searchResult);
    $target.appendChild(this.$wrapper);

    this.data = initialData;
    this.onOpen = onOpen;

    this.init();
    this.render();
  }

  init() {
    this.$searchResult.addEventListener("click", (e) => {
      const target = e.target;
      const { tagName } = target;

      if (tagName === "IMG") {
        const {
          dataset: { id },
        } = target;

        this.onOpen(id);
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  template(data) {
    return data
      .map(
        (cat) => `
      <li class="item">
        <img data-src=${cat.url} alt=${cat.name} data-id=${cat.id} />
        <p>${cat.name}</p>
      </li>
      `
      )
      .join("");
  }

  lazyLoading() {
    // 중복 코드이므로 리팩토링 예정
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          this.loadImage(target);
          observer.unobserve(target);
        }
      });
    });

    const images = this.$searchResult.querySelectorAll("img");
    for (const image of images) io.observe(image);
  }

  loadImage(image) {
    const src = image.dataset.src;

    this.fetchImage(src).then(() => {
      image.src = src;
      image.parentNode.classList.add("hide");
    });
  }

  fetchImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  };

  append(nextData) {
    this.$searchResult.insertAdjacentHTML("beforeend", this.template(nextData));
    this.lazyLoading(); // 모든 부분에 적용하므로 비효율적이지 않을까?
  }

  render() {
    this.$searchResult.innerHTML = this.template(this.data);
    this.lazyLoading();
  }
}
