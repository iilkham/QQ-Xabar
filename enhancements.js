const labels = {
  ru: {
    home: "Главная",
    news: "Новости",
    politics: "Политика",
    society: "Общество",
    sport: "Спорт",
    search: "Поиск по новостям...",
  },
  uz: {
    home: "Bosh sahifa",
    news: "Yangiliklar",
    politics: "Siyosat",
    society: "Jamiyat",
    sport: "Sport",
    search: "Yangiliklarni qidirish...",
  },
  kaa: {
    home: "Bas bet",
    news: "Jańalıqlar",
    politics: "Siyasat",
    society: "Jámiyet",
    sport: "Sport",
    search: "Jańalıqlardı izlew...",
  },
};
function setLanguage(language) {
  const t = labels[language] || labels.ru;
  document.documentElement.lang = language;
  Object.entries(t).forEach(([key, value]) =>
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach((el) => {
      if (key === "search") el.placeholder = value;
      else el.textContent = value;
    }),
  );
  localStorage.setItem("qq-language", language);
}
document.querySelectorAll(".language-select").forEach((select) => {
  select.value = localStorage.getItem("qq-language") || "ru";
  setLanguage(select.value);
  select.addEventListener("change", () => setLanguage(select.value));
});
const weatherIcons = {
  0: "bi-sun-fill",
  1: "bi-cloud-sun-fill",
  2: "bi-cloud-sun-fill",
  3: "bi-cloud-fill",
  45: "bi-cloud-fog2-fill",
  51: "bi-cloud-drizzle-fill",
  61: "bi-cloud-rain-fill",
  71: "bi-snow",
  80: "bi-cloud-rain-heavy-fill",
  95: "bi-cloud-lightning-rain-fill",
};
fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=42.46&longitude=59.61&current=temperature_2m,weather_code",
)
  .then((r) => r.json())
  .then((data) => {
    const temp = `${Math.round(data.current.temperature_2m)}°C`,
      icon = weatherIcons[data.current.weather_code] || "bi-cloud-sun-fill";
    document
      .querySelectorAll(".weather strong")
      .forEach((el) => (el.textContent = temp));
    document
      .querySelectorAll(".weather i")
      .forEach((el) => (el.className = `bi ${icon}`));
  })
  .catch(() => {});
const saved = JSON.parse(localStorage.getItem("qq-added-news") || "[]");
const grid = document.getElementById("newsGrid");
if (grid)
  saved.forEach((item) => {
    const card = document.createElement("article");
    card.className = "news-card open-story";
    card.dataset.category = item.category;
    card.innerHTML = `<img src="${item.image}" alt="${item.title}"><div class="card-body"><div class="article-meta"><span>${item.category}</span><time>Только что</time></div><h3>${item.title}</h3><p>${item.description}</p></div>`;
    card.addEventListener(
      "click",
      () =>
        (location.href = `news.html?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&category=${encodeURIComponent(item.category)}`),
    );
    grid.prepend(card);
  });
