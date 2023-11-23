const moduleTools = require('../components/moduleTools.11ty');
const peopleTools = require('../components/peopleTools.11ty');

const getChildModulList = (data) => {
  return  data.collections.allModuls.filter((modul) => {
    if(modul.data.parent === null || modul.data.parent === undefined) return false;
    const parents = modul.data.parent.replace(/ /g, '').split(',');
    return parents.find((parent) => parent === data.kuerzel);
  });

};


/* Liste der Module eines Studiengangs im Curriculum
############################################################################ */

exports.getCurriculumList = (obj) => {



  const { moduls } = obj;
  const { data } = obj;
  const { eleventy } = obj;
  const { studienverlauf } = obj;

  if(!studienverlauf) return '';
  let cps = 0;

  const listByTermViaVerlauf = studienverlauf.map((row) => {

    const termModuls = row.semester.module.map((kuerzel) => {
      const modul = moduls.filter((modul) => modul.data.kuerzel === kuerzel)[0];
      if(!modul) return null;
      return modul;
    });


    let cpsPerTerm = 0;
    
    const termModulsList = termModuls.map((modul) => {
      const examInfo = modul.data.studienleistungen === null
        ? ''
        : `<p class="module-exam is-small">${moduleTools.resolveExamInfoSimple(modul.data.studienleistungen)}</p>`;
      
      const modulverantwortlich = modul.data.modulverantwortlich 
        ? peopleTools.resolvePerson(data.people, modul.data.modulverantwortlich)
        : '';
  
      cps += parseInt(modul.data.kreditpunkte);
      cpsPerTerm += parseInt(modul.data.kreditpunkte);
      const status = modul.data.meta && modul.data.meta.status ? `is-${modul.data.meta.status}` : '';
      
      return `
        <tr class="${status}">
          <td>
            <h3 class="module-title"><a href="${eleventy.url(modul.url)}">${modul.data.title}</a></h3>
            ${examInfo}
          </td>
          <td class="no-wrap">${modul.data.kuerzel}</td>
          <td>${modul.data.kreditpunkte}</td>
          <td>${modulverantwortlich}</td>
        </tr>
      `;
    });

    return `
      <tr class="next-term">
        <th colspan="4">${row.semester.fachsemester}. Fachsemester </th>
      </tr>
      ${termModulsList.join("\n")}
      <tr>
        <td colspan="2"><br><br></td>
        <td colspan="3">${cpsPerTerm}</td>
      </tr>
    `;

  });

  return `
    <table class="table-module-list">
      <thead>
        <tr>
          <th width="50%">Modulname</th>
          <th>Kürzel</th>
          <th>CP</th>
          <th>Modulverantwortlich</th>
        </tr>
      </thead>

      <tbody>
        ${listByTermViaVerlauf.join("\n")}
        <tr>
          <td colspan="2">Summe CP insgesamt<br><br></td>
          <td colspan="3">${cps}</td>
        </tr>
      </tbody>
    </table>
  `;
};

/* Tabelle der Module eines Studiengangs
############################################################################ */

