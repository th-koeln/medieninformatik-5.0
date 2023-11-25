exports.render = (eleventy, data, attributes) => {

  const {src} = attributes;
  const {id} = attributes;
  const cssClass = attributes.class ? attributes.class : '';

  const handlungsfelder = data.collections.handlungsfelder.map(handlungsfeld =>{
    return `
      <div>
        <h3>${handlungsfeld.data.title} <span class="is-less-important">(${handlungsfeld.data.kuerzel.toUpperCase()})</span></h3>
        ${handlungsfeld.content}
        <a href="${ handlungsfeld.url}">Mehr zum Handlungsfeld ${handlungsfeld.data.title}</a>
      </div>
    `;
  });

  return `
    <div class="text ${cssClass}" id="${id}">
      ${handlungsfelder.join("\n")}
    </div>


  `;
};