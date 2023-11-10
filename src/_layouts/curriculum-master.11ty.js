module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data) {
    const { collection } = data;
    const curriculumTools = require('./components/curriculumTools.11ty.js');

    const curriculumList = curriculumTools.getCurriculumList({
      moduls: data.collections[collection].filter(item=>item.data.typ==='pm'),
      terms: data.terms,
      maxCPS: data.maxCPS,
      data,
      eleventy: this
    });

    const curriculumTable = curriculumTools.getCurriculumTable({
      moduls: data.collections[collection],
      terms: data.terms,
      groups: data.groups,
      maxCPS: data.maxCPS,
      data,
      eleventy: this
    });

    const allModuls = curriculumTools.getAllModulsMaster({
      moduls: data.collections[collection],
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
          ${curriculumList}
        </section>

        <section>
          ${curriculumTable}
        </section>

        <section class="has-seperator">
          <h2>Alle Module</h2>
          ${allModuls}
        </section>
			</main>
		`;
	}
}
