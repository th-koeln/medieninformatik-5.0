exports.render = (eleventy, data, attributes) => {

  const curriculumTools = require('../components/curriculumTools.11ty.js');

  const {src} = attributes;
  const {id} = attributes;
  const file = data.collections.all.filter(item => item.filePathStem.match(src))[0];
  const collection = file.data.collection;

  const cssClass = attributes.class ? attributes.class : '';

  const curriculumVerlaufTable = curriculumTools.getCurriculumVerlaufsplanTable({
    moduls: data.collections[collection],
    terms: file.data.terms,
    groups: file.data.groups,
    maxCPS: file.data.maxCPS,
    studienverlauf: file.data.studienverlauf,
    data,
    eleventy
  });

  return `
    <div class="text ${cssClass}" id="${id}">
      ${curriculumVerlaufTable}
    </div>

  `;
};