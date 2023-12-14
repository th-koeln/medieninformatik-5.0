exports.render = (eleventy, data, attributes) => {

  const modulbeschreibungTool = require('../modulbeschreibung.11ty.js');

  const {id} = attributes;
  const {collection} = attributes;

  const cssClass = attributes.class ? attributes.class : '';

  const modules = data.collections[collection].sort((a, b) => {
    return a.data.order - b.data.order;
  });

  const modulesList = modules.map(module => {

    const moduleData = {
      "data": module.data,
      "content": module.content,
      "Demo": "Demo",
    };

    const modulbeschreibung = modulbeschreibungTool.render(moduleData, eleventy, moduleData)
      .replace(/<h5/g, '<h6')
      .replace(/<h4/g, '<h6')
      .replace(/<h3/g, '<h5')
      .replace(/<h2/g, '<h4')
      .replace(/<h1/g, '<h3')
      .replace(/<main>(.*?)<\/main>/isg, "$1");

    return `
      <div class="modulbeschreibung print">
       ${modulbeschreibung}
      </div>
    `;
  });

  return `
    <div class="text ${cssClass}" id="${id}">
      ${modulesList.join('')}
    </div>
  `;
};