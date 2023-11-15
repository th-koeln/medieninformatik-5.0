const fs = require('fs');

const pathes = {
  "master": {
    "src": "./kompetenzen/csv-exports-from-numbers/kompetenzen-in-modulen-mi5.0-bachelor/",
    "dist": "./src/modulkompetenzen-master/"
  },
  "bachelor": {
    "src": "./kompetenzen/csv-exports-from-numbers/kompetenzen-in-modulen-mi5.0-bachelor/",
    "dist": "./src/modulkompetenzen-bachelor/"
  }
};
const seperatorRows = "\r\n";
const seperatorCols = ";";

/* Functions
############################################################################ */

const parseFile = (path) => {
  const content = fs.readFileSync(path,
    { encoding: 'utf8', flag: 'r' });
  
  let level1 = false;
  let level2 = false;
  
  const rows = content.split(seperatorRows).filter(line => line.match(/[a-z]/));
  const contentAsJSON = rows.map(line => {
   
    const cols = line.split(seperatorCols);
    level1 = cols[0] ? cols[0] : level1;
    level2 = cols[1] ? cols[1] : level2;

    const dataset = {
      "Handlungsfeld": level1,
      "Bereich": level2,
      "Kompetenz": cols[2],
      "braucht": Number(cols[3]),
      "liefert": Number(cols[4]),
      "Kommentar": cols[5],
    };

    // if(dataset["braucht"] === 0 && dataset["liefert"] === 0) return;
    // if(dataset["braucht"] === null && dataset["liefert"] === null) return;
    
    return dataset;
  });
  
  const contentAsJSONwithoutNoise = contentAsJSON.filter(line => {
    return line !== undefined;
  });

  return contentAsJSONwithoutNoise;
};

const putFile = (path, content) => {
  fs.writeFile(path, content, (err) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log(`File written successfully: ${path}`); 
    } 
  }); 
};

const createTargetFilename = (path) => {
  return path.replace(/.*\-/, "").replace(/\.csv/, ".json");
};

const getFiles = (studyProgramme) => {
  const pathesForStudyProgramme = pathes[studyProgramme];
  const { src, dist } = pathesForStudyProgramme;
  
  const files = fs.readdirSync(src);
  const content = files.map(path => {
    const contentAsJSON = parseFile(src + path);
    const targetFilename = createTargetFilename(path);
    putFile(dist + targetFilename, JSON.stringify(contentAsJSON));
  });
  
};

/* Main
############################################################################ */

getFiles("bachelor");
getFiles("master");

 