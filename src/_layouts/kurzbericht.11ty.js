module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "content-blocks kurzbericht",
	},
	render(data) {

    const tocTools = require('./components/tocTools.11ty.js');
    const utils = require('./components/utils.11ty.js');

    const quote = utils.getQuote(data);

    const kurzberichtList = data.collections.itemsKurzbericht.map((item) => {
      const meta = utils.getContentMeta(this, item.data.meta);
      const status = item.data.meta && item.data.meta.status ? `is-${item.data.meta.status}` : '';

      return `
        <section class="${status} ${item.data.class ? item.data.class : ''} ${item.data.level===1 ? 'has-seperator' : ''}">
          <div class="content">
            <h${item.data.level + 1} id="${this.slugify(item.data.title)}">${item.data.title}
            ${utils.getOpenInNewWindowLink(item, data)}${utils.getEditLink(item, data)}</h${item.data.level + 1}>
            ${meta}
            ${item.content}
          </div>
        </section>
      `;
    });

		return `
    
			<main>
			  <section id="page-cover" class="cover">
			  	<header>
			  		<p class="owner">Technische Hochschule Köln<br/>Fakultät für Informatik und Ingenieurwissenschaften</p>
			  		<h1 class="title">${data.subtitle}</h1>
			  		<h2 class="subtitle">${data.title}</h2>
			  		<div class="version-and-date">
			  		<p class="version">Version ${data.version}</p>
			  		<p class="date">Letzte Änderung am ${utils.getDate(data.page.date)}</p>
			  		</div>
			  	</header>
			  </section>

        <div id="page-navigation">
          ${tocTools.getPageTOC({
            eleventy: this,
            collection: data.collections.itemsKurzbericht,
            maxLevel: 2
          })}
        </div>
        ${data.content}
        <section>
          ${kurzberichtList.join("\n")}
        </section>
			</main>
  
		`;
	}
}
