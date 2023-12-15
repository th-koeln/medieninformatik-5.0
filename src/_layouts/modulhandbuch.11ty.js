module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "modulhandbuch",
	},
	render(data) {
		const utils = require('./components/utils.11ty.js');
		const printUrl = data.page.url.replace(/(.*)\//, "$1-print/");
		return `

		<div class="content-wrap">
			<aside>
				<nav data-js-toc></nav>
			</aside>
			<main>
				<section class="cover">
					<header>
						<p class="owner">Technische Hochschule Köln<br/>Fakultät für Informatik und Ingenieurwissenschaften</p>
						<h1 class="title">Modulhandbuch</h1>
						<h2 class="subtitle">${data.name}</h2>
						<p class="degree">${data.degree}</p>
						<div class="version-and-date">
							<p class="version">Version ${data.version}</p>
							<p class="date">Letzte Änderung am ${utils.getDate(data.page.date)}</p>
						</div>
					</header>
				</section>

        <div data-js-page-navigation=".content h2"></div>
				
				<section class="content has-seperator">
					${utils.parseContent(this, data)}
				</section>

				<a href="${printUrl}"><span class="icon">print</span> Druckversion zum Abheften</a>
			</main>
		</div>
		`;
	}
}
