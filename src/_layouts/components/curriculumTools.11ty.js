
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

  const moduleTools = require('../components/moduleTools.11ty');
  const peopleTools = require('../components/peopleTools.11ty');

  const { moduls } = obj;
  const { data } = obj;
  const { eleventy } = obj;
  const { studienverlauf } = obj;

  if(!studienverlauf) return '';
  let cps = 0;

  const keyStudiensemester = data.variant ? `studiensemester${data.variant}` : 'studiensemester';
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

  return `
    <table class="table-curriculum is-striped is-narrow">
      <thead>
        <tr>
          <th colspan="2">Studienabschnitte</th>
          <th colspan="8">Leistungspunkte und Semesterzuordnung</th>
        </tr>
        <tr>
          <th>Module</th>
          <th title="Prüfungsvorleistung erforderlich">PV</th>
          <td title="Summe CP">CP</td>
          ${terms.map((term) => `<td class="is-fs-${term}">0${term}</td>`).join("\n")}
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

      //obj.data.hinweise.push("Modul "+modulClone.kuerzel+" wird nicht im WiSe angeboten");

      if (row.semester.season === "wise" && !modulClone.data.angebotImWs) obj.data.hinweise.push("Modul "+modulClone.data.kuerzel+" (platziert im "+row.semester.fachsemester+". Semester) wird nicht im WiSe angeboten");
      if (row.semester.season === "sose" && !modulClone.data.angebotImSs) obj.data.hinweise.push("Modul "+modulClone.data.kuerzel+" (platziert im "+row.semester.fachsemester+". Semester) wird nicht im SoSe angeboten");

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
  const { data } = obj;
  
  const peopleTools = require('../components/peopleTools.11ty');
  const modulList = moduls.map((modul) => {

    const status = modul.data.meta && modul.data.meta.status ? `<span class="is-${modul.data.meta.status}"></span>` : '';
    const schwerpunkt = modul.data.schwerpunkt ? ` (${modul.data.schwerpunkt})` : ''; 
    const modulverantwortlich = modul.data.modulverantwortlich 
      ? `, ${peopleTools.resolvePerson(data.people, modul.data.modulverantwortlich)}`
      : '';

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