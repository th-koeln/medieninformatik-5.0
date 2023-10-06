exports.getHeader = (eleventy, data) => {
  const currentDay= new Date().getDate();
  const currentMonth = new Date().getMonth() +1;
  const currentYear = new Date().getFullYear();
  const publishDate = `${currentYear}-${currentMonth}-${currentDay}`;

  return `
    <head>
      <title>Medieninformatik 5.0 // ${data.title}</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta property="og:title" content="${data.title}">
      <meta property="article:published_time" content="${publishDate}">
      <meta name="author" content="Medieninformatik 5.0">

      <link rel="apple-touch-icon" sizes="180x180" href="${eleventy.url('/assets/images/favicons/apple-touch-icon.png')}">
      <link rel="icon" type="image/png" sizes="32x32" href="${eleventy.url('/assets/images/favicons/favicon-32x32.png')}">
      <link rel="icon" type="image/png" sizes="16x16" href="${eleventy.url('/assets/images/favicons/favicon-16x16.png')}">
      <link rel="manifest" href="${eleventy.url('/assets/images/favicons/site.webmanifest')}">
      <link rel="mask-icon" href="${eleventy.url('/assets/images/favicons/safari-pinned-tab.svg')}" color="#5bbad5">
      
      <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="#ffffff">

      <link href="${eleventy.url('/compiled-assets/main.css')}" rel="stylesheet">
      <script src="${eleventy.url('/assets/scripts/main.js')}" defer></script>

    </head>
  `;
};
