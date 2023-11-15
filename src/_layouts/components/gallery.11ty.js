exports.getLightboxDialog = () => {
  return `
  <!-- The Gallery as lightbox dialog, should be a document body child element -->
  <div
    id="blueimp-gallery"
    class="blueimp-gallery"
    aria-label="image gallery"
    aria-modal="true"
    role="dialog"
  >
    <div class="slides" aria-live="polite"></div>
    <h3 class="title"></h3>
    <a
      class="prev"
      aria-controls="blueimp-gallery"
      aria-label="previous slide"
      aria-keyshortcuts="ArrowLeft"
    ></a>
    <a
      class="next"
      aria-controls="blueimp-gallery"
      aria-label="next slide"
      aria-keyshortcuts="ArrowRight"
    ></a>
    <a
      class="close"
      aria-controls="blueimp-gallery"
      aria-label="close"
      aria-keyshortcuts="Escape"
    ></a>
    <a
      class="play-pause"
      aria-controls="blueimp-gallery"
      aria-label="play slideshow"
      aria-keyshortcuts="Space"
      aria-pressed="false"
      role="button"
    ></a>
    <ol class="indicator"></ol>
  </div>
  `;
}