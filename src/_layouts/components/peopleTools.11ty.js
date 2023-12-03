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

/* Personennamen auflösen und Avartar ausgeben
############################################################################ */

const resolvePersonAndGetAvatar = (people, modulverantwortliche, eleventy) => {

  if(!eleventy) return;
  const imagesBasePath = eleventy.getImagesBasePath('people');

  const grepPerson = (modulverantwortlich) => {
    const modulverantwortliche = modulverantwortlich.replace(/\s/g, '').split(/,/);
    
    return modulverantwortliche.map(
      (modulverantwortlich) => {
        if(!people[modulverantwortlich]) return;
        return people[modulverantwortlich].avatar;
      }
    );
  };

  const avatars = grepPerson(modulverantwortliche).map(person => {
    if(!person) return;
    return `<img src="${imagesBasePath}${person}" alt="Avatar vom Dozent:in">`;
  });

  return `
    <div class="avatars">
      ${avatars.join("")}
    </div>
  `;
  
};

exports.resolvePersonAndGetAvatar = resolvePersonAndGetAvatar;

/* Liste der Dozentinnen und Dozenten
############################################################################ */

exports.getPeopleList = (obj) => {
  const { moduls } = obj;
  const { data } = obj;
  const { eleventy } = obj;

  const isLecturer = (person, modul) => {
    if(!modul.data.dozierende || modul.data.dozierende === null) return false;
    const dozentinnen = modul.data.dozierende.replace(/\s/g, '').split(/,/);
    return dozentinnen.includes(person);
  };

  const peopleList = Object.keys(data.people).filter((person) => person !== 'eingesetzterPruefer').sort().map((person) => {

    const personModulsSummerTerm = moduls.filter((modul) => isLecturer(person, modul) && modul.data.angebotImSs === true);
    const personModulsWinterTerm = moduls.filter((modul) => isLecturer(person, modul) && modul.data.angebotImWs === true);
    
    const personModulsListWinterTerm = personModulsWinterTerm.map((modul) => {
      return `
        <li>
          <a href="${ modul.url}">${modul.data.title}</a>
        </li>
      `;
    });

    const personModulsListSummerTerm = personModulsSummerTerm.map((modul) => {
      return `
        <li>
          <a href="${ modul.url}">${modul.data.title}</a>
        </li>
      `;
    });

    const personName = data.people[person].personenseite 
      ? `<strong><a href="${data.people[person].personenseite}">${data.people[person].name}</a></strong> // ${data.people[person].id}`
      : data.people[person].name;


    // do not show people without module
    if ((personModulsListWinterTerm.length + personModulsListSummerTerm.length) == 0) return '';

    const avatars = resolvePersonAndGetAvatar(data.people, data.people[person].id, eleventy);

    return `
      <tr id="${data.people[person].id}">
        <td>${avatars}</td>
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
          <th width="10%"></th>
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








