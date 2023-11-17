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
      
      const modul = moduleTools.addCompetences(modulItem.data);
      const check = '<span class="icon is-checked">check</span>';

      return `
        <tr>
          <!-- Modul -->
          <th class="module-name"><a href="${modulItem.url}">${modul.title}</a></th>
          <td>todo</td>
          <td>${modul.kreditpunkte}</td>
          <td>${(modul.angebotImWs && modul.angebotImSs) ? "immer" : ""}${(modul.angebotImWs && !modul.angebotImSs) ? "WiSe" : ""}${(!modul.angebotImWs && modul.angebotImSs) ? "SoSe" : ""}</td>
          
          <!-- Prüfungen -->
          <td>${modul.studienleistungen?.Einzelleistung ? "1" : "?"}</td>

          <!-- Handlungsfelder -->
          <td>${modul.handlungsfelder?.DUX ? "DUX" : ""}</td>
          <td>${modul.handlungsfelder?.DEV ? "DEV" : ""}</td>
          <td>${modul.handlungsfelder?.EXA ? "EXA" : ""}</td>
          <td>${modul.handlungsfelder?.CREA ? "CREA" : ""}</td>
          <td>${modul.handlungsfelder?.INDI ? "INDI" : ""}</td>
          
          <!-- Zuordnung Kompetenzen -->
          <td>${modul.kompetenzen?.handlungsfelderOverall?.DUX?.anforderungenBedarfe ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall?.DUX?.konzepte ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall?.DUX?.gestaltung ? check : ""}</td>
        
          <td>${modul.kompetenzen?.handlungsfelderOverall.DEV?.technologie ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.DEV?.entwurf ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.DEV?.implementierung ? check : ""}</td>
        
          <td>${modul.kompetenzen?.handlungsfelderOverall.EXA?.medien ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.EXA?.explorationKreativitaet ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.EXA?.prototyping ? check : ""}</td>
        
          <td>${modul.kompetenzen?.handlungsfelderOverall.CREA?.innovation ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.CREA?.management ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.CREA?.kommunikation ? check : ""}</td>
        
          <td>${modul.kompetenzen?.handlungsfelderOverall.INDI?.analyseStudienExperimente ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.INDI?.situatedInteraction ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.INDI?.ethikRecht ? check : ""}</td>
          <td>${modul.kompetenzen?.handlungsfelderOverall.INDI?.selbstlernen ? check : ""}</td>

          <!-- Zuordnung Studiengangkriterien -->
          <td>${modul.studiengangkriterien?.globalcitizenship ? check : ""}</td>
          <td>${modul.studiengangkriterien?.internationalisierung ? check : ""}</td>
          <td>${modul.studiengangkriterien?.interdisziplinaritaet ? check : ""}</td>
          <td>${modul.studiengangkriterien?.transfer ? check : ""}</td>

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

        <section>
          <table class="table-modulmatrix is-narrow">
          <thead>
            <tr>
              <th colspan=5>Modul</th>
              <th colspan=5>Handlungsfelder</th>
              <th colspan=16>Zuordnung Kompetenzen</th>
              <th colspan=4>Zuordnung Studiengangkriterien</th>
            </tr>
            <tr>
              <!-- Modul -->
              <th class="module-name"></th>
              <th class="is-vertical"><div><span>Pflicht/Wahl</span></div></th>
              <th class="is-vertical"><div><span>ECTS</span></div></th>
              <th class="is-vertical"><div><span>Semester</span></div></th>
              <th class="is-vertical"><div><span>Prüfungen</span></div></th>

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
