exports.render = (eleventy, data, attributes) => {

  const {src} = attributes;
  const {id} = attributes;
  const cssClass = attributes.class;
  const file = data.collections.all.filter(item => item.filePathStem.match(src));

  if(file.length === 0) return '';


  return `
    <div class="text ${cssClass}" id="${id}">
      ${file[0].templateContent}
    </div>


  `;
};