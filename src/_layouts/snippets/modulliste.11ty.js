exports.render = (eleventy, data, attributes) => {

  const curriculumTools = require('../components/curriculumTools.11ty.js');

  const {id} = attributes;
  const {collection} = attributes;

  const cssClass = attributes.class ? attributes.class : '';

  const moduleList = curriculumTools.getAllModuls({
    moduls: data.collections[collection],
    data,
    eleventy
  });

  return `
    <div class="text ${cssClass}" id="${id}">
      ${moduleList}
    </div>
  `;
};