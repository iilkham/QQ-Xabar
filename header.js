document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const navigation = document.getElementById("navMenu");
    navigation?.classList.toggle("open");
    button.setAttribute(
      "aria-expanded",
      String(navigation?.classList.contains("open")),
    );
  });
});

document.querySelectorAll(".search-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const search = document.querySelector(".search-bar");
    search?.classList.toggle("open");
    if (search?.classList.contains("open"))
      search.querySelector("input")?.focus();
  });
});
