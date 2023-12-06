/* Content Injection
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

/* Kompetenzen verlinken
############################################################################ */

const linkCompetencies = () => {
  const competencies = document.querySelectorAll("[data-js-inject-in-other-context]");

  competencies.forEach(competenceNode =>{
    const editIcon = document.createElement("span");
    editIcon.classList.add("icon", "icon--inline", "has-interaction");
    editIcon.innerHTML = "link";
    editIcon.setAttribute("title", "Kompetenz verlinken: Klick, dann wird der Platzhalter in die Zwischenablage kopiert.");
    editIcon.addEventListener("click", () => {
      const competenceString = competenceNode.dataset.jsInjectInOtherContext;
      navigator.clipboard.writeText(`{{${competenceString}}}`);
    });
    competenceNode.appendChild(editIcon);
  });
};

/* Filter
############################################################################ */

const addListInteractions = () => {

  const filterTags = [];

  const getItemData = (itemRawData) => {
    try {
      return JSON.parse(itemRawData);
    } catch (error) {
      console.error(error, itemRawData);
      return {}
    }
  };

  const changeHistory = () => {
    const url = new URL(location);
    url.searchParams.set("filter", filterTags.join(","));
    history.pushState({}, "", url);
  };

  const addOrRemoveFilterTag = (tagTriggerElement, mode) => {
    const tagTriggerElementValue = tagTriggerElement.dataset.jsListInteractionItemTrigger;
    const tagTriggerElementValueAsObject = JSON.parse(tagTriggerElementValue);
    const tagTriggerElementValueAsString = JSON.stringify(tagTriggerElementValueAsObject);

    const isActive = tagTriggerElement.classList.contains("is-active");
    
    if(isActive || mode === "remove"){
      filterTags.splice(filterTags.indexOf(tagTriggerElementValueAsString), 1);
    } else {
      filterTags.push(tagTriggerElementValueAsString);
    }

    changeHistory();
  };

  const addResultCount = (count) => {
    interactiveListElementHeader.innerHTML = `${count} ${count > 1 ? "Einträge" : "Eintrag"}`;
  };

  const filterItems = (tagTriggerElement) => {

    const tagTriggerElementValue = tagTriggerElement.dataset.jsListInteractionItemTrigger;
  
    interactiveListElementItems.forEach((item) => {
      item.classList.remove("is-hidden");
    });

    filterTags.forEach((filterTag) => {
      
      interactiveListElementItems.forEach((item) => {
        const itemRawData = item.dataset.jsListInteractionItem;
        const itemData = getItemData(itemRawData);
        const itemDataAsString = JSON.stringify(itemData);

        if(!itemDataAsString.match(filterTag)){
          item.classList.add("is-hidden");
        }
      });
    });


    const activeTagTriggerElements = document.querySelectorAll(`[data-js-list-interaction-item-trigger='${tagTriggerElementValue}']`);
    activeTagTriggerElements.forEach((activeTagTriggerElement) => {
      activeTagTriggerElement.classList.toggle("is-active");
    });

    const visibleItems = document.querySelectorAll("[data-js-list-interaction-item]:not(.is-hidden)");
    addResultCount(visibleItems.length);
  };

  const initItemFilters = () => {
    const overview = document.querySelector("[data-js-overview]");
    const tagTriggerElements = overview.querySelectorAll("[data-js-list-interaction-item-trigger]");
    tagTriggerElements.forEach((tagTriggerElement) => {
  
      tagTriggerElement.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
  
        addOrRemoveFilterTag(tagTriggerElement);
        filterItems(tagTriggerElement, event);
      });
    });
  }

  const initSingleChoiceFilters = () => {
    const singleChoiceFilters = document.querySelectorAll("[data-js-list-single-choice-filter]");
    
    singleChoiceFilters.forEach((singleChoiceFilter) => {
      
      const singleChoiceFilterItems = singleChoiceFilter.querySelectorAll("[data-js-list-interaction-item-trigger]");

      singleChoiceFilterItems.forEach((singleChoiceFilterItem) => {
        singleChoiceFilterItem.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          
          const activeItem = Array.from(singleChoiceFilterItems).find(item => item.classList.contains("is-active"));
        
          if(activeItem === singleChoiceFilterItem){
            addOrRemoveFilterTag(singleChoiceFilterItem, 'remove');

          }else if(activeItem !== undefined){
            addOrRemoveFilterTag(activeItem, 'remove');
            filterItems(activeItem, event);
          }
          
          addOrRemoveFilterTag(singleChoiceFilterItem);
          filterItems(singleChoiceFilterItem, event);
        });
      });
    });
  };

  const parseUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const filterString = searchParams.get("filter");
    if(!filterString) return;
    const filters = filterString.split(",");
    const singleChoiceFilters = document.querySelectorAll("[data-js-list-single-choice-filter]");
    filters.forEach((filter) => {
      singleChoiceFilters.forEach((singleChoiceFilter) => {
        const filterItem = singleChoiceFilter.querySelector(`[data-js-list-interaction-item-trigger='${filter}']`);
        if(filterItem === null) return;
        addOrRemoveFilterTag(filterItem);
        filterItems(filterItem);
      });
    });
  };
  
  const interactiveListElement = document.querySelector("[data-js-list-interactions]");
  if(!interactiveListElement || interactiveListElement === null) return;

  const interactiveListElementHeader = interactiveListElement.querySelector("[data-js-list-interaction-header]");
  const interactiveListElementItems = document.querySelectorAll("[data-js-list-interaction-item]");

  initItemFilters();
  initSingleChoiceFilters();
  parseUrl();
};

