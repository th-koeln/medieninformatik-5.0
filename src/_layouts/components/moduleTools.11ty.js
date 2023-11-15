/* Kompetenzen einfügen
############################################################################ */

exports.addCompetences = (data) => {
  const kuerzel = data.kuerzel ;
  const modulKompetenzen = data["modulkompetenzen-bachelor"];
  if(! modulKompetenzen[kuerzel]) return data;

  const modulkompetenzenWithImpact = modulKompetenzen[kuerzel].filter(item => {
    return item.braucht > 0 || item.liefert > 0;
  });

  const modulKompetenzenObject = {
    "all": modulkompetenzenWithImpact,
  };
  data.modulkompetenzen = modulKompetenzenObject;

  return data;
};


/* Prüfungsleistungen einfach
############################################################################ */

exports.resolveExamInfoSimple = (examInfo) => {

  const formatExamItem = (examInfo, type) => {
    if(!examInfo[type]) return false;
    return `${examInfo[type].art}`;
  }

  const extractExamInfo = (examInfo) => {

    const einzelleistung = examInfo['Einzelleistung']
      ? formatExamItem(examInfo, 'Einzelleistung')
      : false;

    const teamleistung = examInfo['Teamleistung']
      ? formatExamItem(examInfo, 'Teamleistung')
      : false;

    const combined = [einzelleistung, teamleistung].filter(Boolean).join(' sowie ');

    return `
      ${combined}
    `;
  };

  return extractExamInfo(examInfo);
};


/* Häufigkeit des Angebots
############################################################################ */

exports.resolveFrequency = (data) => {
  const { angebotImWs } = data;
  const { angebotImSs } = data;

  const ws = angebotImWs ? 'jedes Wintersemester' : false;
  const ss = angebotImSs ? 'jedes Sommersemester' : false;

  const combined = [ws, ss].filter(Boolean).join(' und ');

  return combined;

};

/* Verwendung des Moduls in weiteren Studiengängen
############################################################################ */

exports.studyPrograms = (studiengaenge) => {
  if(!studiengaenge) return '';

  const studiengaengeMap = {
    "mi": "Medieninformatik",
    "itm": "IT-Management",
    "wi": "Wirtschaftsinformatik",
    "i": "Informatik",
    "coco": "Code & Context"   
  };
  const studiengaengeList = studiengaenge.map(item => studiengaengeMap[item]);

  return studiengaengeList.length === 0 ? '' 
    : studiengaengeList.join(", ");

};


/* WAS WOMIT WOZU raus filtern
############################################################################ */

exports.stripWWW = (data) => {
  if(!data) return '';

  return data.replace(/\(WAS\) /g, '').replace(/\(WOMIT\) /g, '').replace(/\(WOZU\) /g, '');
};