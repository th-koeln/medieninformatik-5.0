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
    <ul id="${id}" class="gallery-grid ${cssClass}">
      ${imagesList.join("\n")}
    </ul>

    <script>
      document.getElementById('${id}').onclick = function (event) {
        event = event || window.event
        var target = event.target || event.srcElement
        var link = target.src ? target.parentNode : target
        var options = { index: link, event: event }
        var links = this.getElementsByTagName('a')
        blueimp.Gallery(links, options)
      }
    </script>
  `;
};