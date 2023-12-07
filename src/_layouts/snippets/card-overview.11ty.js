exports.render = (eleventy, data, attributes) => {

  const {id} = attributes;
  const {search} = attributes;
  const searchParams = search.split('+');
  const className = attributes.className || '';

  const filteredCards = data.collections.all.filter(item => {
    const inOverview = item.data.inOverview || [];
    if(!inOverview.length) return false;
    
    let hitCount = 0;
    inOverview.forEach(item => {
      searchParams.includes(item) ? hitCount++ : null;
    });
  
    return hitCount === searchParams.length;
  });
  
  const cardsList = filteredCards.map(card => {
    
    const title = card.data.cardTitle ? card.data.cardTitle : card.data.title;
    const text = card.data.teaserText ? card.data.teaserText : '';

    return `
      <li class="content-card-item">
        <a href="${card.url}">
          <h3>${title}</h3>
          ${text}
        </a>
      </li>
    `;
  });

  return `
    <ul id="${id}" class="content-card-overview ${className}">
      ${cardsList.join('')}
    </ul>
  `;
};