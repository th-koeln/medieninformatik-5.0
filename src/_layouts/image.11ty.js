exports.render = function (data) {

  const imageUrl = `${data.page.filePathStem}.png`;
  return `
    <figure class="image">
      <img src="${this.url(imageUrl)}" alt="${data.title}" />
      <figcaption>
        <strong>${data.title}</strong>
        <p>${data.info}</p>
      </figcaption>
    </figure>
  `;
};
