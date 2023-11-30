module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "content-blocks handlungsfelder",
	},
	render(data, context) {

    const eleventy = context ? context : this;

    const tocTools = require('./components/tocTools.11ty.js');
    const utils = require('./components/utils.11ty.js');

    const getCompetencies = (competencies, parentId) => {
      if(!competencies) return '';

      const competenciesList = competencies.map(item => {
        
        const competenceGroupKey = item.title;
        const competenceGroupData = item.sub;

        const competenceItemList = competenceGroupData.map(item => {
          const competenceItemKey = item.title;
          const competenceItemValue = item.competence;

          return `<li data-js-inject-in-other-context="${parentId}:${competenceGroupKey}:${competenceItemKey}">${competenceItemValue}</li>`;
        });

        return `
          <h3>${competenceGroupKey}</h3>
          <ul>
            ${competenceItemList.join("\n")}
          </ul>
        `;
      });

      return competenciesList.join("\n");      
    };

    const handlungsfelderList = data.collections.handlungsfelder.map((item) => {
      const status = item.data.meta && item.data.meta.status ? `is-${item.data.meta.status}` : '';
      const competencies = getCompetencies(item.data.competencies, item.page.fileSlug)
      const meta = utils.getContentMeta(eleventy, item.data.meta);
      
      const cssClass = item.data.cssClass ? `class="${item.data.cssClass}"` : '';

      return `
        <section class="${status} ${item.data.class ? item.data.class : ''} ${item.data.level===1 ? 'has-seperator' : ''}">
          <div class="content">
            <h${item.data.level + 1} id="${eleventy.slugify(item.data.title)}" ${cssClass}>${item.data.title}
              ${utils.getOpenInNewWindowLink(item)}${utils.getEditLink(item, data)} (${item.data.kuerzel.toUpperCase()})</h${item.data.level + 1}>
            ${meta}
           ${item.content}
            ${competencies}
          </div>
        </section>
      `;
    });

		return `
    <div class="content-wrap">
      <aside>
        <nav>
        ${tocTools.getPageTOC({
          eleventy,
          collection: data.collections.handlungsfelder,
          maxLevel: 1
        })}
      </nav>
      </aside>
		  <main>
			  <section>
				  <header>
					  <h1>${data.title}</h1>
				  </header>
			  </section>
        <section class="intro-text">
          ${data.content}
        </section>
        <section>
          ${handlungsfelderList.join("\n")}
        </section>
  		</main>
    </div>
		`;
	}
}
