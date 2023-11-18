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

		
		/* ############################################################################
		Modulkompetenzen zusammen bauen … dat is ein bisschen kompliziert */

		const getModulkompetenzenList = (modulkompetenzen) => {
			let lastHandlungsfeld = '';
			let lastBereich = '';

			// ausführliche Liste mit allen Kompetenzen
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

			return list;
		};

		// Tabelle mit den Kompetenzen pro Handlungsfeld und Chart
		const getCompetenceScores = (kompetenzen) => {

			const { handlungsfelderMapInverted, handlungsfelderOverall, bereicheMapInverted } = kompetenzen;
			const scoresHandlungsfelder = {};

			for (const [key, value] of Object.entries(handlungsfelderMapInverted)) {
				
				if(!handlungsfelderOverall[key]) continue;
				const handlungsfeld = handlungsfelderOverall[key];
				
				let result = 0;
				const scoresBereiche = {};

				for (const [key, value] of Object.entries(handlungsfeld)) { 
					scoresBereiche[key] = result;
					result += value 
				};
				if(result === 0) continue;

				scoresHandlungsfelder[value] = scoresBereiche;
	
			}

			const scoresTable = Object.entries(scoresHandlungsfelder).map(([key, values]) => {
				const valuesTable = Object.entries(values).map(([key, value]) => {
					return `
						<tr>
						<th>${bereicheMapInverted[key]}</th>
						<td>${value}</td>
						</tr>
					`;
				});
				return `
					<div class="score">
						<h3>${key}</h3>
						<table>${valuesTable.join('')}</table>
					</div>
				`;
			});
				
			return `
				${scoresTable.join('')}
			`;
		};

		// Kompetenz-Daten für den Chart, die vie Data-Atrribute im HTML-Element gespeichert und ins JS übergeben werden
		const modulkompetenzenData = !data.kompetenzen || data.kompetenzen.handlungsfelderOverall.length < 2 
			? '' : JSON.stringify(data.kompetenzen.handlungsfelderOverall);
		
		// Beschreiftungsdaten für den Chart, die vie Data-Atrribute im HTML-Element gespeichert und ins JS übergeben werden
		const handlungsfelderMapInverted = !data.kompetenzen || !data.kompetenzen.handlungsfelderMapInverted 
			? '' : JSON.stringify(data.kompetenzen.handlungsfelderMapInverted);	

		const getModulkompetenzen = (modulkompetenzen) => {

			const modulkompetenzenList = getModulkompetenzenList(modulkompetenzen);
			
			return `
				<section class="has-seperator">
					<h2>Geförderter Kompetenzerwerb</h2>

					<div class="scores-and-charts">
						<div data-chart='${modulkompetenzenData}' data-handlungsfelder='${handlungsfelderMapInverted}'>
							<canvas id="competence-chart"></canvas>
						</div>
						<div class="scores">
							${getCompetenceScores(data.kompetenzen)}
						</div>
					</div>

					<p>Die Studierenden …</p>
					<table class="competence-table">${modulkompetenzenList.join('')}</table>
				</section>

			`;
		};
		
		/* EOF Modulkompetenzen
		############################################################################ */

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

		const modulkompetenzen = !data.kompetenzen || data.kompetenzen.all.length < 2 ? '' : getModulkompetenzen(data.kompetenzen);			

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
				</section>

				${modulkompetenzen}
				
				${data.kuerzel ? curriculumTools.getChildModulListBySchwerpunkt(data, 'Wählbare Module', this) : ''}
				${data.kuerzel ? curriculumTools.getChildModulList(data, 'Wählbare Module', this) : ''}

			</main>
		`;
	}
}
