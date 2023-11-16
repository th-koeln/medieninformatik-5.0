module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data ) {
    
    eleventy: this;

    const moduleTools = require('./components/moduleTools.11ty');

    const { collection } = data;
    // const curriculumTools = require('./components/curriculumTools.11ty.js');
    moduls = data.collections[collection];

    handlungsfelder = data.collections.handlungsfelder;
    // const curriculumList = curriculumTools.getCurriculumList({
    //   moduls: data.collections[collection],
    //   terms: data.terms,
    //   maxCPS: data.maxCPS,
    //   studienverlauf: data.studienverlauf,
    //   data,
    //   eleventy: this
    // });

    // const curriculumVerlaufTable = curriculumTools.getCurriculumVerlaufsplanTable({
    //   moduls: data.collections[collection],
    //   terms: data.terms,
    //   groups: data.groups,
    //   maxCPS: data.maxCPS,
    //   studienverlauf: data.studienverlauf,
    //   data,
    //   eleventy: this
    // });

    // const allModuls = curriculumTools.getAllModuls({
    //   moduls: data.collections[collection],
    //   data,
    //   eleventy: this
    // });

    // const curriculumVerlaufList = data.showModuleList && data.showModuleList === true
    //   ? `<section>${curriculumList}</section>` : '';


    const modulRows = moduls.map((modulItem) => {
      
      // modulItem.data = moduleTools.addCompetences(modulItem.data);
      const modul = moduleTools.addCompetences(modulItem.data);
      

      return `
        <tr>
          <!-- Modul -->
          <th><a href="${modulItem.url}">${modul.title}</a></th>
          <td>todo</td>
          <td>${modul.kreditpunkte}</td>
          <th>${(modul.angebotImWs && modul.angebotImSs) ? "immer" : ""}${(modul.angebotImWs && !modul.angebotImSs) ? "WiSe" : ""}${(!modul.angebotImWs && modul.angebotImSs) ? "SoSe" : ""}</th>
          <!-- Handlungsfelder -->
          <th>${modul.handlungsfelder?.DUX ? "DUX" : ""}</th>
          <th>${modul.handlungsfelder?.DEV ? "DEV" : ""}</th>
          <th>${modul.handlungsfelder?.EXA ? "EXA" : ""}</th>
          <th>${modul.handlungsfelder?.CREA ? "CREA" : ""}</th>
          <th>${modul.handlungsfelder?.INDI ? "INDI" : ""}</th>
          <!-- Zuordnung Kompetenzen -->
          <th>${modul.kompetenzen?.handlungsfelderOverall?.DUX?.anforderungenBedarfe ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall?.DUX?.konzepte ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall?.DUX?.gestaltung ? "x" : ""}</th>
        
          <th>${modul.kompetenzen?.handlungsfelderOverall.DEV?.technologie ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.DEV?.entwurf ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.DEV?.implementierung ? "x" : ""}</th>
        
          <th>${modul.kompetenzen?.handlungsfelderOverall.EXA?.medien ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.EXA?.explorationKreativitaet ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.EXA?.prototyping ? "x" : ""}</th>
        
          <th>${modul.kompetenzen?.handlungsfelderOverall.CREA?.innovation ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.CREA?.management ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.CREA?.kommunikation ? "x" : ""}</th>
        
          <th>${modul.kompetenzen?.handlungsfelderOverall.INDI?.analyseStudienExperimente ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.INDI?.situatedInteraction ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.INDI?.ethikRecht ? "x" : ""}</th>
          <th>${modul.kompetenzen?.handlungsfelderOverall.INDI?.selbstlernen ? "x" : ""}</th>
          <!-- Zuordnung Studiengangkriterien -->
          <th>${modul.studiengangkriterien?.globalcitizenship ? "x" : ""}</th>
          <th>${modul.studiengangkriterien?.internationalisierung ? "x" : ""}</th>
          <th>${modul.studiengangkriterien?.interdisziplinaritaet ? "x" : ""}</th>
          <th>${modul.studiengangkriterien?.transfer ? "x" : ""}</th>
          <!-- Prüfungen -->
          <th>${modul.studienleistungen?.Einzelleistung ? "1" : "?"}</th>
        </tr>
        `

    }).join("");



    kompetenzSpalten = handlungsfelder.map(hf => {
      return hf.data.competencies.map( cmpt => {
        return `<th class="is-vertical"><div><span>${cmpt.title}</span></div></th>\n`
      }).join("");
    }).join("");

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

        <section class="has-seperator">
        <h2>Modulmatrix</h2>
          <table class="table-curriculum is-striped is-narrow">
          <thead>
            <tr>
              <th colspan=4>Modul</th>
              <th colspan=5>Handlungsfelder</th>
              <th colspan=16>Zuordnung Kompetenzen</th>
              <th colspan=4>Zuordnung Studiengangkriterien</th>
              <th rowspan=2>Prüfungen</th>
            </tr>
            <tr class="is-sticky-row">
              <!-- Modul -->
              <td>Modul</td>
              <th class="is-vertical"><div><span>Pflicht/Wahl</span></div></th>
              <th class="is-vertical"><div><span>ECTS</span></div></th>
              <th class="is-vertical"><div><span>Semester</span></div></th>

              <!-- Handlungsfelder -->
              <th class="is-vertical"><div><span>DUX</span></div></th>
              <th class="is-vertical"><div><span>DEV</span></div></th>
              <th class="is-vertical"><div><span>EXA</span></div></th>
              <th class="is-vertical"><div><span>CREA</span></div></th>
              <th class="is-vertical"><div><span>INDI</span></div></th>

              <!-- Zuordnung Kompetenzen -->
              ${kompetenzSpalten}

              <!-- Zuordnung Studiengangkriterien -->
              <th class="is-vertical"><div><span>Global Citizenship</span></div></th>
              <th class="is-vertical"><div><span>Internationalisierung</span></div></th>
              <th class="is-vertical"><div><span>Interdisziplinarität</span></div></th>
              <th class="is-vertical"><div><span>Transfer</span></div></th>

            </tr>
            </thead>
            <tbody>
              ${modulRows}
            </tbody> 

          </table>
        </section>


			</main>
		`;
	}
}