const getCurriculumTable = (obj) => {

  const { moduls } = obj;
  const { groups } = obj;
  const { maxCPS } = obj;
  const { eleventy } = obj;
  const { terms } = obj;

  
  const totalCPS = {};
  
  const modulsForGroup = (group) =>  {
    let cps = 0;
    const termModuls = moduls.filter((modul) => modul.data.kategorie == group.toLowerCase());
    const termModulsSortedByTerm = termModuls.sort((a, b) => {
      if (a.data.studiensemester > b.data.studiensemester) return 1;
      else if (a.data.studiensemester < b.data.studiensemester) return -1;
      else return 0;
    });

    const termModulsList = termModulsSortedByTerm.map((modul) => { 

      const status = modul.data.meta && modul.data.meta.status ? `is-${modul.data.meta.status}` : '';
      const pvl = modul.data.pvl === true ? "TN" : "-";
      cps += parseInt(modul.data.kreditpunkte);
      totalCPS[modul.data.studiensemester] = totalCPS[modul.data.studiensemester] 
        ? totalCPS[modul.data.studiensemester] + parseInt(modul.data.kreditpunkte) 
        : parseInt(modul.data.kreditpunkte);
      return `
        <tr class="${status}">
          <th><a href="${eleventy.url(modul.url)}">${modul.data.title}</a></th>
          <td>${pvl}</td>
          <td>${modul.data.kreditpunkte}</td>
          ${terms.map((term) => {
            return term === parseInt(modul.data.studiensemester)
              ? `<td class="is-fs-${term}">${modul.data.kreditpunkte}</td>`
              : `<td class="is-fs-${term}"></td>`;
          }).join("\n")}
        </tr>
      `;
    });

    const groupHeader =  `
        <tr class="unit">
          <th colspan="2">${group}</th>
          <td>${cps}</td>
          ${terms.map((term) => `<td class="is-fs-${term}"></td>`).join("\n")}
        </tr>
      `;

      return `
        ${groupHeader}
        ${termModulsList.join("\n")}
      `;
  };

  const listByGroup = groups.map((group) => { 
    return modulsForGroup(group);
  });

  const termsData = terms.map(term => {
    const displayedTerm = term === 0 ? `0${term}` : term;
    return `<td class="is-fs-${term}">${displayedTerm}</td>`;
  });

  const colspan = terms.length;

  return `
    <table class="table-curriculum is-striped is-narrow">
      <thead>
        <tr>
          <th colspan="3">Studienabschnitte</th>
          <th colspan="${colspan}">Leistungspunkte und Semesterzuordnung</th>
        </tr>
        <tr>
          <th>Module</th>
          <th class="is-centered" title="Prüfungsvorleistung erforderlich">PV</th>
          <td title="Summe CP">CP</td>
          ${termsData.join("\n")}
        </tr>
      </thead>

      <tbody>
        ${listByGroup.join("\n")}
      </tbody>

      <tfoot>
        <tr>
          <th colspan="2">Summe Leistungspunkte</th>
          <td>${maxCPS}</td>
          ${terms.map((term) => `<td class="is-fs-${term}">${totalCPS[term]}</td>`).join("\n")}
        </tr>
  </tfoot>
</table>
  `;
};



/* Tabelle der Module eines Studiengangs gebaut nach einem Verlaufsplan
############################################################################ */

exports.getCurriculumVerlaufsplanTable = (obj) => {
  const { studienverlauf } = obj;
  
  const moduleImVerlauf = [];

  istECTS = 0;

  if (!obj.data.hinweise) obj.data.hinweise = [];

  // gehe durch den Studienverlauf und hole die Module raus, die im Verlauf stehen
  // passe dabei jeweils das Fachsemester dynamisch an
  for (sc in studienverlauf) {
  
    const row = studienverlauf[sc];
    //row.semester.module.forEach(m => {
    for (mc in row.semester.module) {
      const kuerzel = row.semester.module[mc];
      const modulFromCollection = obj.moduls.filter((modul) => modul.data.kuerzel === kuerzel)[0];

      if (modulFromCollection === undefined) continue;

      // deep copy does not work due to circularity of structure
      // hence we semi deep copy the object
      let modulClone = Object.assign({}, modulFromCollection);
      modulClone.data = Object.assign({}, modulFromCollection.data);
      modulClone.data.studiensemester = parseInt(row.semester.fachsemester);

      if (row.semester.season === "wise" && !modulClone.data.angebotImWs) obj.data.hinweise.push("Modul "+modulClone.data.kuerzel+" (platziert im "+row.semester.fachsemester+". Semester) wird nicht im WiSe angeboten");
      if (row.semester.season === "sose" && !modulClone.data.angebotImSs) obj.data.hinweise.push("Modul "+modulClone.data.kuerzel+" (platziert im "+row.semester.fachsemester+". Semester) wird nicht im SoSe angeboten");

        
      if (row.semester?.creditsplits) {
        if (row.semester?.creditsplits[kuerzel]) {
          modulClone.data.kreditpunkte = row.semester.creditsplits[kuerzel];
          modulClone.data.title = modulClone.data.title + " (gesplittet)";
        }
      }
      
      istECTS += modulClone.data.kreditpunkte;

      moduleImVerlauf.push(modulClone);
      
    };
  };

  if (istECTS < obj.data.maxCPS) obj.data.hinweise.push("ECTS nicht erreicht (ist: "+istECTS+", soll: "+obj.data.maxCPS+")");
  if (istECTS > obj.data.maxCPS) obj.data.hinweise.push("ECTS überschritten (ist: "+istECTS+", soll: "+obj.data.maxCPS+")");

  obj.moduls = moduleImVerlauf;
  return getCurriculumTable(obj);

};

/* Liste ALLER Module eines Studiengangs
############################################################################ */

exports.getAllModuls = (obj) => {

  const { moduls } = obj;
  const { eleventy } = obj;
  
  const modulList = moduls.map((modul) => {

    const status = modul.data.meta && modul.data.meta.status ? `<span class="is-${modul.data.meta.status}"></span>` : '';

    return `
      <li>${status}
        <a href="${eleventy.url(modul.url)}">${modul.data.title}</a>
      </li>
    `;
  });

  return `
    <ul>
      ${modulList.join("\n")}
    </ul>
  `;
};


