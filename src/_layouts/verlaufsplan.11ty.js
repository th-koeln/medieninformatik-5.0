module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data) {
    const { collection } = data;
    const curriculumTools = require('./components/curriculumTools.11ty.js');

    const curriculumVerlaufTable = curriculumTools.getCurriculumVerlaufsplanTable({
      moduls: data.collections[collection],
      terms: data.terms,
      groups: data.groups,
      maxCPS: data.maxCPS,
      studienverlauf: data.studienverlauf,
      data,
      eleventy: this
    });


		return `
			<main>
				<section class="module-core-data">
					<header>
						<h1>${data.title}</h1>
					</header>
				</section>

        <section class="content">
          ${data.content}
        </section>

        <section>
          ${curriculumVerlaufTable}
        </section>

			</main>
		`;
	}
}
