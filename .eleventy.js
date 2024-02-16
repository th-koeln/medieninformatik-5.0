const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");
const yaml = require("js-yaml");
const fg = require('fast-glob');

const shortcodeModuls = {
  "images": require('./src/_layouts/shortcodes/images.11ty.js'),
};


const pathPrefix = (process.env.ELEVENTY_ENV === 'production') ? "/medieninformatik-5.0" : "";
const pathes = {
  "competences": {
    "bachelor": "./src/modulkompetenzen-bachelor/",
    "master": "./src/modulkompetenzen-master/",
  },
  "images":{
    "people": "images/people",
  },
  "competencesToModuleMap": {
    "bachelor": "medieninformatik-bachelor/kompetenzen-der-module-bpo5",
    "master": "medieninformatik-master/kompetenzen-der-module-mpo5",
  },
};

const md = new markdownIt({
  html: true,
});

const allImages = fg.sync(['src/images/**/*', '!**/_site']);

const clearRequireCache = () => {
  Object.keys(require.cache).forEach(function (key) {
    if (require.cache[key].filename.match(/11ty\.js/)) {
      delete require.cache[key];
    }
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setWatchThrottleWaitTime(100);
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setWatchJavaScriptDependencies(true);
  eleventyConfig.setBrowserSyncConfig({
    snippet: true,
    https: true
  });

  eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
    return (data) => {
      // Always skip during non-watch/serve builds
      if (data.type === 'arf-data') {
        console.log("skipping draft");
        return false;
      }
      return data.permalink;
    }
  });

  eleventyConfig.setServerOptions({
    // Default values are shown:

    // Whether the live reload snippet is used
    liveReload: true,

    // Whether DOM diffing updates are applied where possible instead of page reloads
    domDiff: false,

    // The starting port number
    // Will increment up to (configurable) 10 times if a port is already in use.
    port: 8080,

    // Additional files to watch that will trigger server updates
    // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
    // Works great with a separate bundler writing files to your output folder.
    // e.g. `watch: ["_site/**/*.css"]`
    watch: [],

    // Show local network IP addresses for device testing
    showAllHosts: true,

    // Use a local key/certificate to opt-in to local HTTP/2 with https
    /*https: {
      key: "../localhost.key",
      cert: "../localhost.cert",
    },*/

    // Change the default file encoding for reading/serving files
    encoding: "utf-8",
  });

  /* Compilation
   ########################################################################## */

  // Watch our js for changes
  eleventyConfig.addWatchTarget('./src/assets/scripts/main.js');
  eleventyConfig.addWatchTarget('./src/_layouts/components');

  // Copy _data
  eleventyConfig.addPassthroughCopy({ 'src/_data': 'assets/data' });
  eleventyConfig.addWatchTarget("./src/_data");

  // Watch our compiled assets for changes
  eleventyConfig.addPassthroughCopy('src/compiled-assets');
  eleventyConfig.addPassthroughCopy('./compiled-content');

  // Copy all fonts
  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });

  // Copy asset images
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });

  // Copy Downloads
  eleventyConfig.addPassthroughCopy({ 'src/downloads': 'downloads' });

  // Copy CSS (libs)
  eleventyConfig.addPassthroughCopy({ 'src/assets/styles/libs': 'assets/styles/libs' });

  // Copy images
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/**/*.fset");
  eleventyConfig.addPassthroughCopy("src/**/*.fset3");
  eleventyConfig.addPassthroughCopy("src/**/*.iset");
  eleventyConfig.addPassthroughCopy("src/**/*.png");

  // Copy Media
  eleventyConfig.addPassthroughCopy("src/**/*.mp4");
  eleventyConfig.addPassthroughCopy("src/**/*.glb");
  eleventyConfig.addPassthroughCopy("src/**/*.obj");
  eleventyConfig.addPassthroughCopy("src/**/*.mtl");
  eleventyConfig.addPassthroughCopy("src/**/*.pdf");

  // Copy Downloads
  eleventyConfig.addPassthroughCopy({ 'src/downloads': 'downloads' });

  // Copy Scripts
  eleventyConfig.addPassthroughCopy({ 'src/assets/scripts': 'assets/scripts' });
  eleventyConfig.addWatchTarget("./src/assets/scripts");

  // Copy CNAME
  eleventyConfig.addPassthroughCopy({ 'src/CNAME': '' });

  /* BaseUrl
 ########################################################################## */
 eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  /* Functions
 ########################################################################## */

  eleventyConfig.addJavaScriptFunction("urlPrefix", function () {
    return pathPrefix;
  });

  eleventyConfig.addJavaScriptFunction("getContentUrl", function (url) {
    return `.${url}`;
  });

  eleventyConfig.addJavaScriptFunction("getImagesBasePath", function (section) {
    return `/${pathes.images[section]}`;
  });

  eleventyConfig.addJavaScriptFunction("getCompetencesToModuleMapPath", function (studyProgramme) {
    return `/${pathes.competencesToModuleMap[studyProgramme]}`;
  });

  /* Filter
 ########################################################################## */

  eleventyConfig.addFilter("contentByTopic", function (topic) {
    eleventyConfig.addCollection(topic, (collection) => {
      clearRequireCache();
      return collection.getFilteredByGlob(`./src/content/${topic}/*.md`);
    });
    return topic;
  });

  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
  });

  /* Collections
 ########################################################################## */

  eleventyConfig.addCollection("all", function (collection) {
    clearRequireCache();
    return collection.getAll();
  });

  eleventyConfig.addCollection("pagesInToc", function (collection) {
    clearRequireCache();
    return collection.getAll().filter(item => item.data.inToc).sort((a, b) => {

      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("modulsBPO5", function (collection) {
    clearRequireCache();
     const modules = collection.getFilteredByGlob("./src/medieninformatik-bachelor/modulbeschreibungen-bpo5/*.md").sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
    
    /*const modulesWithCompetences = modules.map(module => {
      const path = `${pathes.competences.bachelor}${module.data.kuerzel}.json`;
      const content = fs.readFileSync(path,
        { encoding: 'utf8', flag: 'r' });
      console.log(content);
    });*/
    return modules;
  });

  eleventyConfig.addCollection("itemsKurzbericht", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/kurzbericht/*.md").sort((a, b) => {
      if (a.fileSlug > b.fileSlug) return 1;
      else if (a.fileSlug < b.fileSlug) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("quotes", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/quotes/*.md").sort((a, b) => {
      if (a.fileSlug > b.fileSlug) return 1;
      else if (a.fileSlug < b.fileSlug) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("modulsMPO5", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/medieninformatik-master/modulbeschreibungen-mpo5/*.md").sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("images", function (collection) {
    clearRequireCache();
    return allImages;
  });


  function pushHinweis(modul, hinweis) {
    
    (modul.data.hinweise ??= []).push(hinweis);
    (modul.data.meta ??= {}).status = "refactor"

    console.error("checkModuleForMetaData:  " + modul.data.kuerzel + ": "+hinweis);
  }

  function checkModuleForMetaData(modul) {
    
    // ist das Modul einem Semester zugeordnet?
    if (!(modul.data.angebotImWs || modul.data.angebotImSs)) {
      pushHinweis(modul, "Das Modul hat kein Semester (WiSe oder SoSe)")
    }

    // hat das Modul eine Prüfung?
    if (!(modul.data.studienleistungen?.Einzelleistung?.art) && !(modul.data.studienleistungen?. Teamleistung?.art)) {
      pushHinweis(modul, "Das Modul hat keine Prüfung")
    }

    // hat das Modul die nötigen Studiengangskriterien?
    if (modul.data.studiengangkriterien === undefined) {
      pushHinweis(modul, "Keine Studiengangskriterien definiert");
    } else {
      
      if (modul.data.studiengangkriterien.globalcitizenship === undefined) {
        pushHinweis(modul, "Studiengangskriterium »GlobalCitizenship« nicht definiert (muss 0 oder 1 sein)");
      }
    
      if (modul.data.studiengangkriterien.internationalisierung === undefined) {
        pushHinweis(modul, "Studiengangskriterium »Internationalisierung« nicht definiert (muss 0 oder 1 sein)");
      }

      if (modul.data.studiengangkriterien.interdisziplinaritaet === undefined) {
        pushHinweis(modul, "Studiengangskriterium »Interdisziplinaritaet« nicht definiert (muss 0 oder 1 sein)");
      }


      if (modul.data.studiengangkriterien.transfer === undefined) {
        pushHinweis(modul, "Studiengangskriterium »Transfer« nicht definiert (muss 0 oder 1 sein)");
      }
    
    }

    
  }


  eleventyConfig.addCollection("allModuls", function (collection) {
    clearRequireCache();
    const bachelor = collection.getFilteredByGlob("./src/medieninformatik-bachelor/modulbeschreibungen-bpo5/*.md");
    const master = collection.getFilteredByGlob("./src/medieninformatik-master/modulbeschreibungen-mpo5/*.md");

    bachelor.forEach(m => checkModuleForMetaData(m));
    master.forEach(m => checkModuleForMetaData(m));

    return [...bachelor, ...master].sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("handlungsfelder", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/handlungsfelder/*.md").sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("insights", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/insights/**/*.md").sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("howMightWe", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/how-might-we/*.md").sort((a, b) => {
      const bewertungA = a.data.tags.find(tag => tag.Bewertung);
      const bewertungB = b.data.tags.find(tag => tag.Bewertung);
      if (bewertungA > bewertungB) return 1;
      else if (bewertungA < bewertungB) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("misc", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/misc/*.md").sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("schwerpunkte", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/master-schwerpunkte/*.md").sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("jobOffers", function (collection) {
    clearRequireCache();
    return collection.getFilteredByGlob("./src/analysen/stellenausschreibungen/**/*.md").sort((a, b) => {
      if (a.data.title > b.data.title) return 1;
      else if (a.data.title < b.data.title) return -1;
      else return 0;
    });
  });

  eleventyConfig.addCollection("sorted", function (collection) {
    clearRequireCache();
    return POIs = collection.getFilteredByGlob("./src/**/*.md").sort((a, b) => {
      const filenameFromA = a.filePathStem.split(/\//).pop();

      if (filenameFromA === 'index') return 1;
      else if (a.fileSlug > b.fileSlug) return 1;
      else if (a.fileSlug < b.fileSlug) return -1;

      else return 0;
    });
  });

  /* Shortcodes
 ########################################################################## */

  eleventyConfig.addShortcode("image", function(src, caption) { 
    return shortcodeModuls.images.getImageBlock(src, caption);
  });

  eleventyConfig.addShortcode("screenshot", function(src, caption) { 
    return shortcodeModuls.images.getScreenshotBlock(src, caption);
  });

  eleventyConfig.addShortcode("gallery", function(src, classname, caption) { 
    caption = caption || '';
    classname = classname || '';
    if(!src) return console.error('No src given for gallery shortcode');
    const attributes = {
      src: src,
      id: 'gallery-' + src.replace(/\//g, '-').replace(/\./g, '-').replace(/_/g, '-').replace(/ /g, '-').toLowerCase(),
      class: classname
    };
    return shortcodeModuls.images.getGallery(this.ctx, this.ctx, attributes);
  });

  /* Data Extension
  ########################################################################## */
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));


  /* Environment
 ########################################################################## */

  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
      /*if (outputPath.endsWith('.html')) {
        return minified = htmlmin.minify(content, {
          collapseInlineTagWhitespace: false,
          collapseWhitespace: true,
          removeComments: true,
          sortClassName: true,
          useShortDoctype: true,
        });
      }*/

      return content;
    });
  }

  return {
    dir: {
      includes: '_components',
      input: 'src',
      layouts: '_layouts',
      output: 'docs',
    },
    pathPrefix: pathPrefix,
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: [
      'md',
      'html',
      'njk',
      '11ty.js',
      'json'
    ],
  };
};
