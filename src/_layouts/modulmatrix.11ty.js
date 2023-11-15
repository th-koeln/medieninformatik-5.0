module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data) {
    
    eleventy: this;

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
      const modul = modulItem.data;

      return `
      <tr>
                <!-- Modul -->
                <td><a href="${modulItem.url}">${modul.title}</a></td>
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
                <th>${modul.kompetenzen?.DUX.anforderungen_bedarfe ? "x" : ""}</th>
                <th>${modul.kompetenzen?.DUX.konzepte ? "x" : ""}</th>
                <th>${modul.kompetenzen?.DUX.gestaltung ? "x" : ""}</th>
              
                <th>${modul.kompetenzen?.DEV.technologie ? "x" : ""}</th>
                <th>${modul.kompetenzen?.DEV.entwurf ? "x" : ""}</th>
                <th>${modul.kompetenzen?.DEV.implementierung ? "x" : ""}</th>
              
                <th>${modul.kompetenzen?.EXA.medien ? "x" : ""}</th>
                <th>${modul.kompetenzen?.EXA.exploration_kreativitaet ? "x" : ""}</th>
                <th>${modul.kompetenzen?.EXA.prototyping ? "x" : ""}</th>
              
                <th>${modul.kompetenzen?.CREA.innovation ? "x" : ""}</th>
                <th>${modul.kompetenzen?.CREA.management ? "x" : ""}</th>
                <th>${modul.kompetenzen?.CREA.kommunikation ? "x" : ""}</th>
              
                <th>${modul.kompetenzen?.INDI.analyse_studien_experimente ? "x" : ""}</th>
                <th>${modul.kompetenzen?.INDI.situated_interaction ? "x" : ""}</th>
                <th>${modul.kompetenzen?.INDI.ethik_recht ? "x" : ""}</th>
                <th>${modul.kompetenzen?.INDI.selbstlernen ? "x" : ""}</th>

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
        return `<th>${cmpt.title}</th>\n`
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
            <tr>
              <!-- Modul -->
              <td>Modul</td>
              <td>Pflicht/Wahl</td>
              <td>ECTS</td>
              <th>Semester</td>

              <!-- Handlungsfelder -->
              <th>DUX</th>
              <th>DEV</th>
              <th>EXA</th>
              <th>CREA</th>
              <th>INDI</th>

              <!-- Zuordnung Kompetenzen -->
              ${kompetenzSpalten}

              <!-- Zuordnung Studiengangkriterien -->
              <th>Global Citizenship</th>
              <th>Internationalisierung</th>
              <th>Interdisziplinarität</th>
              <th>Transfer</th>

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
