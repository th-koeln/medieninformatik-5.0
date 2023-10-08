module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "content-blocks",
	},
	render(data) {

    const kurzberichtList = data.collections.itemsKurzbericht.map((item) => {
      const editUrl = `${data.settings.repoEditUrl}${item.page.inputPath.replace('./src/', 'src/')}`;
      return `
        <section class="${item.data.class ? item.data.class : ''} ${item.data.level===1 ? 'has-seperator' : ''}">
          <div class="content">
            <h${item.data.level + 1} id="${this.slugify(item.data.title)}">${item.data.title} <a href="${editUrl}"><span class="icon icon--inline">edit</span></a></h${item.data.level + 1}>
            ${item.content}
          </div>
        </section>
      `;
    });

		return `
			<main>
				<section class="module-core-data">
					<header>
						<h1>${data.title}</h1>
					</header>
				</section>

        ${data.content}

        <section>
          ${kurzberichtList.join("\n")}
        </section>
			</main>
		`;
	}
}
