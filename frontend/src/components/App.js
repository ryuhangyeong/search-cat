import keywords from "../utils/models/keywords.js";
import latestResult from "../utils/models/latestResult.js";
import themeUtil from "../utils/etc/themeUtil.js";
import cat from "../utils/api/cat.js";
import RandomSlide from "./RandomSlide.js";
import SearchSelect from "./SearchSelect.js";
import Header from "./Header.js";
import SearchInput from "./SearchInput.js";
import RandomButton from "./RandomButton.js";
import KeyWordsList from "./KeyWordsList.js";
import SearchResult from "./SearchResult.js";
import EmptyResult from "./EmptyResult.js";
import ThemeToggleButton from "./ThemeToggleButton.js";
import Loader from "./Loader.js";
import ImageInfo from "./ImageInfo.js";
import Toast from "./Toast.js";
import WatchEnd from "./WatchEnd.js";

export default class App {
  $target = null;
  state = {
    limitResultCount: 50,
    callStatus: keywords.get().length ? "List" : "Random",
    image: {
      visible: false,
      item: null,
    },
    keyword: "",
    keywords: keywords.get(),
    data: latestResult.get(),
    page: 1,
    isDark: themeUtil.isDark(),
    loader: false,
    empty: latestResult.get().length === 0,
    toast: {
      visible: false,
      message: "",
    },
  };

  constructor($target) {
    this.$target = $target;

    this.RandomSlide = new RandomSlide({
      $target,
      onRandom: async () => {
        try {
          const slideLimit = 5;

          const { data } = await cat.fetchRandom(slideLimit);

          if (data) this.RandomSlide.setState(data);
        } catch (e) {
          document.querySelector(".RandomSlideWrapper").remove();
        }
      },
    });

    this.SearchSelect = new SearchSelect({
      $target,
      onChange: (value) => (this.state.limitResultCount = value),
    });

    this.Header = new Header({
      $target,
    });

    this.SearchInput = new SearchInput({
      $target: this.Header.$header,
      onSearch: () => this.getFetchList(this.state.keyword),
      onKeyUp: (keyword) => (this.state.keyword = keyword),
    });

    this.RandomButton = new RandomButton({
      $target: this.Header.$header,
      onRandom: async () => {
        try {
          this.state.loader = true;
          this.Loader.setState(this.state.loader);

          const { data } = await cat.fetchRandom(this.state.limitResultCount);

          this.state.callStatus = "Random";
          this.state.page = 1;

          this.setState(data);
        } catch (e) {
          const { message } = e;
          this.Toast.active(message);
        } finally {
          this.state.loader = false;
          this.Loader.setState(this.state.loader);
        }
      },
    });

    this.KeywordsList = new KeyWordsList({
      $target: this.Header.$header,
      initialData: this.state.keywords,
      onClick: (keyword) => this.getFetchList(keyword),
    });

    this.SearchResult = new SearchResult({
      $target,
      initialData: this.state.data,
      onOpen: async (id) => {
        try {
          this.state.loader = true;
          this.Loader.setState(this.state.loader);
          const { data: item } = await cat.fetch(id);

          this.state.image = {
            ...this.state.image,
            visible: true,
            item,
          };

          this.ImageInfo.setState(this.state.image);
        } catch (e) {
          const { message } = e;
          this.Toast.active(message);
        } finally {
          this.state.loader = false;
          this.Loader.setState(this.state.loader);
        }
      },
    });

    this.EmptyResult = new EmptyResult({
      $target,
      initialData: this.state.empty,
    });

    this.ThemeToggleButton = new ThemeToggleButton({
      $target,
      initialData: this.state.isDark,
      toToggle: () => {
        this.state.isDark = !this.state.isDark;
        this.ThemeToggleButton.setState(this.state.isDark);
        localStorage.setItem(
          "color-mode",
          themeUtil.getThemeColor(this.state.isDark)
        );
      },
    });

    this.Loader = new Loader({
      $target,
      initialData: this.state.loader,
    });

    this.ImageInfo = new ImageInfo({
      $target,
      initialData: this.state.image,
      onClose: () => {
        if (this.state.image.visible) {
          this.state.image = {
            visible: false,
            item: null,
          };

          this.ImageInfo.setState(this.state.image);
        }
      },
    });

    this.Toast = new Toast({
      $target,
      initialData: this.state.toast,
      app: this,
    });

    // 2) Intersection Observer API 사용
    this.WatchEnd = new WatchEnd({
      $target,
      onObserve: () => this.appendFetchList(),
    });

    // this.init();
  }

  init() {
    // 1) 스크롤을 이용한 무한 스크롤링
    window.addEventListener("scroll", () => {
      throttling.throttle(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop + 100 >
          document.body.scrollHeight
        )
          this.appendFetchList();
      }, 700);
    });
  }

  async getFetchList(keyword) {
    try {
      this.state.loader = true;
      this.Loader.setState(this.state.loader);
      const { data } = await cat.fetchList(keyword);

      keywords.set(keyword);
      latestResult.set(data);

      this.state.callStatus = "List";
      this.state.keywords = keywords.get();
      this.state.page = 1;

      this.KeywordsList.setState(this.state.keywords);
      this.setState(data);
    } catch (e) {
      const { message } = e;
      this.Toast.active(message);
    } finally {
      this.state.loader = false;
      this.Loader.setState(this.state.loader);
    }
  }

  async appendFetchList() {
    try {
      this.state.loader = true;
      this.Loader.setState(this.state.loader);
      const { callStatus } = this.state;

      this.state.page = this.state.page + 1;

      const { data } = await cat["fetch" + callStatus].apply(
        this,
        callStatus === "List"
          ? [this.state.keywords[0], this.state.page]
          : [this.state.limitResultCount]
      ); // 개선 요망

      this.state.data = [...this.state.data, ...data];
      this.state.empty = this.state.data.length === 0;

      this.SearchResult.append(data);
      this.EmptyResult.setState(this.state.empty);
    } catch (e) {
      const { message } = e;
      this.state.page = this.state.page - 1;
      this.Toast.active(message);
    } finally {
      this.state.loader = false;
      this.Loader.setState(this.state.loader);
    }
  }

  setState(nextData) {
    this.state.data = nextData;
    this.state.empty = this.state.data.length === 0;

    this.SearchResult.setState(nextData);
    this.EmptyResult.setState(this.state.empty);
  }
}
