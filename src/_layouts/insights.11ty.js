module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "insights",
	},
	render(data) {

    const insightsList = data.collections.insights.map((item) => {
      
      const tags = item.data.tags.map((tag) => {
        if(typeof tag === "object" && tag["Themenfeld"]){
          return `<span class="tag">Themenfeld: ${tag["Themenfeld"]}</span>`;
        }
        if(typeof tag === "object" && tag["Quelle"]){
          return `<span class="tag">Quelle: ${tag["Quelle"]}</span>`;
        }
        return `<span class="tag">${tag}</span>`;
      }).join("\n");

      return `
        <li class="insight">
          <h3>${item.data.title}</h3>
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
          <nav>

          </nav>
        </section>

        ${data.content}

        <section>
          <ul class="insight-overview">
            ${insightsList.join("\n")}
          </ul>
        </section>
			</main>
		`;
	}
}
