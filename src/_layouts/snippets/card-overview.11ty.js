exports.render = (eleventy, data, attributes) => {

  const {id} = attributes;
  const {search} = attributes;
  const searchParams = search.split('+');

  const filteredCards = data.collections.contentCards.filter(card => {
    const inOverview = card.data.inOverview || [];
    if(!inOverview.length) return false;
    
    let hitCount = 0;
    inOverview.forEach(card => {
      searchParams.includes(card) ? hitCount++ : null;
    });
  
    return hitCount === searchParams.length;
  });
  
  const cardsList = filteredCards.map(card => {
    return `
      <li class="content-card-item">
        <a href="${card.data.target}">
          <h3>${card.data.title}</h3>
          ${card.content}
        </a>
      </li>
    `;
  });

  return `
    <ul id="${id}" class="content-card-overview">
      ${cardsList.join('')}
    </ul>
  `;
};