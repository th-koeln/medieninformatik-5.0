module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "people-list",
	},
	render(data) {
    
    const peopleTools = require('./components/peopleTools.11ty.js');
    const peopleList = peopleTools.getPeopleList({
      moduls: data.collections.modulsBPO5,
      data
    });

		return `
			<main>
				<section>
					<header>
						<h1>${data.title}</h1>
					</header>
				</section>

        <section class="content">
          ${data.content}
        </section>

        <section>
          ${peopleList}
        </section>

			</main>
		`;
	}
}
