/* Einfaches Bild mit Beschriftung
############################################################################ */

exports.getImageBlock = (src, caption) => {

  return `
    <figure>
      <img src="${src}" alt="${caption}" />
      <figcaption>${caption}</figcaption>
    </figure>
  `;
};

/* Screenshot mit Beschriftung
############################################################################ */

exports.getScreenshotBlock = (src, caption) => {

  return `
    <figure class="screenshot">
      <div class="screenshot-wrapper">
        <img src="${src}" alt="${caption}" />
      </div>
      <figcaption>${caption}</figcaption>
    </figure>
  `;
};