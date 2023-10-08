exports.getPageFooter = (eleventy, data) => {

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
      <p class="info">
        ${date}.${month}.${year} // ${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </footer>
  `;
};
