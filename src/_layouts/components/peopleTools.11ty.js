/* Personennamen auflösen
############################################################################ */

exports.resolvePerson = (people, modulverantwortliche) => {

  const grepPerson = (modulverantwortlich) => {
    const modulverantwortliche = modulverantwortlich.replace(/\s/g, '').split(/,/);
    
    return modulverantwortliche.map(
      (modulverantwortlich) => {
        if(!people[modulverantwortlich]) return;
        return people[modulverantwortlich].name;
      }
    );
  };

  return grepPerson(modulverantwortliche).join(", ");
};

/* Liste der Dozentinnen und Dozenten
############################################################################ */

exports.getPeopleList = (obj) => {
  const { moduls } = obj;
  const { data } = obj;
  const { eleventy } = obj;

  const isModulverantwortlich = (person, modul) => {
    if(!modul.data.modulverantwortlich || modul.data.modulverantwortlich === null) return false;
    const modulverantwortliche = modul.data.modulverantwortlich.replace(/\s/g, '').split(/,/);
    return modulverantwortliche.includes(person);
  };

  const peopleList = Object.keys(data.people).filter((person) => person !== 'eingesetzterPruefer').sort().map((person) => {


    const personModulsSummerTerm = moduls.filter((modul) => isModulverantwortlich(person, modul) && modul.data.studiensemester % 2 === 0);
    const personModulsWinterTerm = moduls.filter((modul) => isModulverantwortlich(person, modul) && modul.data.studiensemester % 2 === 1);
    
    const personModulsListWinterTerm = personModulsWinterTerm.map((modul) => {
      return `
        <li>
          <a href="${eleventy.url(modul.url)}">${modul.data.title}</a>
        </li>
      `;
    });

    const personModulsListSummerTerm = personModulsSummerTerm.map((modul) => {
      return `
        <li>
          <a href="${eleventy.url(modul.url)}">${modul.data.title}</a>
        </li>
      `;
    });

    const personName = data.people[person].personenseite 
      ? `<a href="${data.people[person].personenseite}">${data.people[person].name}</a>`
      : data.people[person].name;

    return `
      <tr>
        <td>${data.people[person].id}</td>
        <td>${personName}</td>
        <td class="module-list">
          ${personModulsListWinterTerm.length > 0
            ? `<h3>Wintersemester</h3><ul class="is-tight">${personModulsListWinterTerm.join("\n")}</ul>`
            : ``}
          ${personModulsListSummerTerm.length > 0
            ? `<h3>Sommersemester</h3><ul class="is-tight">${personModulsListSummerTerm.join("\n")}</ul>`
            : ``}
        </td>
      </tr>
    `;
  });
  

  return `
    <table>
      <thead>
        <tr>
          <th width="10%">Kürzel</th>
          <th width="30%">Name</th>
          <th>Module</th>
        </tr>
      </thead>
      <tbody>
        ${peopleList.join("\n")}
      </tbody>
    </table>
  `;
};








