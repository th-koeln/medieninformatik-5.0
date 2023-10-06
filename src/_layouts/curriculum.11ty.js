module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data) {
    
    const curriculumTools = require('./components/curriculumTools.11ty.js');
    const curriculumList = curriculumTools.getCurriculumList({
      moduls: data.collections.modulsBPO5,
      terms: [1,2,3,4,5,6,7],
      data
    });
    const curriculumTable = curriculumTools.getCurriculumTable({
      moduls: data.collections.modulsBPO5,
      terms: [1,2,3,4,5,6,7],
      groups: ['Grundlagen', 'Vertiefung', 'Spezialisierung'],
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
