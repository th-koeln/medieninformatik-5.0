module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "insights",
	},
	render(data) {

    const getTagList = (tagData) => {
      const allTags = [...new Set(tagData.flat())].sort();
      let tagList = [];
      allTags.map((item) => {
        const itemAsString = JSON.stringify(item);
        tagList[itemAsString] = true;
      });
  
      return Object.keys(tagList).sort().map((item) => {
        return JSON.parse(item);
      });
    };

    const getFilterGroup = (filterName) => {
      const tagData = data.collections.insights.map((item) => {
        return item.data.tags;
      });

      const tagList = getTagList(tagData, filterName);
      const tagListForFilter = tagList.map((item) => {
        if(typeof item === "object" && item[filterName]){

          const color = filterName === "Von" ? item[filterName].length.map(0, 20, 0, 360) : 330;
          return `
            <li class="tag" 
              style="color: #ffffff; background-color: hsla(${color}, 60%, 50%,100%); border-color: hsla(${color}, 60%, 50%,100%);" 
              data-js-list-interaction-item-trigger='${JSON.stringify(item)}'>${item[filterName]}</li>
          `;
        }
      });

      return `
        <ul class="filter-group" data-js-list-interaction-mode="single-choice">
          ${tagListForFilter.join("\n")}
        </ul>
      `;
    };

    const insightsList = data.collections.insights.map((item) => {

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

		return `
			<main>
				<section>
					<header>
						<h1>${data.title}</h1>
					</header>
				</section>

        <section>
          <p>Im Prozess wurden Anforderungen/ Ideen/ Aussagen von folgenden Stakeholdern eingesammelt:</p>
          ${getFilterGroup("Von")}
        </section>

        <section>
          <p>Die Anforderungen/ Ideen/ Aussagen wurden folgenden Themenfeldern zugeordnet:</p>
          ${getFilterGroup("Themenfeld")}
        </section>

        <section>
          <p>Die Anforderungen/ Ideen/ Aussagen wurden folgenden Handlungsbereichen zugeordnet:</p>
          ${getFilterGroup("Handlungsbereich")}
        </section>

        <section>
          <div class="insight-meta" data-js-list-interactions>
            <header>
              <h3 data-js-list-interaction-header>${insightsList.length} Einträge</h3>
            </header>

            <ul class="insight-overview">
              ${insightsList.join("\n")}
            </ul>
          </div>
        </section>
			</main>
		`;
	}
}
