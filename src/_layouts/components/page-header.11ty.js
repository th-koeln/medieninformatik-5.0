exports.getPageHeader = (eleventy) => {

  return `

  <header class="main-header">
    <nav>
      <ul class="main-navigation">
        <li><a href="${eleventy.url("/")}"><i class="icon">home</i></a></li>
      </ul>
    </nav>
  </header>
  `;
};
