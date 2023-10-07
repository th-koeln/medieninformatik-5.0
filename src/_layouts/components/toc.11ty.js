exports.getTocContent = (eleventy, data) => {

  const createToc = (collection) => {
    const tocItems = collection.map((item) => `<li><a href="${eleventy.url(item.url)}">${item.data.title}</a></li>`);

    return `
      <ul class="item-list">
        ${tocItems.join("\n")}
      </ul>`;
  }

  return `
    <nav class="inline-navigation">
      ${createToc(data.collections.pagesInToc)}
    </nav>
  `;
};


