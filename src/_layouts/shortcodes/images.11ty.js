/* Einfaches Bild mit Beschriftung
############################################################################ */

exports.getImageBlock = (src, caption) => {

  return `
    <figure class="image">
      <img loading="lazy" src="${src}" alt="${caption}" />
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
        <img loading="lazy" src="${src}" alt="${caption}" />
      </div>
      <figcaption>${caption}</figcaption>
    </figure>
  `;
};

/* Image Gallery
############################################################################ */

const gallerySnippet = require('../snippets/gallery.11ty.js');

exports.getGallery = (eleventy, data, attributes) => {
  const html = gallerySnippet.render(eleventy, data, attributes)
  const cleanHTML = html.replace(/[\r\n|\n|\r]/gm, "");
  return cleanHTML;
};
