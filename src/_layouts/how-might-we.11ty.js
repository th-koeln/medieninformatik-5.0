module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "how-might-we",
	},
	render(data) {

    const howMightWeList = data.collections.howMightWe.map((item) => {

      const tags = item.data.tags.map((tag) => {
        if(typeof tag === "object" && tag["Bewertung"]){
          return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>Bewertung: ${tag["Bewertung"]} ${tag["Bewertung"] > 1 ? "Punkte" : "Punkt"}</span>`;
        }
        return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>${tag}</span>`;
      }).join("\n");


      const dataObject = {
        tags: item.data.tags,
        title: item.data.title,
        src: item.url,
      };

      const content = item.content ? item.content : "";
      return `
        <li class="question" data-js-list-interaction-item='${JSON.stringify(dataObject)}'>
          <h3>${item.data.title}</h3>
          ${content}
          ${tags}
        </li>
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
          <div class="insight-meta" data-js-list-interactions>
            <header>
              <h3 data-js-list-interaction-header>${howMightWeList.length} Einträge</h3>
            </header>

            <ul class="question-overview">
              ${howMightWeList.join("\n")}
            </ul>
          </div>
        </section>
			</main>
		`;
	}
}
