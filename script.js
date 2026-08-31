const q = (s) => document.querySelector(s),
  qa = (s) => document.querySelectorAll(s);
const menu = q(".menu-toggle"),
  nav = q("#navMenu"),
  search = q(".search-toggle"),
  bar = q(".search-bar"),
  input = q("#newsSearch"),
  cats = qa(".category"),
  cards = qa(".news-card"),
  empty = q("#emptyState"),
  topButton = q("#toTop"),
  form = q("#subscribeForm"),
  message = q("#formMessage");
menu.addEventListener("click", () => {
  nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", nav.classList.contains("open"));
});
search.addEventListener("click", () => {
  bar.classList.toggle("open");
  if (bar.classList.contains("open")) input.focus();
});
function filter() {
  let active = q(".category.active").dataset.category,
    term = input.value.toLowerCase(),
    count = 0;
  cards.forEach((card) => {
    let show =
      (active === "all" || card.dataset.category === active) &&
      (!term || card.textContent.toLowerCase().includes(term));
    card.hidden = !show;
    if (show) count++;
  });
  empty.hidden = !!count;
}
cats.forEach((c) =>
  c.addEventListener("click", () => {
    cats.forEach((x) => x.classList.remove("active"));
    c.classList.add("active");
    filter();
  }),
);
input.addEventListener("input", filter);
q("#loadMore").addEventListener("click", () => {
  q('[data-category="all"]').click();
  q("#newsGrid").scrollIntoView({ behavior: "smooth" });
});
window.addEventListener("scroll", () =>
  topButton.classList.toggle("visible", scrollY > 500),
);
topButton.addEventListener("click", () =>
  scrollTo({ top: 0, behavior: "smooth" }),
);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.textContent = `Спасибо! Новости будут приходить на ${q("#email").value}.`;
  form.reset();
  setTimeout(() => (message.textContent = ""), 5000);
});

const storySelector =
  ".lead-story,.side-story,.news-card,.popular-feature,.popular-list article,.discussed article";
document.querySelectorAll(storySelector).forEach((story) => {
  const openStory = () => {
    const headline =
      story.querySelector("h1,h2,h3")?.textContent.trim() || "Новость QQ.XABAR";
    const photo =
      story.querySelector("img")?.getAttribute("src") || "images/main-news.jpg";
    const section =
      story
        .querySelector(
          ".article-meta span,.popular-list span,.popular-feature span",
        )
        ?.textContent.trim() || "Новости";
    location.href = `news.html?title=${encodeURIComponent(headline)}&image=${encodeURIComponent(photo)}&category=${encodeURIComponent(section)}`;
  };
  story.classList.add("open-story");
  story.tabIndex = 0;
  story.setAttribute("role", "link");
  story.addEventListener("click", openStory);
  story.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openStory();
    }
  });
});
