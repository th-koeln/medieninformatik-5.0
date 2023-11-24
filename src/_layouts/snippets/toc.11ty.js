exports.render = (eleventy, data, attributes) => {

  const {id} = attributes;
  const {search} = attributes;
  const searchParams = search.split('+');

  // Geht garantiert schöner 🙀
  const pagesForToc = data.collections.all.filter(page => {
    const tocs = page.data.tocs || [];
    if(!tocs.length) return false;

    let hitCount = 0;
    tocs.forEach(toc => {
      searchParams.includes(toc) ? hitCount++ : null;
    });
    console.log(hitCount, searchParams.length, "searchParams:", searchParams, "Tocs:", tocs, page.data.title)
    return hitCount === searchParams.length;
  });

  const sortedPpagesForToc = pagesForToc.sort((a, b) => {
    return a.data.title > b.data.title ? 1 : -1;
  });

  const pagesList = sortedPpagesForToc.map(page => {
    return `
      <li>
        <a href="${page.url}">${page.data.title}</a>
      </li>
    `;
  });

  return `
    <div id="${id}">
      <ul>
        ${pagesList.join('')}
      </ul>
    </div>
  `;
};