const themeUtil = {
  isDark() {
    return (
      localStorage.getItem("color-mode") === "dark" ||
      (window.matchMedia("(prefers-color-scheme: dark").matches &&
        !localStorage.getItem("color-mode"))
    );
  },
  getThemeColor(isDark) {
    return isDark ? "dark" : "light";
  },
  getThemeToggleButtonText(isDark) {
    return `${isDark ? "라이트" : "다크"} 모드로 보기`;
  },
};

export default themeUtil;
