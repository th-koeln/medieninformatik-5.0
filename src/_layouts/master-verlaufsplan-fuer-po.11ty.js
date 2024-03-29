module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data) {
    
    const eleventy = this;

    const { collection } = data;
    // const curriculumTools = require('./components/curriculumTools.11ty.js');
    moduls = data.collections[collection];


    
    
    
    function buildModulRows(modules, anforderung, extraColumn) {
      

      modulHead = [modules[0]];
      modulTail = modules.slice(1);


      // HEAD
      const rowPerModuleHead = modulHead.map((modulItem) => {
        const modul = modulItem.data;
        return `
        <tr>
          <!-- Modul -->
          <td rowspan="${modules.length}">${anforderung}</td>
          ${extraColumn ? "<th></th>": ""}
          <th class="module-name"><a href="${ modulItem.url}">${modul.title}</a></th>
          <th colspan=1>${modul.kreditpunkte}</th>
          <th colspan=1>${modul.schwerpunkt?.includes("DUX") ? "X" : ""}</th>
          <th colspan=1>${modul.schwerpunkt?.includes("DEV") ? "X" : ""}</th>
          <th colspan=1>${modul.schwerpunkt?.includes("EXA") ? "X" : ""}</th> 
        </tr>`
      });


      // HEAD
      const rowPerModuleTail = modulTail.map((modulItem) => {
        const modul = modulItem.data;
        return `
        <tr>
          <!-- Modul -->
          ${extraColumn ? "<th></th>": ""}
          <th class="module-name"}><a href="${ modulItem.url}">${modul.title}</a></th>
          <th colspan=1>${modul.kreditpunkte}</th>
          <th colspan=1>${modul.schwerpunkt?.includes("DUX") ? "X" : ""}</th>
          <th colspan=1>${modul.schwerpunkt?.includes("DEV") ? "X" : ""}</th>
          <th colspan=1>${modul.schwerpunkt?.includes("EXA") ? "X" : ""}</th> 
        </tr>
          `
      });

      return rowPerModuleHead.join("") + rowPerModuleTail.join("");
    };

    const pflichtModule = moduls.filter((m) => (m.data.kategorie?.includes("pflicht")));
    const pflichtModuleRows = buildModulRows(pflichtModule, data.anforderungen.pflichtbereich.short, true);

    const projektModule = moduls.filter((m) => (m.data.parent?.includes("GP-SP")));
    const projektModuleRows = buildModulRows(projektModule, data.anforderungen.schwerpunkt_projekte.short);

    schwerpunktModule = moduls.filter((m) => (m.data.kategorie?.includes("schwerpunkt")));
    schwerpunktModule = schwerpunktModule.filter((m) => !(m.data.parent?.includes("GP-SP"))); // Projekte entfernen
    schwerpunktModule = schwerpunktModule.filter((m) => !(m.data.kuerzel == "GP-SP")); // Hülle entfernen
    schwerpunktModule = schwerpunktModule.filter((m) => !(m.data.kuerzel?.includes("WAMO-SP"))); // Hülle WAMO-SP entfernen
    const schwerpunktModuleRows = buildModulRows(schwerpunktModule, data.anforderungen.schwerpunkt_module.short);

    const wahlModule = moduls.filter((m) => 
        (m.data.parent === "WAMO") || // alle originären Wahlmodule
        //(m.data.parent?.includes("WAMO-SP")) || // auch alle Schwerpunktmodule nochmal zulassen
        //(m.data.parent?.includes("GP-SP")) || // auch alle Schwerpunktmodule nochmal zulassen
        (m.data.kuerzel === "GP") // auch Projekte machn lassen
      );
    const wahlModuleRows = buildModulRows(wahlModule, data.anforderungen.wahlmodule.short);

    const masterthesisModul = moduls.filter((m) => (m.data.kuerzel === "MA"));
    const masterthesisModulRows = buildModulRows(masterthesisModul, data.anforderungen.masterthesis.short, true);

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
        <h2>Studienverlaufsplan</h2>
          <table class="table-curriculum is-striped is-narrow">
          <thead>
          <tr>
            <th colspan=2 rowspan=2>Anforderung</th>
            <th colspan=1 rowspan=2>Modul</th>
            <th colspan=1 rowspan=2>ECTS</th>
            <th colspan=3>Zuordnung Schwerpunkt</th>
          </tr>
          <tr>
            <th colspan=1>DUX</th>
            <th colspan=1>DEV</th>
            <th colspan=1>EXA</th>
          </tr>
          </thead>
          <tbody>

          <tr class="unit">
            <th colspan=7>${data.anforderungen.pflichtbereich.long}</th>
          </tr>
          ${pflichtModuleRows}
  
          <tr class="unit">
            <th colspan=7>${data.anforderungen.wahlbereichECTS.long}</th>
          </tr>
          <tr>
            <td rowspan="${projektModule.length + 1 + schwerpunktModule.length + 1 + wahlModule.length + 1}">${data.anforderungen.wahlbereichECTS.short}</td> 
            <th colspan=6 class="unit" style="color: #EEEEEE;">${data.anforderungen.schwerpunkt_projekte.long}</th>
          </tr>
          ${projektModuleRows}
  
          <tr class="unit">
            <th colspan=6>${data.anforderungen.schwerpunkt_module.long}</th>
          </tr>
          ${schwerpunktModuleRows}
          
          <tr class="unit">
            <th colspan=6>${data.anforderungen.wahlmodule.long}</th>
          </tr>
          ${wahlModuleRows}
          
          <tr class="unit">
            <th colspan=7>Masterthesis (${data.anforderungen.masterthesis.long})</th>
          </tr>
          ${masterthesisModulRows}
          
          </tbody> 
          </table>
        </section>


			</main>
		`;
	}
}
