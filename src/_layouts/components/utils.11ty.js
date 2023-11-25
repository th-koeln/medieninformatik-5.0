/* Metadaten für Content anzeigen
############################################################################ */

exports.getContentMeta = (eleventy, meta) => {
  if(!meta) return '';
  if(meta.status === 'ok') return '';

  const statusMap = {
    'wip': 'in Arbeit',
    'tbd': 'to be done',
    'rfreview': 'wartet auf Review',
    'review': 'im Review',
    'refactor':	'Überarbeitung erforderlich',
    'ok': 'Fertig'
  };

  const getComments = (comments) => {
    if(!comments) return '';

    const commentsList = comments.map(item => `<li>${item}</li>`);

    return commentsList.length === 0 ? '' 
      : `<strong>Kommentare</strong> <ul>${commentsList.join("\n")}</ul>`;
  };

  const statusIcon = meta.status === 'fertig' || meta.status === 'wip'  || meta.status === 'review' 
    ? '' : `<img class="animated-icon" src="${ '/assets/images/tapping-foot-om-nelle.gif'}">`;
  const status = meta.status ? `<li class="content-meta__status"><strong>Status:</strong> ${statusMap[meta.status]}${statusIcon}</li>` : '';
  const authors = meta.authors ? `<li class="content-meta__authors"><strong>AutorIn(en):</strong> ${meta.authors}</li>` : '';
  const reviewers = meta.reviewers ? `<li class="content-meta__reviewers"><strong>ReviewerIn(en):</strong> ${meta.reviewers}</li>` : '';
  const purpose = meta.purpose ? `<li class="content-meta__purpose"><strong>Funktion des Snippets:</strong> ${meta.purpose}</li>` : '';
  const comments = meta.comments ? `<li class="content-meta__comments">${getComments(meta.comments)}</li>` : '';
  
  return `
    <ul class="content-meta">
      ${status}
      ${authors}
      ${reviewers}
      ${purpose}
      ${comments}
    </ul>
  `;
};

/* Edit Link für Content erzeugen 
############################################################################ */

exports.getEditLink = (item, data) => {
  const editUrl = `${data.settings.repoEditUrl}${item.page.inputPath.replace('./src/', 'src/')}`;
  const editElement = `<a href="${editUrl}" title="Inhalt ändern"><span class="icon icon--inline">edit</span></a>`;

  return editElement;
};

/* Open in New Window Link für Content erzeugen 
############################################################################ */

exports.getOpenInNewWindowLink = (item) => {
  const url = `${item.url}`;
  return `<a href="${url}" title="Inhalt in neuem Fenster öffnen"><span class="icon icon--inline">open_in_new</span></a>`;
};

/* Content parsen und mit Snippets anreichern
############################################################################ */

exports.parseContent = (eleventy, data) => {

  const parser = require('node-html-parser');
  const { content } = data;

  if(!content.match(/<snippet.*?>/)) return;
  
  const contentWithSnippets = content.replace(/<snippet(.*?)>(.*?)<\/snippet>/g, (match, p1, p2) => {
    const root = parser.parse(match);
    const snippetElement = root.querySelector('snippet');
    const type = snippetElement.getAttribute('type');
    const snippetCode = require(`../snippets/${type}.11ty.js`);
    return snippetCode.render(eleventy, data, snippetElement.attributes);
  });

  return contentWithSnippets;
};


/* Ersten Buchstaben eines Strings groß schreiben
############################################################################ */

exports.ucFirst = (string) => {
  if(!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/* Datum formatieren
############################################################################ */

exports.getDate = (date) => {
  if(!date) return '';
  return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
};