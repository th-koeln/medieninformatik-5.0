module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "content-blocks",
	},
	render(data) {

    const tocTools = require('./components/tocTools.11ty.js');
    const utils = require('./components/utils.11ty.js');

    const kurzberichtList = data.collections.itemsKurzbericht.map((item) => {
      const meta = utils.getContentMeta(item.data.meta);
      const status = item.data.meta && item.data.meta.status ? `is-${item.data.meta.status}` : '';

      return `
        <section class="${status} ${item.data.class ? item.data.class : ''} ${item.data.level===1 ? 'has-seperator' : ''}">
          <div class="content">
            <h${item.data.level + 1} id="${this.slugify(item.data.title)}">${item.data.title} 
            ${utils.getOpenInNewWindowLink(item)}${utils.getEditLink(item, data)}</h${item.data.level + 1}>
            ${meta}
            ${item.content}
          </div>
        </section>
      `;
    });

		return `
			<main>
				<section>
					<header>
						<h1>${data.title}</h1>
					</header>
				</section>

        <section>
          <nav>
            ${tocTools.getPageTOC({
              eleventy: this,
              collection: data.collections.itemsKurzbericht,
              maxLevel: 2
            })}
          </nav>
        </section>

        ${data.content}

        <section>
          ${kurzberichtList.join("\n")}
        </section>
			</main>
		`;
	}
}
