/* Liste der Module eines Studiengangs im Curriculum
############################################################################ */

exports.getCurriculumList = (obj) => {

  const moduleTools = require('../components/moduleTools.11ty');
  const peopleTools = require('../components/peopleTools.11ty');

  const { moduls } = obj;
  const { terms } = obj;
  const { data } = obj;
  const { eleventy } = obj;

  let cps = 0;

  const keyStudiensemester = data.variant ? `studiensemester${data.variant}` : 'studiensemester';

  const listByTerm = terms.map((term) => {

    const termModuls = moduls.filter((modul) => modul.data[keyStudiensemester] === term || modul.data.studiensemester === term);
    let cpsPerTerm = 0;

    const termModulsList = termModuls.map((modul) => {
      
      if(modul.data[keyStudiensemester] && modul.data[keyStudiensemester] !== term) return '';
      const examInfo = modul.data.studienleistungen === null
        ? ''
        : `<p class="module-exam is-small">${moduleTools.resolveExamInfoSimple(modul.data.studienleistungen)}</p>`;
      const modulverantwortlich = modul.data.modulverantwortlich 
			  ? peopleTools.resolvePerson(data.people, modul.data.modulverantwortlich)
        : '';

      cps += parseInt(modul.data.kreditpunkte);
      cpsPerTerm += parseInt(modul.data.kreditpunkte);

      return `
        <tr>
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
        <th colspan="4">${term}. Fachsemester </th>
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
        ${listByTerm.join("\n")}
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

exports.getCurriculumTable = (obj) => {

  const { moduls } = obj;
  const { terms } = obj;
  const { groups } = obj;
  const { maxCPS } = obj;
  const { eleventy } = obj;

  const modulsForGroup = (group) =>  {
    let cps = 0;
    const termModuls = moduls.filter((modul) => modul.data.kategorie == group.toLowerCase());
    const termModulsSortedByTerm = termModuls.sort((a, b) => {
      if (a.data.studiensemester > b.data.studiensemester) return 1;
      else if (a.data.studiensemester < b.data.studiensemester) return -1;
      else return 0;
    });
    const termModulsList = termModulsSortedByTerm.map((modul) => { 

      const pvl = modul.data.pvl === true ? "TN" : "-";
      cps += parseInt(modul.data.kreditpunkte);

      return `
        <tr>
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
          ${terms.map((term) => `<td class="is-fs-${term}">30</td>`).join("\n")}
        </tr>
  </tfoot>
</table>
  `;
};

/* Liste ALLER Module eines Studiengangs
############################################################################ */

exports.getAllModuls = (obj) => {

  const { moduls } = obj;
  const { eleventy } = obj;

  const modulList = moduls.map((modul) => {
    return `
      <li>
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

/* Liste aller Kind Module eines Moduls
############################################################################ */

exports.getChildModulList = (data, headlineChilds) => {

  const childModuls = data.collections.allModuls.filter((modul) => modul.data.parent === data.kuerzel);
  const {schwerpunkte} = data.collections;

  const resolveSchwerpunkt = (id) => {
    if(!id) return ''; 
    
    const schwerpunkt = schwerpunkte.find((schwerpunkt) => schwerpunkt.data.kuerzel === id);
    if(!schwerpunkt) return '';

    const schwerpunktUrl = schwerpunkt.url;
    return `, <span class="tag is-schwerpunkt">Schwerpunkt <a href="${schwerpunktUrl}">«${schwerpunkt.data.title}»</a></span>`;
  };

  const childModulsList = childModuls.map((modul) => {
    return `
      <li>
        <a href="${modul.url}">${modul.data.title}</a>${resolveSchwerpunkt(modul.data.schwerpunkt)}
      </li>
    `;
  });
  
  return `
    <section class="module-childs">
      <h2>${headlineChilds}</h2>
      <ul>
        ${childModulsList.join("\n")}
      </ul>
    </section>
  `;
};