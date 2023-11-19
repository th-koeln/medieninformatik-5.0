exports.render = (eleventy, data, attributes) => {

  const curriculumTools = require('../components/curriculumTools.11ty.js');

  const {id} = attributes;
  const {collection} = attributes;
  const {programme} = attributes;

  const cssClass = attributes.class ? attributes.class : '';

  const modulMatrix = curriculumTools.getModulMatrix({
    moduls: data.collections[collection],
    handlungsfelder: data.collections.handlungsfelder,
    programme,
    data,
    eleventy: this
  });

  return `
    <div class="text ${cssClass}" id="${id}">
      ${modulMatrix}
    </div>

  `;
};