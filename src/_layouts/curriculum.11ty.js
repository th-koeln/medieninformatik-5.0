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
      data
    });
    const curriculumTable = curriculumTools.getCurriculumTable({
      moduls: data.collections[collection],
      terms: data.terms,
      groups: data.groups,
      maxCPS: data.maxCPS,
      data
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
			</main>
		`;
	}
}
