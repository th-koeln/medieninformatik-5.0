exports.render = function (data) {

  const documentHeader = require('./components/head.11ty');
  const pageHeader = require('./components/page-header.11ty');
  const pageFooter = require('./components/page-footer.11ty');
  const utils = require('./components/utils.11ty.js');
  
  const documentHead = documentHeader.getHeader(this, data);
  const pageHead = pageHeader.getPageHeader(this, data);
  const pageFoot = pageFooter.getPageFooter(this, data);
  const subtitle = data.subtitle ? `<h2 class="subtitle">${data.subtitle}</h2>` : '';
  const date = data.date ? `<p class="date">${utils.getDate(data.date)}</p>` : '';

  return `<!doctype html>
  <html lang="de">
    ${documentHead}
    <body class="page ${data.bodyClass}">
      ${pageHead}
      <main>
        <header class="content-header">
          <h1 class="title">${data.title}${utils.getEditLink(data, data)}</h1>
          ${subtitle}
          ${date}
        </header>
        ${utils.parseContent(this, data)}
      </main>
      ${pageFoot}

    </body>
  </html>`;
};