/* Dynamische Links … im Grunde stumpfe JS Verweise auf andere Seiten
############################################################################ */
const addDynamicHyperlinks = () => {
  const dynamicHyperlinks = document.querySelectorAll("[data-js-hyperlink]");

  dynamicHyperlinks.forEach((dynamicHyperlink) => {
    const dynamicHyperlinkValue = dynamicHyperlink.dataset.jsHyperlink;
    dynamicHyperlink.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      location.href = dynamicHyperlinkValue;
    });
  });
};



/* Galerien interaktiv machen
############################################################################ */

const addGalleryInteractions = () => {
  const galleries = document.querySelectorAll("[data-js-bluimp-gallery]");
  galleries.forEach((gallery) => {
    gallery.onclick = function (event) {
      event = event || window.event;
      var target = event.target || event.srcElement;
      var link = target.src ? target.parentNode : target;
      var options = { index: link, event: event };
      var links = this.getElementsByTagName('a');
      blueimp.Gallery(links, options);
    }
  });
};

/* Scroll to Top
############################################################################ */

const addScrollToTop = () => {
  const scrollToTop = document.querySelector("[data-js-to-top]");
  if(!scrollToTop || scrollToTop === null) return;

  window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTop.classList.add("is-visible");
    } else {
      scrollToTop.classList.remove("is-visible");
    }
  };
};

/* Scrollspy
############################################################################ */

const addScrollSpy = () => {

  const inlineNavigation = document.querySelector("[data-js-scrollspy]");
  if(!inlineNavigation) return;

  let scrollSpyActiveElement = false;
  if(viewportSize !== "large" && scrollSpyActiveElement) {
    scrollSpyActiveElement.classList.remove('is-active');
    scrollSpyActiveElement = false;
    return;
  }
  if(viewportSize !== "large") return;

  const sections = document.querySelectorAll("h2[id], h3[id]");
    
  const intersectionCallback = (entries, observer) => {
    if (entries[0].intesectionRatio <= 0) return;

    if (entries[0].intersectionRatio > 0 || entries[0].intersectionRatio < 0.2) {

      if(scrollSpyActiveElement) scrollSpyActiveElement.classList.remove('is-active');

      const {id} = entries[0].target;
      const activeElement = inlineNavigation.querySelector(`[data-scrollspy-target="${id}"]`).querySelector("a");
      activeElement.classList.add('is-active');

      scrollSpyActiveElement = activeElement;
    }
  };
  
  const intersectionOptions = {};
  const intersectionObserver = new IntersectionObserver(intersectionCallback, intersectionOptions);
  
  sections.forEach((section) => {
    intersectionObserver.observe(section);
  });
};

/* Größe des Viewports ermitteln
############################################################################ */

let viewportSize = "small";

const isHidden = elem => {
  const styles = window.getComputedStyle(elem)
  return styles.display === 'none' || styles.visibility === 'hidden'
}

const checkViewportSize = () => {
  const sizeIndicatorLarge = document.querySelector("[data-js-size-indicator-large]");
  return !isHidden(sizeIndicatorLarge) ? "large" : "small";
};

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
  addEventListener("resize", (event) => {
    viewportSize = checkViewportSize();
  });
  viewportSize = checkViewportSize();

  addContentInjections();
  linkCompetencies();
  addListInteractions();
  addDynamicHyperlinks();
  addGalleryInteractions();
  addScrollToTop();
  addScrollSpy();
});
