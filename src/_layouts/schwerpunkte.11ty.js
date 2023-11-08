module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "content-blocks",
	},
	render(data) {

    const tocTools = require('./components/tocTools.11ty.js');
    const curriculumTools = require('./components/curriculumTools.11ty.js');
    
    const schwerpunkteList = data.collections.schwerpunkte.map((item) => {
      const editUrl = `${data.settings.repoEditUrl}${item.page.inputPath.replace('./src/', 'src/')}`;
      const status = data.meta && data.meta.status ? `is-${data.meta.status}` : '';
      
      const moduls = curriculumTools.getAllModuls({
        //moduls: data.collections.modulsMPO5.filter(modul => modul.data.schwerpunkt === item.data.kuerzel),
        moduls: data.collections.modulsMPO5.filter(modul => ((modul.data.schwerpunkt? modul.data.schwerpunkt : "")+"").includes(item.data.kuerzel)),
        data,
        eleventy: this
      });

      return `
        <section class="${item.data.class ? item.data.class : ''} ${item.data.level===1 ? 'has-seperator' : ''}">
          <div class="content">
            <h${item.data.level + 1} id="${this.slugify(item.data.title)}">${status}${item.data.title} <a href="${editUrl}" title="Inhalt ändern"><span class="icon icon--inline">edit</span></a></h${item.data.level + 1}>
              ${item.content}
              <h${item.data.level + 2}>Module für diesen Schwerpunkt</h${item.data.level + 2}>
              ${moduls}
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
              collection: data.collections.schwerpunkte,
              maxLevel: 1
            })}
          </nav>
        </section>

        ${data.content}

        <section>
          ${schwerpunkteList.join("\n")}
        </section>
			</main>
		`;
	}
}