exports.getAllModulsMaster = (obj) => {

  const { moduls } = obj;
  const { eleventy } = obj;

  const modulList = moduls.map((modul) => {

    const status = modul.data.meta && modul.data.meta.status ? `<span class="is-${modul.data.meta.status}"></span>` : '';

    function createEmptyString(value) {
      if (value == null) return '';
      return value;
    }

    isDEV = createEmptyString(modul.data.schwerpunkt).includes("DEV") ? "x" : ""; 
    isDUX = createEmptyString(modul.data.schwerpunkt).includes("DUX") ? "x" : "";
    isEXA = createEmptyString(modul.data.schwerpunkt).includes("EXA") ? "x" : "";

    return `
    <tr>
      <td>${status}&nbsp;<a href="${eleventy.url(modul.url)}">${modul.data.title} </a></td>
      <td>Semester</td>
      <td>${modul.data.modulverantwortlich}</td>
      <td>${isDUX}</td>
      <td>${isDEV}</td>
      <td>${isEXA}</td>
    </tr> 
    `;
  });

  return `
  <table>
    <tr>
      <th>Modul</th>
      <th>Semester</th>
      <th>Dozent*in</th>
      <th>DUX</th>
      <th>DEV</th>
      <th>EXA</th>
    </tr>
      ${modulList.join("\n")}
  </table>
  `;
};


/* Liste aller Kind Module eines Moduls
############################################################################ */

exports.getChildModulList = (data, headlineChilds, eleventy) => {

  if ((data.kuerzel === 'SWPM') || (data.hideSchwerpunktloseChildren === true)) return '';

  const childModuls = getChildModulList(data);
  const {schwerpunkte} = data.collections;

  const resolveSchwerpunkt = (id) => {
    if(!id) return ''; 
    
    const schwerpunkt = schwerpunkte.find((schwerpunkt) => schwerpunkt.data.kuerzel === id);
    if(!schwerpunkt) return '';

    const schwerpunktUrl = schwerpunkt.url;
    return `, <span class="is-small is-schwerpunkt">Schwerpunkt <a href="${schwerpunktUrl}">«${schwerpunkt.data.title}»</a></span>`;
  };

  const childModulsList = childModuls.map((modul) => {
    return `
      <li>
        <a href="${eleventy.url(modul.url)}">${modul.data.title}</a>${resolveSchwerpunkt(modul.data.schwerpunkt)}
      </li>
    `;
  });
  
  return childModulsList.length === 0 ? '' : `
    <section class="module-childs">
      <h2>${headlineChilds}</h2>
      <ul>
        ${childModulsList.join("\n")}
      </ul>
    </section>
  `;
};



/* Check, ob ein Modul in einem bestimmten Schwerpunkt ist
############################################################################ */

isModulInSchwerpunkt = exports.isModulInSchwerpunkt = (modul, schwerpunkt) => {
  const modulSchwerpunkteKuerzel = modul.data.schwerpunkt ? modul.data.schwerpunkt : "";
  const schwerpunktKuerzel = schwerpunkt.data.kuerzel ? schwerpunkt.data.kuerzel : "";

  return modulSchwerpunkteKuerzel.includes(schwerpunktKuerzel);
}


/* Liste aller Kind Module eines Moduls nach Schwerpunkt
############################################################################ */

exports.getChildModulListBySchwerpunkt = (data, headlineChilds, eleventy) => {

  if ((data.kuerzel === 'WPM') || (data.hideSchwerpunktChildren === true)) return '';
  if(!eleventy) return '';

  const childModuls = getChildModulList(data);
  const {schwerpunkte} = data.collections;
  
  const schwerpunkteList = schwerpunkte.map((schwerpunkt) => {

    const childModulsList = childModuls.filter((modul) => isModulInSchwerpunkt(modul, schwerpunkt)).map((modul) => {

      return `
        <li>
          <a href="${eleventy.url(modul.url)}">${modul.data.title}</a>
        </li>
      `;
    });

    return childModulsList.length === 0 ? null :`
        <h3>Schwerpunkt «${schwerpunkt.data.title}»</h3>
        <ul>
          ${childModulsList.join("\n")}
        </ul>
    `;
  });

  const schwerpunkteListFiltered = schwerpunkteList.filter((schwerpunkt) => schwerpunkt !== null);

  return schwerpunkteListFiltered.length === 0 ? '' : `
    <section class="module-childs">
      <h2>${headlineChilds}</h2>
      <ul>
        ${schwerpunkteListFiltered.join("\n")}
      </ul>
    </section>
  `;
};


