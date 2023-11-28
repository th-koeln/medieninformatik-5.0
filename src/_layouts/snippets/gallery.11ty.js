exports.render = (eleventy, data, attributes) => {

  const {src} = attributes;
  const {id} = attributes;
  const cssClass = attributes.class;
  const images = data.collections.images.filter(img => img.match(src));
  
  if(images.length === 0) return '';

  const imagesList = images.map(img => {
    const imgPath = img.replace('src/', '/');
    return `
      <li class="gallery-item">
        <a href="${imgPath}">
          <img src="${imgPath}" alt="${imgPath}">
        </a>
      </li>`;
  });

  return `
    <ul id="${id}" class="gallery-grid ${cssClass}" data-js-bluimp-gallery>
      ${imagesList.join("\n")}
    </ul>
  `;
};