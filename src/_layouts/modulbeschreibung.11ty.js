module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "modulbeschreibung",
	},
	render(data) {

		const moduleTools = require('./components/moduleTools.11ty');
		const peopleTools = require('./components/peopleTools.11ty');
		const curriculumTools = require('./components/curriculumTools.11ty');
		const utils = require('./components/utils.11ty.js');
		
		data = moduleTools.addCompetences(data);

		const createRow = (label, value) => {
			if(!value) return "";
			const val = typeof value === 'string' && value.match(/^https/)
				? `<a href="${value}">${value}</a>`
				: value;

			return `
				<tr>
					<th>${label}</th>
					<td>${val}</td>
				</tr>
			`;
		};

		const getModulkompetenzen = (modulkompetenzen) => {
			let lastHandlungsfeld = '';
			let lastBereich = '';

			const list = modulkompetenzen.all.map(item => {

				const displayedHandlungsfeld = item.Handlungsfeld !== lastHandlungsfeld ? item.Handlungsfeld : '';
				const displayedBereich = item.Bereich !== lastBereich ? item.Bereich : '';
				lastHandlungsfeld = item.Handlungsfeld;
				lastBereich = item.Bereich;

				const hasBorderHandlungsfeld = displayedHandlungsfeld !== '' ? 'has-border' : '';
				const hasBorderBereich = displayedBereich !== '' ? 'has-border' : '';
				const hasBorder = hasBorderHandlungsfeld || hasBorderBereich ? 'has-border' : '';

				return `
					<tr class="${hasBorderHandlungsfeld} ${hasBorderBereich}">
						<th class="handlungsfeld ${hasBorderHandlungsfeld}">${displayedHandlungsfeld}</th>
						<th class="bereich ${hasBorderBereich}">${displayedBereich}</th>
						<td class="${hasBorder}">${item.Kompetenz}</td>
					</tr>	
					`;
			});
			return list.join('');
		};
	
		const modulverantwortlich = !data.modulverantwortlich 
			? '' 
			: peopleTools.resolvePerson(data.people, data.modulverantwortlich);

		const dozentinnen = !data.dozierende 
			? '' 
			: peopleTools.resolvePerson(data.people, data.dozierende);

		const coreData = `
			<table class="core-data">
				${createRow("Modulverantwortlich", modulverantwortlich)}
				${createRow("Dozent:innen", dozentinnen)}
				${createRow("Kürzel", data.kuerzel)}
				${createRow("Untertitel", data.untertitel)}
				${createRow("Studiensemester", data.studiensemester)}
				${createRow("Sprache", data.sprache)}
				${createRow("Zuordnung zum Curriculum", data.zuordnungZumCurriculum)}
				${createRow("Kreditpunkte", data.kreditpunkte)}
				${createRow("Voraussetzungen nach Prüfungsordnung", data.voraussetzungenNachPruefungsordnung)}
				${createRow("Empfohlene Voraussetzungen", data.empfohleneVoraussetzungen)}
				${createRow("Weitere Informationen zum Modul", data.infourl)}
				${createRow("Studienleistungen", moduleTools.resolveExamInfoSimple(data.studienleistungen))}
				${createRow("Level", utils.ucFirst(data.kategorie))}
				${createRow("Häufigkeit des Angebots", moduleTools.resolveFrequency(data))}
				${createRow("Verwendung des Moduls in weiteren Studiengängen", moduleTools.studyPrograms(data.weitereStudiengaenge))}
				${createRow("Besonderheiten", data.besonderheiten)}
				${createRow("Präsenzzeit in Stunden", data.praesenzZeit)}
				${createRow("Selbststudium in Stunden", data.selbstStudium)}
				${createRow("Letzte Aktualisierung", utils.getDate(data.page.date))}
			</table>
		`;

		const editUrl = `${data.settings.repoEditUrl}${data.page.inputPath.replace('./src/', 'src/')}`;
		const status = data.meta && data.meta.status ? `is-${data.meta.status}` : '';
		const meta = utils.getContentMeta(this, data.meta);

		const getList = (list) => {
			return list.map(item => `<li>${item}</li>`);
		};

		const lehrform = data.lehrform && data.lehrform.length > 0 
			? `<h2>Lehrform</h2><ul>${getList(data.lehrform).join('')}</ul>` : '';

		const lehrmethoden = data.lehrmethoden && data.lehrmethoden.length > 0 
			? `<h2>Lehrmethoden</h2><ul>${getList(data.lehrmethoden).join('')}</ul>` : '';


		const modulkompetenzen = !data.modulkompetenzen || data.modulkompetenzen.all.length < 2 ? '' 
			: `
				<h2>Geförderter Kompetenzerwerb</h2>

				<p>Die Studierenden … </p>
				<table class="competence-table">${getModulkompetenzen(data.modulkompetenzen)}</table>`;

		return `
			<main>
				<section class="${status} module-core-data">
					<header>
						<h1>${data.title} <a href="${editUrl}"><span class="icon icon--inline">edit</span></a></h1>
					</header>
					${meta}
					${coreData}
				</section>

				<section class="content">
					${lehrform}
					${lehrmethoden}
					${data.content}
					${modulkompetenzen}
				</section>

				${data.kuerzel ? curriculumTools.getChildModulListBySchwerpunkt(data, 'Wählbare Module', this) : ''}
				${data.kuerzel ? curriculumTools.getChildModulList(data, 'Wählbare Module', this) : ''}

			</main>
		`;
	}
}