/* Modulmatrix für einen Studiengang
############################################################################ */

exports.getModulMatrix = (obj) => {

  const { moduls } = obj;
  const studyProgramme = obj.studyProgramme ? obj.studyProgramme : 'master';
  const { handlungsfelder } = obj;
  const { eleventy } = obj;

  const impactGate = 0; // Soviel muss ein Modul liefern, damit es als "check" gilt
  const impactGateHandlungsfeld = 10; // Soviel muss ein Handlungsfeld liefern, damit es als "check" gilt

  const modulRows = moduls.map((modulItem) => {
      
    const modul = moduleTools.addCompetences(modulItem.data);
    const check = '<span class="icon is-checked">check</span>';

    const checkImpact = ( value ) => {
      if(!value) return "";
      if(!value.liefert) return "";
      return value.liefert > impactGate ? check : "";
    };

    const checkImpactHandlungsfeld = ( handlungsfeld ) => {

      if(studyProgramme === 'master') { return modul.handlungsfelder?.DUX ? "DUX" : ""; }
      if(!modul.kompetenzen?.handlungsfelderOverall) return "";

      const kompetenzenImHandlungsfeld = modul.kompetenzen.handlungsfelderOverall[handlungsfeld];
      if(!kompetenzenImHandlungsfeld) return "";
      
      const summeImactKompetenzenImHandlungsfeld = Object.entries(kompetenzenImHandlungsfeld).reduce((accumulator, kompetenzBereich) => {
        const scoreBereich = kompetenzBereich.reduce((accumulator, currentValue) => { 
            const value = currentValue.liefert ? currentValue.liefert : 0;
            return accumulator + value;
          }, 0
        );
        return accumulator + scoreBereich;
      }, 0);
      
      return summeImactKompetenzenImHandlungsfeld > impactGateHandlungsfeld ? handlungsfeld : "";

    };

    return `
      <tr>
        <!-- Modul -->
        <th class="module-name"><a href="${eleventy.url(modulItem.url)}">${modul.title}</a></th>
        <td>${modul.typ === 'pm' ? check : ''}</td>
        <td>${modul.kreditpunkte}</td>
        <td>${(modul.angebotImWs && modul.angebotImSs) ? "immer" : ""}${(modul.angebotImWs && !modul.angebotImSs) ? "WiSe" : ""}${(!modul.angebotImWs && modul.angebotImSs) ? "SoSe" : ""}</td>
        
        <!-- Prüfungen -->
        <td>${modul.studienleistungen?.Einzelleistung ? "1" : "?"}</td>
  
        <!-- Handlungsfelder -->
        <td>${checkImpactHandlungsfeld('DUX')}</td>
        <td>${checkImpactHandlungsfeld('DEV')}</td>
        <td>${checkImpactHandlungsfeld('EXA')}</td>
        <td>${checkImpactHandlungsfeld('CREA')}</td>
        <td>${checkImpactHandlungsfeld('INDI')}</td>
        
        <!-- Zuordnung Kompetenzen -->
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall?.DUX?.anforderungenBedarfe)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall?.DUX?.konzepte)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall?.DUX?.gestaltung)}</td>
      
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.DEV?.technologie)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.DEV?.entwurf)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.DEV?.implementierung)}</td>
      
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.EXA?.medien)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.EXA?.explorationKreativitaet)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.EXA?.prototyping)}</td>
      
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.CREA?.innovation)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.CREA?.management)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.CREA?.kommunikation)}</td>
      
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.INDI?.analyseStudienExperimente)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.INDI?.situatedInteraction)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.INDI?.ethikGesellschaft)}</td>
        <td>${checkImpact(modul.kompetenzen?.handlungsfelderOverall.INDI?.selbstlernen)}</td>
  
        <!-- Zuordnung Studiengangkriterien -->
        <td>${checkImpact(modul.studiengangkriterien?.globalcitizenship)}</td>
        <td>${checkImpact(modul.studiengangkriterien?.internationalisierung)}</td>
        <td>${checkImpact(modul.studiengangkriterien?.interdisziplinaritaet)}</td>
        <td>${checkImpact(modul.studiengangkriterien?.transfer)}</td>
  
      </tr>
      `
  }).join("");
  
  const kompetenzSpalten = handlungsfelder.map(hf => {
    return hf.data.competencies.map( cmpt => {
      return `<th class="is-vertical"><div><span>${cmpt.title}</span></div></th>\n`
    }).join("");
  }).join("");
  
  return `
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
          <th class="is-vertical"><div><span>Pflicht</span></div></th>
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
  `;
};
