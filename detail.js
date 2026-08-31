const params = new URLSearchParams(location.search);
const title = params.get("title");
const image = params.get("image");
const category = params.get("category");
if (title) {
  document.title = `${title} — QQ.XABAR`;
  document.getElementById("articleTitle").textContent = title;
  document.getElementById("articleLead").textContent =
    `Подробная информация по теме «${title}» — главное в одном материале.`;
}
if (image) document.getElementById("articleImage").src = image;
if (category) document.getElementById("articleCategory").textContent = category;
