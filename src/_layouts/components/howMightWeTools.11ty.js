exports.howMightWeList = (data, filterBy) => {

  const filteredHMW = data.collections.howMightWe.filter((item) => {
    return item.data.sources.find((source) => {
      return source === filterBy;
    });
  });

  return filteredHMW.map((item) => {
    return `
      <li class="insight">
        ${item.data.title}
      </li>
    `;
  });
}; 