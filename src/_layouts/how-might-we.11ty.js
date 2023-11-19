module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "how-might-we",
	},
	render(data) {
    
    const getTagList = (tagData) => {
      const allTags = [...new Set(tagData.flat())].sort();
      let tagList = [];
      allTags.map((item) => {
        const itemAsString = JSON.stringify(item);
        tagList[itemAsString] = true;
      });
  
      return Object.keys(tagList).sort().reverse().map((item) => {
        return JSON.parse(item);
      });
    };


    const getFilterGroup = (filterName) => {
      const tagData = data.collections.howMightWe.map((item) => {
        return item.data.tags;
      });

      const tagList = getTagList(tagData, filterName);
      const tagListForFilter = tagList.map((item) => {
        if(typeof item === "object" && item[filterName]){          
          return `
            <li class="tag" 
              data-js-list-interaction-item-trigger='${JSON.stringify(item)}'>${item[filterName]}</li>
          `;
        }
      });

      return `
        <ul id="filtergroup-${filterName}" class="filter-group" data-js-list-single-choice-filter>
          ${tagListForFilter.join("\n")}
        </ul>
      `;
    };

    const howMightWeList = data.collections.howMightWe.map((item) => {

      const tags = item.data.tags.map((tag) => {
        
        if(typeof tag === "object" && tag["Bewertung"]){
          return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>Bewertung: ${tag["Bewertung"]} ${tag["Bewertung"] > 1 ? "Punkte" : "Punkt"}</span>`;
        }
        return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>${tag}</span>`;
      }).join("\n");


      const dataObject = {
        tags: item.data.tags,
        title: item.data.title,
        src: item.url,
      };

      const content = item.content ? item.content : "";
      return `
        <li class="question" data-js-list-interaction-item='${JSON.stringify(dataObject)}'>
          <p>${item.data.title}</p>
          ${content}
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
          <div class="hero-text">
            <p>Die Anforderungen/ Ideen/ Aussagen aus den <a href="../insights/">Insights</a> wurden verschiedenen Themenfeldern zugeordnet und daraus wurden How-might-we-Fragen abgeleitet. Diese wurden durch das Studiengangs- und das Entwicklungsteam gewichtet. Dabei ergaben sich folgende Gewichte/ Bewertungen:</p>
          </div>
          ${getFilterGroup("Bewertung")}
        </section>

        <section>
          <div class="how-might-we-meta" data-js-list-interactions>
            <header>
              <h3 data-js-list-interaction-header>${howMightWeList.length} Einträge</h3>
            </header>

            <ul class="question-overview" data-js-overview>
              ${howMightWeList.join("\n")}
            </ul>
          </div>
        </section>
			</main>
		`;
	}
}
