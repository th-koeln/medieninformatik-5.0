/* Kompetenzen einfügen
############################################################################ */

const handlungsfelderMap = new Map([
  ['Designing for User Experiences','DUX'],
  ['Developing Interactive and Distributed Systems', 'DEV'],
  ['Exploring Advanced Interactive Media', 'EXA'],
  ['Driving Creation Process','CREA'],
  ['Enhancing Interactions on Different Scales', 'INDI'],
]);

const handlungsfelderMapInverted = {}

handlungsfelderMap.forEach((value, key) => {
  handlungsfelderMapInverted[value] = key;
});

const bereicheMap = new Map([
  ["Anforderungen und Bedarfe", "anforderungenBedarfe"], 
  ["Konzepte", "konzepte"],
  ["Gestaltung", "gestaltung"],
  ["Technologie", "technologie"],
  ["Entwurf", "entwurf"],
  ["Implementierung", "implementierung"],
  ["Innovation", "innovation"],
  ["Management", "management"],
  ["Kommunikation", "kommunikation"],
  ["Medien", "medien"],
  ["Exploration & Kreativität", "explorationKreativitaet"],
  ["Prototyping", "prototyping"],
  ["Analyse, Studien und Experimente", "analyseStudienExperimente"],
  ["Situated Interaction", "situatedInteraction"],
  ["Ethik und Gesellschaft", "ethikGesellschaft"],
  ["Selbstlernen", "selbstlernen"],
]);

const bereicheMapInverted = {};

bereicheMap.forEach((value, key) => {
  bereicheMapInverted[value] = key;
});

exports.handlungsfelderMap = handlungsfelderMap;
exports.handlungsfelderMapInverted = handlungsfelderMapInverted;
exports.bereicheMap = bereicheMap;
exports.bereicheMapInverted = bereicheMapInverted;

const aggregateKompetenzen = (kompetenzen) => {
  const handlungsfeldData = {};
  const handlungsfeldDataOverall = {};
  const bereichsData = {};
  const bereichsDataOutcome = {};

  kompetenzen.forEach(kompetenzData => {
    const handlungsfeld = kompetenzData["Handlungsfeld"];
    const handlungsfeldKuerzel = handlungsfelderMap.get(handlungsfeld);

    const bereich = kompetenzData["Bereich"];
    const bereichKuerzel = bereicheMap.get(bereich);

    const braucht = kompetenzData["braucht"];
    const liefert = kompetenzData["liefert"];

    // Aggregation Handlungsfelder
    if(!handlungsfeldData[handlungsfeldKuerzel]) {
      handlungsfeldData[handlungsfeldKuerzel] = {'braucht': 0, 'liefert': 0};
    }
    handlungsfeldData[handlungsfeldKuerzel]["braucht"] += braucht; 
    handlungsfeldData[handlungsfeldKuerzel]["liefert"] += liefert; 

    // Aggregation Bereich – braucht und liefert
    if(!bereichsData[bereichKuerzel]) {
      bereichsData[bereichKuerzel] = {'braucht': 0, 'liefert': 0};
    }
    bereichsData[bereichKuerzel]["braucht"] += braucht; 
    bereichsData[bereichKuerzel]["liefert"] += liefert; 

    // Aggregation Bereich – nur liefert
    if(!bereichsDataOutcome[bereichKuerzel]) {
      bereichsDataOutcome[bereichKuerzel] = {'braucht': 0, 'liefert': 0};
    }
    bereichsDataOutcome[bereichKuerzel].liefert += liefert; 
    bereichsDataOutcome[bereichKuerzel].braucht += braucht; 
    
    // Aggregation Handlungsfelder Overall: Handlungsfeld und Bereich (nur liefert)
    if(!handlungsfeldDataOverall[handlungsfeldKuerzel]) {
      handlungsfeldDataOverall[handlungsfeldKuerzel] = {};
    }
    if(!handlungsfeldDataOverall[handlungsfeldKuerzel][bereichKuerzel]) {
      handlungsfeldDataOverall[handlungsfeldKuerzel][bereichKuerzel] = {'braucht': 0, 'liefert': 0};
    }

    handlungsfeldDataOverall[handlungsfeldKuerzel][bereichKuerzel].liefert += liefert;
    handlungsfeldDataOverall[handlungsfeldKuerzel][bereichKuerzel].braucht += braucht;
        
  });

  return {
    "handlungsfelder": handlungsfeldData,
    "bereiche": bereichsData,
    "bereicheOutcome": bereichsDataOutcome,
    "handlungsfelderOverall": handlungsfeldDataOverall,
  };
};

exports.addCompetences = (data) => {
  const kuerzel = data.kuerzel ;
  const modulKompetenzen = {...data["modulkompetenzen-bachelor"], ...data["modulkompetenzen-master"]};

  if(! modulKompetenzen[kuerzel]) return data;

  const modulkompetenzenWithImpact = modulKompetenzen[kuerzel].filter(item => {
    return item.braucht > 0 || item.liefert > 0;
  });

  const modulkompetenzenWithImpactLiefert = modulKompetenzen[kuerzel].filter(item => {
    return item.liefert > 0;
  });

  const modulkompetenzenWithImpactBraucht = modulKompetenzen[kuerzel].filter(item => {
    return item.braucht > 0;
  });

  const aggregatedKompetenzen = aggregateKompetenzen(modulkompetenzenWithImpact);
  const modulKompetenzenObject = {
    "all": modulkompetenzenWithImpact,
    "liefert": modulkompetenzenWithImpactLiefert,
    "braucht": modulkompetenzenWithImpactBraucht,
    "handlungsfelderOverall": aggregatedKompetenzen["handlungsfelderOverall"],
    "handlungsfelderMap": handlungsfelderMap,
    "handlungsfelderMapInverted": handlungsfelderMapInverted,
    "bereicheMap": bereicheMap,
    "bereicheMapInverted": bereicheMapInverted,
  };
  data.kompetenzen = modulKompetenzenObject;
  
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


/* Übersetzt Sterne in Text
############################################################################ */

const starTranslations = new Map([
  [0, 'nichts'],
  [1, 'ein wenig'],
  [2, 'etwas'],
  [3, 'einiges'],
  [4, 'viel'],
  [5, 'sehr viel'],
]);

exports.translateStars = (stars) => {
  return starTranslations.get(stars);
};