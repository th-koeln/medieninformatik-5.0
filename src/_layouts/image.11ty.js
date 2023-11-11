module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "image",
	},
	render(data) {
    const getDate = (date) => {
      const dateObject = new Date(date);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      return `${day}.${month}.${year}`;
    };

    const imageUrl = `${data.page.filePathStem}.png`;
    const size = data.size ? `<li>${data.size} Einträge</li>` : ""; 
    const date = data.date ? `<li>Ausschreibung vom ${getDate(data.date)}</li>` : "";
    const rawData = data.urlRohdaten ? `<li><a href="${data.urlRohdaten}" target="_blank">Rohdaten</a></li>` : "";
    const visualisation = data.urlVisualisation ? `<li><a href="${data.urlVisualisation}" target="_blank">Visualisierungsdaten</a></li>` : "";

    return `
      <figure class="image">
        <img src="${this.url(imageUrl)}" alt="${data.title}" />
        <figcaption>
        <h1 class="title">${data.title}</h1>
        <h2 class="subtitle">${data.info}</h2>
          <ul>
            ${size}
            ${date}
            ${rawData}
            ${visualisation}
          </ul>
        </figcaption>
      </figure>
    `;
  }
};
