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

  const sections = document.querySelectorAll("[data-js-scrollspy-section]");
  const intersectionCallback = (entries, observer) => {
    let updated = false;    
    entries.forEach(entry => {
    // if the menu was aleady updated by a previous entry, we don't need to check the other entries.
    if (updated) {
      return;
    }  
    let activeBlock; // the block that should be highlighted in the menu.
    if(!entry.isIntersecting) {
      
      // This element has just left the viewport. This means at least one of 2 possibilities:
      // 1. the next element has its top aligned with the top of the viewport.
      //    In this case the next element should be activated.
      // 2. the previous element is (at least partly) visible.
      //    In this case we need to keep looking at previous elements until
      //    we find the highest one that is still visible.
      if (isInViewport(entry.target.nextElementSibling)) {        
        // possibility 1.
        activeBlock = entry.target.nextElementSibling;

      } else if (isInViewport(entry.target.previousElementSibling)) {
        // possibility 2.
        activeBlock = entry.target.previousElementSibling;
        while ( isInViewport(activeBlock.previousElementSibling) ) {
          activeBlock = activeBlock.previousElementSibling;
        } 
      }
    } else {
      // This element just entered the viewport. 2 possibilities:
      // 1. The top of the element moved in from the bottom.
      //    In this case nothing needs to happen.
      // 2. The bottom of the element moved in from the top.
      //    In this case the current element should also become active.
      if (!isInViewport(entry.target.nextElementSibling)) {
        // possibility 1.
        return;
        
      } else if (!isInViewport(entry.target.previousElementSibling)) {
        // possibility 2.
        activeBlock = entry.target;
      }
    }
    
    // remove active class on all elements.
    inlineNavigation.querySelectorAll('.is-active').forEach((item) => {
      item.classList.remove('is-active');
    });
    // Couldn't deternmine an active block. So don't do anything.
    if (!activeBlock) {
      return;
    }

    // get id of the intersecting section
    const id = activeBlock.getAttribute('id');
    
    // find matching link and add appropriate class
    const navElement = inlineNavigation.querySelector(`[data-scrollspy-target="${id}"] a`);

    if(!navElement) return;
    navElement.classList.add('is-active');

    // Wer're done. Set flag to make sure that we don't check other entries.
    updated = true;      
    });
  };
  
  
  const isInViewport = (element) => {
    if (!element) {
      return false;
    }
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  const intersectionObserver = new IntersectionObserver(intersectionCallback, { 
    rootMargin: '-1px',
  });
  
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


/* Clientseitig generierte Navigation
############################################################################ */

const slugify = (str) => {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

const addDynamicPageNavigation = () => {
  const pageNavigationElement = document.querySelector("[data-js-page-navigation]");
  if(!pageNavigationElement || pageNavigationElement === null) return;

  pageNavigationElement.id = "page-navigation";

  const navWrap = document.createElement("nav");
  navWrap.classList.add("inline-navigation");
  navWrap.dataset.jsScrollspy = true;
  pageNavigationElement.appendChild(navWrap);

  const headline = document.createElement("h2");
  headline.classList.add("navigation-title");
  headline.innerHTML = "Inhalt";
  navWrap.appendChild(headline);

  const pageNavigationElementLevel = pageNavigationElement.dataset.jsPageNavigation;
  const pageNavigationHeadings = document.querySelectorAll(pageNavigationElementLevel);

  const pageNavigationList = document.createElement("ul");
  pageNavigationList.classList.add("item-list");
  pageNavigationList.classList.add("is-tight");
  navWrap.appendChild(pageNavigationList);

  pageNavigationHeadings.forEach((pageNavigationHeading) => {

    const id = slugify(pageNavigationHeading.innerText);
    if(!pageNavigationHeading.id) pageNavigationHeading.id = id;
    const pageNavigationListItem = document.createElement("li");
    pageNavigationListItem.dataset.scrollspyTarget = pageNavigationHeading.id;
    pageNavigationList.appendChild(pageNavigationListItem);

    const pageNavigationLink = document.createElement("a");
    pageNavigationLink.setAttribute("href", `#${pageNavigationHeading.id}`);
    pageNavigationLink.innerHTML = pageNavigationHeading.innerHTML;
    pageNavigationListItem.appendChild(pageNavigationLink);
  });

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
  addDynamicPageNavigation();
  addScrollSpy();

  location.href="https://medieninformatik.pages.archi-lab.io/po5/reakkreditierung/";
});
