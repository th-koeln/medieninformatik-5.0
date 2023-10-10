module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "content-blocks",
	},
	render(data) {

    const tocTools = require('./components/tocTools.11ty.js');
    const utils = require('./components/utils.11ty.js');

    const getCompetencies = (competencies, parentId) => {
      if(!competencies) return '';

      const competenciesList = Object.entries(competencies).map((item) => {
        const competenceGroupKey = item[0];
        const competenceGroupData = item[1];

        const competenceItemList = Object.entries(competenceGroupData).map((item) => {
          const competenceItemKey = item[0];
          const competenceItemValue = item[1];

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
      const editUrl = `${data.settings.repoEditUrl}${item.page.inputPath.replace('./src/', 'src/')}`;
      const status = utils.showStatus(item.data.status);
      const competencies = getCompetencies(item.data.competencies, item.page.fileSlug)

      return `
        <section class="${item.data.class ? item.data.class : ''} ${item.data.level===1 ? 'has-seperator' : ''}">
          <div class="content">
            <h${item.data.level + 1} id="${this.slugify(item.data.title)}">${status}${item.data.title} <a href="${editUrl}" title="Inhalt ändern"><span class="icon icon--inline">edit</span></a></h${item.data.level + 1}>
            ${item.content}
            ${competencies}
          </div>
        </section>
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
          <nav>
            ${tocTools.getPageTOC({
              eleventy: this,
              collection: data.collections.handlungsfelder,
              maxLevel: 1
            })}
          </nav>
        </section>

        ${data.content}

        <section>
          ${handlungsfelderList.join("\n")}
        </section>
			</main>
		`;
	}
}
