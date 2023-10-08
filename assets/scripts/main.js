/* Dobby Kette
############################################################################ */


const addContentInjections = () => {
  const { pathPrefix } = settings;
  const contentInjections = document.querySelectorAll("[data-js-inject-content]");

  contentInjections.forEach((contentInjection) => {
    const url = contentInjection.dataset.jsInjectContent.replace(/^\//, pathPrefix);
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        contentInjection.innerHTML = data;
    });
  });
};

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
  addContentInjections();
});
