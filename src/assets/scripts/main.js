/* Dobby Kette
############################################################################ */


const addContentInjections = () => {
  const contentInjections = document.querySelectorAll("[data-js-inject-content]");
  contentInjections.forEach((contentInjection) => {
    const url = contentInjection.dataset.jsInjectContent;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        contentInjection.innerHTML = data;
    });
  });
};

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
  addContentInjections();
});
