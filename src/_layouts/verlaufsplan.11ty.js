module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data) {
    const { collection } = data;
    const curriculumTools = require('./components/curriculumTools.11ty.js');

    const curriculumList = curriculumTools.getCurriculumList({
      moduls: data.collections[collection],
      terms: data.terms,
      maxCPS: data.maxCPS,
      studienverlauf: data.studienverlauf,
      data,
      eleventy: this
    });

    const curriculumVerlaufTable = curriculumTools.getCurriculumVerlaufsplanTable({
      moduls: data.collections[collection],
      terms: data.terms,
      groups: data.groups,
      maxCPS: data.maxCPS,
      studienverlauf: data.studienverlauf,
      data,
      eleventy: this
    });

    const allModuls = curriculumTools.getAllModuls({
      moduls: data.collections[collection],
      data,
      eleventy: this
    });

    const curriculumVerlaufList = data.showModuleList && data.showModuleList === true
      ? `<section>${curriculumList}</section>` : '';


		return `
			<main>
				<section class="module-core-data">
					<header>
						<h1>${data.title}</h1>
					</header>
				</section>

        ${data.hinweise ? "<div class='is-tbd' style='padding-bottom: 10px; padding-top: 10px; margin-bottom: 20px;'><h2>Please check</h2>" : ""}
        <section class="content">
          ${data.content}
        </section>

        ${curriculumVerlaufList}

        <section>
          ${curriculumVerlaufTable}
        </section>

        <section class="has-seperator">
          <h2>Alle Module</h2>
          ${allModuls}
        </section>

			</main>
		`;
	}
}
