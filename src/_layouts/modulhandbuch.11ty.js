module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "modulhandbuch",
	},
	render(data) {

		const moduleTools = require('./components/moduleTools.11ty');
		const peopleTools = require('./components/peopleTools.11ty');
		const curriculumTools = require('./components/curriculumTools.11ty');
		const utils = require('./components/utils.11ty.js');
		const eleventy = this;
		
		
		return `
			<main>
				<section class="cover">
					<header>
						<p class="owner">Fakultät für Informatik und Ingenieurwissenschaften</p>
						<h1 class="title">Modulhandbuch</h1>
						<h2 class="subtitle">${data.name}</h2>
						<p class="degree">${data.degree}</p>
						<div class="version-and-date">
						<p class="version">Version ${data.version}</p>
						<p class="date">Letzte Änderung am ${utils.getDate(data.page.date)}</p>
						</div>
					</header>
					
				</section>

				<section class="content">
					${utils.parseContent(this, data)}
				</section>
			</main>
		`;
	}
}
