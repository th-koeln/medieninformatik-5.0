/* Metadaten für Content anzeigen
############################################################################ */

exports.getContentMeta = (meta) => {
  if(!meta) return '';
  if(meta.status === 'ok') return '';

  const statusMap = {
    'wip': 'In Arbeit',
    'rfreview': 'Wartet auf Review',
    'review': 'In Review',
    'draft': 'Entwurf',
    'ok': 'Fertig'
  };

  const status = meta.status ? `<li class="content-meta__status">Status: ${statusMap[meta.status]}</li>` : '';
  const authors = meta.authors ? `<li class="content-meta__authors">${meta.authors}</li>` : '';
  const reviewers = meta.reviewers ? `<li class="content-meta__reviewers">${meta.reviewers}</li>` : '';
  const purpose = meta.purpose ? `<li class="content-meta__purpose">${meta.purpose}</li>` : '';
  
  return `
    <ul class="content-meta">
      ${status}
      ${authors}
      ${reviewers}
      ${purpose}
    </ul>
  `;
};