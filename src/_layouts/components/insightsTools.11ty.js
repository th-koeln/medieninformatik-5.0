exports.insightsList = (data, source) => {

  const filteredInsights = data.collections.insights.filter((item) => {
    return item.data.tags.find((tag) => {
      return tag["Von"] && tag["Von"] === source;
    });
  });

  return filteredInsights.map((item) => {

    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
      return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
  
    let color = "black";
  
    const tags = item.data.tags.map((tag) => {
      if(typeof tag === "object" && tag["Themenfeld"]){
        return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>Themenfeld: ${tag["Themenfeld"]}</span>`;
      }
      if(typeof tag === "object" && tag["Handlungsbereich"]){
        return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>Handlungsbereich: ${tag["Handlungsbereich"]}</span>`;
      }
      if(typeof tag === "object" && tag["Von"]){
        color = tag["Von"].length.map(0, 20, 0, 360);
        return `<span class="tag" style="color: #ffffff; background-color: hsla(${color}, 60%, 50%,100%); border-color: hsla(${color}, 60%, 50%,100%);" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>Von: ${tag["Von"]}</span>`;
      }
      return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>${tag}</span>`;
    }).join("\n");
  
    const borderColor = `border-color: hsl(${color}, 60%, 50%)`;
  
    const dataObject = {
      tags: item.data.tags,
      title: item.data.title,
      src: item.url,
    };
  
    return `
      <li class="insight" style="${borderColor}" data-js-list-interaction-item='${JSON.stringify(dataObject)}'>
        <p>${item.data.title}</p>
        ${tags}
      </li>
    `;
  });
}; 