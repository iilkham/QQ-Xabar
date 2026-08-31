const editorForm = document.querySelector("#adminForm");
const editorMessage = document.querySelector("#adminMessage");
const categoryKeys = {
  Общество: "society",
  Политика: "politics",
  Экономика: "economy",
  Технологии: "technology",
  Спорт: "sport",
  Культура: "culture",
};

function sanitizeText(value) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
    return entities[character];
  });
}

editorForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(editorForm);
  const categoryOption = editorForm.querySelector("option:checked");
  const item = {
    title: sanitizeText(formData.get("title").trim()),
    categoryLabel: categoryOption.textContent,
    category: categoryKeys[categoryOption.textContent] ?? "society",
    description: sanitizeText(formData.get("description").trim()),
    image: formData.get("image").trim(),
  };
  const items = JSON.parse(localStorage.getItem("qq-added-news") ?? "[]");
  items.unshift(item);
  localStorage.setItem("qq-added-news", JSON.stringify(items));
  editorMessage.textContent = "Новость сохранена. Откройте главную страницу, чтобы увидеть её.";
  editorForm.reset();
});
