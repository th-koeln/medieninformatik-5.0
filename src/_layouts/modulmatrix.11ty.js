module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data ) {
    
    eleventy: this;

    const curriculumTools = require('./components/curriculumTools.11ty.js');

    const { collection } = data;
    const { studyProgramme } = data;
    
    const modulMatrix = curriculumTools.getModulMatrix({
      moduls: data.collections[collection],
      handlungsfelder: data.collections.handlungsfelder,
      studyProgramme,
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
          ${modulMatrix}
        </section>


			</main>
		`;
	}
}
