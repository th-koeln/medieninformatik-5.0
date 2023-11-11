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
					${data.content}
				</section>

				${data.kuerzel ? curriculumTools.getChildModulListBySchwerpunkt(data, 'Wählbare Module') : ''}
				${data.kuerzel ? curriculumTools.getChildModulList(data, 'Wählbare Module') : ''}

			</main>
		`;
	}
}
