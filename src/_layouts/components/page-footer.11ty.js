exports.getPageFooter = (eleventy, data) => {

  const gallery = require('../components/gallery.11ty.js');
  const toc = require('../components/tocTools.11ty.js');
  const tocContent = toc.getTocContent(eleventy, data);

  const date_ob = new Date();
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
  const seconds = date_ob.getSeconds();
  
  return `
    <footer class="main-footer">
      ${tocContent}
      
      <ul class="footer-info">
        <li class="copyright"> 
          <a href="https://www.medieninformatik.th-koeln.de">Medieninformatik an der TH Köln</a>
        </li>
        <li class="imprint"><a href="https://www.th-koeln.de/hochschule/impressum_8159.php">Impressum</a></li>
        <li>Verantwortlich für die Inhalte <a href="https://www.th-koeln.de/personen/christian.noss/">Christian Noss</a> und <a href="https://www.th-koeln.de/personen/matthias.boehmer/">Matthias Böhmer</a></li>
        <li class="last-update">Letzte Aktualisierung am ${date}.${month}.${year}, ${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}
        </li>
      </ul>
    </footer>
    
    ${gallery.getLightboxDialog()}

    <div id="scroll-to-top" data-js-to-top>
      <a href="#top-of-page" class="scroll-to-top-link" aria-label="Scroll to top"><span class="icon">arrow_upward</span></a>
    </div>

    <div data-js-size-indicator-small></div>
    <div data-js-size-indicator-large></div>

    <div class="modal-wrap">
      <div class="modal-content">
        <h2>Die Seite ist umgezogen…</h2>
        <p>… und das Repo auch. Beides liegt jetzt innerhalb der TH Infrastruktur.</p>
        <ul>
          <li><a href="https://medieninformatik.pages.archi-lab.io/po5/reakkreditierung/">Website</a></li>
          <li><a href="https://git.archi-lab.io/medieninformatik/po5/reakkreditierung">Repository</a></li>
        </ul>
      </div>
    </div>

  `;
};
