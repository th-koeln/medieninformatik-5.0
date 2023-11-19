module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "curriculum",
	},
	render(data) {

    const moduleTools = require('./components/moduleTools.11ty');
    const translateStars = moduleTools.translateStars;

    const modules = data.collections[data.collection];
    const eleventy = this;
    const handlungsfelderData = data.collections.handlungsfelder;

    const kompetenzenFuerHandlungsfelder = handlungsfelderData.map((handlungsfeld) => {

      const bereicheFuerHandlungsfeld = handlungsfeld.data.competencies.map((bereich) => {

        const bereiche = bereich.sub.map((item) => {

          const kompetenzId = eleventy.slugify(item.competence).substr(0,48);

          const modulesProvidingThisCompetence = modules.map((modulItem) => {
            const modul = moduleTools.addCompetences(modulItem.data);
            
            if(!modul.kompetenzen) return;

            const provider = modul.kompetenzen.liefert.filter((element) => {
              return element.Kompetenz === item.competence && element.liefert > 1;
            });

            if(provider.length === 0) return;

            const {liefert} = provider[0];
            const {braucht} = provider[0];

            return `
              <li>
                <div class="score-indicator-group-wrap">
                  <div class="score-indicator-group">
                    <span title="Modul liefert ${translateStars(liefert)} dieser Kompetenz." class="score-value-indicator liefert" style="width: calc(${liefert} * 9%)"></span>
                    <span title="Modul erfordert ${translateStars(braucht)} dieser Kompetenz." class="score-value-indicator braucht" style="width: calc(${braucht} * 9%); transform: translateX(-100%)"></span>
                  </div>
                </div>
                <p><a href="${eleventy.url(modulItem.url)}">${modul.title}</a></p>
              </li>
            `;
          });

          return `
            <li id="${kompetenzId}">
              <div>${item.competence}</div>
              <ul class="competence-module-list">
                ${modulesProvidingThisCompetence.join("\n")}
              </ul>
            </li>
          `;
        });

        const idBereich = this.slugify(bereich.title);

        return `
          <li id="${idBereich}">
            <h4>${bereich.title}</h4>
            <ul class="single-competence-list is-tight">
              ${bereiche.join("\n")}
            </ul>
          </li>
        `;
      });

      const key = handlungsfeld.data.title;
      const handlungsfeldKuerzel = moduleTools.handlungsfelderMap.get(key);
      const scoreCssClass = handlungsfeldKuerzel ? handlungsfeldKuerzel.toLowerCase() : '';
      const idHandlungsfeld = this.slugify(key);

      return `
        <div id="${idHandlungsfeld}" class="competence-block">
          <h3>${handlungsfeld.data.title}</h3>
          <ul class="is-tight competence-bereiche indicate-as-${scoreCssClass}">
            ${bereicheFuerHandlungsfeld.join("\n")}
          </ul>
        </div>
      `;
      
    });
    

    return `
      <main>
        <section>
          <header>
            <h1>${data.title}</h1>
          </header>

          ${data.content}
        </section>

        <section>
          <div class="competence-list">
            ${kompetenzenFuerHandlungsfelder.join("\n")}
          </div>
        </section>
      </main>
    `;
  }
};