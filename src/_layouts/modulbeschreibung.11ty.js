module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "modulbeschreibung",
	},
	render(data, context, givenData) {

		const eleventy = context ? context : this;

		// Für die Druckversion wird die Modulbeschreibung mit anderen Daten gerendert
		const moduleData = givenData ? givenData.data : data;
		
		const moduleTools = require('./components/moduleTools.11ty');
		const peopleTools = require('./components/peopleTools.11ty');
		const curriculumTools = require('./components/curriculumTools.11ty');
		const utils = require('./components/utils.11ty.js');
	
		const translateStars = moduleTools.translateStars;
		
		const urlPrefix = eleventy.urlPrefix();
		const studyProgramme = moduleData.modulniveau;
		const pathToCompetenceMap = eleventy.getCompetencesToModuleMapPath(studyProgramme) 
			? `${urlPrefix}/${eleventy.getCompetencesToModuleMapPath(studyProgramme)}` : '';

		data = moduleTools.addCompetences(moduleData);
		const idModul = eleventy.slugify(data.title);

		const createRow = (label, value) => {
			if(!value) return "";
			const val = typeof value === 'string' && value.match(/^https/)
				? (value.includes('ilias') ? `<a href="${value}">siehe Ilias <span class="icon icon--inline">open_in_new</span></a>` : `<a href="${value}">${value}</a>`)
				: value;

			const displayValue = Array.isArray(value) ? `${value.join(', ')}` : val;

			return `
				<tr>
					<th>${label}</th>
					<td>${displayValue}</td>
				</tr>
			`;
		};

		/* ############################################################################
		Modulkompetenzen zusammen bauen … dat is ein bisschen kompliziert */

		const getModulkompetenzenList = (modulkompetenzen) => {

			const { handlungsfelderMap } = modulkompetenzen;

			let lastHandlungsfeld = '';
			let lastBereich = '';

			const competenceTree = {};
			modulkompetenzen.all.forEach(item => {
				if(!competenceTree[item.Handlungsfeld]) competenceTree[item.Handlungsfeld] = {};
				if(!competenceTree[item.Handlungsfeld][item.Bereich]) competenceTree[item.Handlungsfeld][item.Bereich] = [];
				competenceTree[item.Handlungsfeld][item.Bereich].push(item);
			});

			const list = Object.entries(competenceTree).map(([key, value]) => {
				
				const title = key !== lastHandlungsfeld ? `<h3>${key}</h3>` : '';
				lastHandlungsfeld = key;

				const list = Object.entries(value).map(([key, values]) => {
					const title = key !== lastBereich ? `<h4>${key}</h4>` : '';
					lastBereich = key;
					
					const list = values.map(item => {

						const kompetenzId = eleventy.slugify(item.Kompetenz).substr(0,48);
						const linkToCompetenceMap = pathToCompetenceMap ? `${pathToCompetenceMap}#${kompetenzId}` : '';

						return `
							<li>
								<div class="score-indicator-group-wrap">
									<div class="score-indicator-group">
										<span data-js-hyperlink="${linkToCompetenceMap}" title="Modul liefert ${translateStars(item.liefert)} dieser Kompetenz. Hinter dem Link finden Sie Module, welche auf diese Kompetenz einzahlen." class="score-value-indicator liefert" style="width: calc(${item.liefert} * 9%)"></span>
										<span data-js-hyperlink="${linkToCompetenceMap}" title="Modul erfordert ${translateStars(item.braucht)} dieser Kompetenz. Hinter dem Link finden Sie Module, welche auf diese Kompetenz einzahlen." class="score-value-indicator braucht" style="width: calc(${item.braucht} * 9%); transform: translateX(-100%)"></span>
									</div>
								</div>
								<p>${item.Kompetenz}</p>
							</li>
						`;
					});

					const idBereich = eleventy.slugify(key);

					return `
						<li id="${idBereich}">
							${title}
							<ul class="single-competence-list is-tight">
								${list.join('')}
							</ul>
						</li>
					`;
				});

				const handlungsfeldKuerzel = handlungsfelderMap.get(key);
				const scoreCssClass = handlungsfeldKuerzel ? handlungsfeldKuerzel.toLowerCase() : '';
				const idHandlungsfeld = eleventy.slugify(key);

				return `
					<div class="competence-block" id="${idHandlungsfeld}">
						${title}
						<ul class="is-tight competence-bereiche indicate-as-${scoreCssClass}">
							${list.join('')}
						</ul>
					</div>
				`;
			});

			return list;
		};

		// Tabelle mit den Kompetenzen pro Handlungsfeld und Chart
		const getCompetenceScores = (kompetenzen) => {

			const { handlungsfelderMap, handlungsfelderMapInverted, handlungsfelderOverall, bereicheMapInverted } = kompetenzen;
			const scoresHandlungsfelder = {};

			for (const [key, value] of Object.entries(handlungsfelderMapInverted)) {
				
				if(!handlungsfelderOverall[key]) continue;
				const handlungsfeld = handlungsfelderOverall[key];
				
				let result = 0;
				const scoresBereiche = {};

				for (const [key, value] of Object.entries(handlungsfeld)) {
					if(value.liefert === 0) continue;
					scoresBereiche[key] = value.liefert;
					result += value.liefert;
				};
				if(result === 0) continue;

				scoresHandlungsfelder[value] = scoresBereiche;	
			}

			const scoresTable = Object.entries(scoresHandlungsfelder).map(([key, values]) => {
				const valuesList = Object.entries(values).map(([key, value]) => {
					const idBereich = eleventy.slugify(bereicheMapInverted[key]);
				
					return `
						<li>
							<span class="score-value-indicator" style="width: calc(${value} * 5%)"></span>
							<a href="#${idBereich}">${bereicheMapInverted[key]}</a>
						</li>
					`;
				});

				const handlungsfeldId = handlungsfelderMap.get(key);
				const scoreCssClass = handlungsfeldId.toLowerCase();
				return `
					<div class="score indicate-as-${scoreCssClass}">
						<h3>${key}</h3>
						<ul class="score-list">${valuesList.join('')}</ul>
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

		/* Welche Kompetenzen werden mit diesem Modul erworben?
		############################################################################ */
		const getModulkompetenzen = (modulkompetenzen) => {

			const modulkompetenzenList = getModulkompetenzenList(modulkompetenzen);
			
			return `
				<section class="has-seperator">
					<h2>Geförderter Kompetenzerwerb</h2>

					<div class="scores-and-charts">

						<div>
							<p class="description-text">Das Modul zahlt auf folgende Handlungsfelder und Kompetenzbereiche ein. Eine ausführliche Beschreibung der konkreten Komptenzen finden Sie weiter unten.</p>
							<div class="chart" 
								data-chart='${modulkompetenzenData}' 
								data-handlungsfelder='${handlungsfelderMapInverted}' 
								data-target="competence-chart-erwerb-${idModul}"
								data-direction="erwerb">
								<canvas id="competence-chart-erwerb-${idModul}"></canvas>
							</div>
						</div>
						<div class="scores">
							${getCompetenceScores(data.kompetenzen)}
						</div>
					</div>

					<div class="competence-list">${modulkompetenzenList.join('')}</div>

					<p>
						In der linken Spalte sehen Sie, welche Kompetenzen für das Modul vorausgesetzt werden (hellgrauer Balken). In der rechten Spalte sehen Sie, welche Kompetenzen Sie mit dem Modul erwerben können (farbiger Balken). Die Kompetenzen sind in Handlungsfelder und Bereiche gegliedert. 
					</p>
					<p>
						Wenn Sie auf den grauen oder farbigen Balken klicken, gelangen Sie zu einer Liste von Modulen, die auf diese Kompetenz einzahlen. Hier finden die eine <a href="${pathToCompetenceMap}">Übersicht über alle Kompetenzen und die Module, die auf diese einzahlen</a>.
					</p>
				</section>

			`;
		};
		
		/* EOF Modulkompetenzen
		############################################################################ */

		const modulverantwortlich = !data.modulverantwortlich 
			? '' 
			: peopleTools.resolvePerson(data.people, data.modulverantwortlich);

		const avatars = !data.modulverantwortlich 
			? '' 
			: peopleTools.resolvePersonAndGetAvatar(data.people, data.modulverantwortlich, eleventy);

		const dozentinnen = !data.dozierende 
			? '' 
			: peopleTools.resolvePerson(data.people, data.dozierende);

		const lastChanges = data.page ? createRow("Letzte Aktualisierung", utils.getDate(data.page.date)) : '';

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
				${createRow("Lehrformen", data.lehrform)}
				${createRow("Lehrmethoden", data.lehrmethoden)}
				${lastChanges}
			</table>
		`;

		const editUrl = data.settings ? `${data.settings.repoEditUrl}${data.page.inputPath.replace('./src/', 'src/')}` : '';
		const status = data.meta && data.meta.status ? `is-${data.meta.status}` : '';
		const meta = utils.getContentMeta(eleventy, data.meta);

		const modulkompetenzen = !data.kompetenzen || data.kompetenzen.all.length < 2 ? '' : getModulkompetenzen(data.kompetenzen);			
		
		return `
			<main>
				<section class="${status} module-core-data">
					<header>
						${avatars}
						<h1>${data.title} <a href="${editUrl}"><span class="icon icon--inline">edit</span></a></h1>
					</header>
					${meta}
					${coreData}
				</section>

				${data.hinweise?.length ? "<div class='is-tbd' style='padding-bottom: 10px; padding-top: 10px; margin-bottom: 20px;'><h2>Bitte prüfen</h2>" : ""}
				${data.hinweise?.length ? "<ul>" + data.hinweise.map(hinweis => { return "<li>"+hinweis+"</li>"}).join("") + "</ul>": ""}
				${data.hinweise?.length ? "</div>" : ""}
				
				<section class="content">
					${data.content}
				</section>

				${data.kuerzel ? curriculumTools.getChildModulListBySchwerpunkt(data, 'Wählbare Module', eleventy) : ''}
				${data.kuerzel ? curriculumTools.getChildModulList(data, 'Wählbare Module', eleventy) : ''}

				${modulkompetenzen}
			</main>
		`;
	}
}
