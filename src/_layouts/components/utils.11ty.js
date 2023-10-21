/* Metadaten für Content anzeigen
############################################################################ */

exports.getContentMeta = (meta) => {
  if(!meta) return '';
  if(meta.status === 'ok') return '';

  const statusMap = {
    'wip': 'in Arbeit',
    'tbd': 'to be done',
    'rfreview': 'wartet auf Review',
    'review': 'im Review',
    'ok': 'Fertig'
  };

  const status = meta.status ? `<li class="content-meta__status">Status: ${statusMap[meta.status]}</li>` : '';
  const authors = meta.authors ? `<li class="content-meta__authors">AutorIn(en): ${meta.authors}</li>` : '';
  const reviewers = meta.reviewers ? `<li class="content-meta__reviewers">ReviewerIn(en):${meta.reviewers}</li>` : '';
  const purpose = meta.purpose ? `<li class="content-meta__purpose">Funktion des Snippets: ${meta.purpose}</li>` : '';
  
  return `
    <ul class="content-meta">
      ${status}
      ${authors}
      ${reviewers}
      ${purpose}
    </ul>
  `;
};