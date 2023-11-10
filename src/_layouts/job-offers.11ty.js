module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "job-offers",
	},
	render(data) {

    const jobOfferList = data.collections.jobOffers.map((item) => {
      const imgSrc = item.filePathStem + ".png";

      return `

        <li class="job-offer-data">
          <a href="${item.url}">
          <h3>${item.data.title}</h3>
          <figure>
            <img src="${imgSrc}" alt="${item.data.title}" />
            <figcaption>
            ${item.data.info}
            </figcaption>
          </figure>
          </a>
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

            <ul class="job-offer-overview" data-js-overview>
              ${jobOfferList.join("\n")}
            </ul>
          </div>
        </section>
			</main>
		`;
	}
}
