module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "job-offers",
	},
	render(data) {

    const insightsTools = require('./components/insightsTools.11ty.js');
    const insightsList = insightsTools.insightsList(data, "Stellenausschreibungen");

    const howMightWeTools = require('./components/howMightWeTools.11ty.js');
    const howMightWeList = howMightWeTools.howMightWeList(data, "Stellenausschreibungen");

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
          <div class="hero-text">
            ${data.content}
          </div>
				</section>

        <section>
          <ul class="job-offer-overview" data-js-overview>
            ${jobOfferList.join("\n")}
          </ul>
        </section>

        <section class="insights has-seperator is-loose">
          <h2>Daraus wurden folgende Anforderungen/ Ideen/ Aussagen abgeleitet:</h2>
          <ul class="insight-overview without-tags" data-js-overview>
            ${insightsList.join("\n")}
          </ul>

          <a href="/insights" class="cta">Alle Anforderungen/ Ideen/ Aussagen ansehen</a>
        </section>

        <section class="how-might-we has-seperator">
          <h2>Daraus wurden folgende How-might-we-Fragen abgeleitet:</h2>
          <ul class="hero-list">
            ${howMightWeList.join("\n")}
          </ul>

          <a href="/how-might-we" class="cta">Alle How-might-we-Fragen ansehen</a>
        </section>
			</main>
		`;
	}
}
