// dark and light mode
const themeBtn = document.getElementById("theme");
const docEle = document.documentElement;

const themes = {
  light: {
    "--bg-body-color": "hsl(0, 0%, 98%)",
    "--elements": "hsl(0, 0%, 100%)",
    "--text": "hsl(200, 15%, 8%)",
    iconClass: "fa-regular",
  },
  dark: {
    "--bg-body-color": "hsl(207, 26%, 17%)",
    "--elements": "hsl(209, 23%, 22%)",
    "--text": "hsl(0, 0%, 100%)",
    iconClass: "fa-solid",
  },
};

themeBtn.addEventListener("click", function () {
  const currentTheme =
    getComputedStyle(docEle).getPropertyValue("--bg-body-color") ===
    themes.light["--bg-body-color"]
      ? "dark"
      : "light";
  const theme = themes[currentTheme];

  for (const [property, value] of Object.entries(theme)) {
    docEle.style.setProperty(property, value);
  }

  if (currentTheme === "dark") {
    this.children[0].classList.remove(themes["light"].iconClass);
    this.children[0].classList.add(themes["dark"].iconClass);
    localStorage.setItem("theme", "dark");
  } else {
    this.children[0].classList.remove(themes["dark"].iconClass);
    this.children[0].classList.add(themes["light"].iconClass);
    localStorage.removeItem("theme");
  }
});

if (localStorage.getItem("theme")) {
  if (localStorage.getItem("theme") === "dark") {
    for (const [property, value] of Object.entries(themes.dark)) {
      docEle.style.setProperty(property, value);
    }
    themeBtn.children[0].classList.remove(themes["light"].iconClass);
    themeBtn.children[0].classList.add(themes["dark"].iconClass);
  }
}
