export default class RandomSlide {
  $wrapper = null;
  $randomSlide = null;
  $slidePrevBtn = null;
  $slideNextBtn = null;
  onRandom = null;
  data = null;
  index = 1;
  width = -300;

  constructor({ $target, onRandom }) {
    this.$wrapper = document.createElement("section");
    this.$wrapper.className = "RandomSlideWrapper";
    this.$randomSlide = document.createElement("ul");
    this.$randomSlide.className = "RandomSlide";

    this.$slidePrevBtn = document.createElement("button");
    this.$slidePrevBtn.className = "slidePrevBtn";
    this.$slidePrevBtn.innerText = "왼쪽";

    this.$slideNextBtn = document.createElement("button");
    this.$slideNextBtn.className = "slideNextBtn";
    this.$slideNextBtn.innerText = "오른쪽";

    this.$wrapper.appendChild(this.$randomSlide);
    this.$wrapper.appendChild(this.$slidePrevBtn);
    this.$wrapper.appendChild(this.$slideNextBtn);
    $target.appendChild(this.$wrapper);

    this.onRandom = onRandom;

    this.onRandom();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  clone() {
    const slides = document.querySelectorAll(".RandomSlide li"),
      start = slides[0].cloneNode(true),
      end = slides[slides.length - 1].cloneNode(true);

    this.$randomSlide.insertAdjacentHTML("afterbegin", end.outerHTML);
    this.$randomSlide.insertAdjacentHTML("beforeend", start.outerHTML);

    this.setting();
  }

  setting() {
    this.$randomSlide.style.left = this.width + "px";
    this.event();
  }

  /*
   * @todo 리팩토링 예정
   */
  event() {
    document
      .querySelector(".RandomSlideWrapper")
      .addEventListener("click", (e) => {
        const className = e.target.className;

        if (className === "slidePrevBtn") {
          this.index--;
          if (this.index === 0) {
            this.$randomSlide.style.left = this.width * this.index + "px";
            setTimeout(() => {
              this.index = 5;
              this.$randomSlide.style.transition = "none";
              this.$randomSlide.style.left = "-1500px";
            }, 400);
          } else {
            this.$randomSlide.style.transition = "left 0.4s";
            this.$randomSlide.style.left = this.width * this.index + "px";
          }
        } else if (className === "slideNextBtn") {
          this.index++;
          if (this.index === 6) {
            this.$randomSlide.style.left = this.width * this.index + "px";
            setTimeout(() => {
              this.index = 1;
              this.$randomSlide.style.transition = "none";
              this.$randomSlide.style.left = "-300px";
            }, 400);
          } else {
            this.$randomSlide.style.transition = "left 0.4s";
            this.$randomSlide.style.left = this.width * this.index + "px";
          }
        }
      });
  }

  render() {
    this.$randomSlide.innerHTML = this.data
      .map(
        (slide) =>
          `
          <li>
            <img src=${slide.url} />
          </li>
        `
      )
      .join("");

    this.clone();
  }
}
