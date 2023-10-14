module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "insights",
	},
	render(data) {

    const insightsList = data.collections.insights.map((item) => {

      Number.prototype.map = function (in_min, in_max, out_min, out_max) {
        return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }

      let color = "black";

      const tags = item.data.tags.map((tag) => {
        if(typeof tag === "object" && tag["Themenfeld"]){
          return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>Themenfeld: ${tag["Themenfeld"]}</span>`;
        }
        if(typeof tag === "object" && tag["Quelle"]){
          color = tag["Quelle"].length.map(0, 20, 0, 360);
          return `<span class="tag" style="color: #ffffff; background-color: hsla(${color}, 60%, 50%,100%); border-color: hsla(${color}, 60%, 50%,100%);" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>Quelle: ${tag["Quelle"]}</span>`;
        }
        return `<span class="tag" data-js-list-interaction-item-trigger='${JSON.stringify(tag)}'>${tag}</span>`;
      }).join("\n");

      const borderColor = `border-color: hsl(${color}, 60%, 50%)`;

      const dataObject = {
        tags: item.data.tags,
        title: item.data.title,
        src: item.url,
      };

      return `
        <li class="insight" style="${borderColor}" data-js-list-interaction-item='${JSON.stringify(dataObject)}'>
          <p>${item.data.title}</p>
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
          <div data-js-list-interactions>
            <header>
              <h3 data-js-list-interaction-header>${insightsList.length} Einträge</h3>
            </header>

            <ul class="insight-overview ">
              ${insightsList.join("\n")}
            </ul>
          </div>
        </section>
			</main>
		`;
	}
}
