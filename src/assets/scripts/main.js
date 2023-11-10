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

/* Filter Insights
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

  const addOrRemoveFilterTag = (tagTriggerElement) => {
    const tagTriggerElementValue = tagTriggerElement.dataset.jsListInteractionItemTrigger;
    const tagTriggerElementValueAsObject = JSON.parse(tagTriggerElementValue);
    const tagTriggerElementValueAsString = JSON.stringify(tagTriggerElementValueAsObject);

    const isActive = tagTriggerElement.classList.contains("is-active");
    
    if(isActive){
      filterTags.splice(filterTags.indexOf(tagTriggerElementValueAsString), 1);
    } else {
      filterTags.push(tagTriggerElementValueAsString);
    }
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
    const insightsOverview = document.querySelector("[data-js-insights-overview]");
    const tagTriggerElements = insightsOverview.querySelectorAll("[data-js-list-interaction-item-trigger]");
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
    const activeSingleChoiceFilters = [];
    const singleChoiceFilters = document.querySelectorAll("[data-js-list-single-choice-filter]");
    
    singleChoiceFilters.forEach((singleChoiceFilter) => {
      activeSingleChoiceFilters[singleChoiceFilter] = false;
      const singleChoiceFilterItems = singleChoiceFilter.querySelectorAll("[data-js-list-interaction-item-trigger]");

      singleChoiceFilterItems.forEach((singleChoiceFilterItem) => {
        singleChoiceFilterItem.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

          if(activeSingleChoiceFilters[singleChoiceFilter]){
            addOrRemoveFilterTag(activeSingleChoiceFilters[singleChoiceFilter]);
            activeSingleChoiceFilters[singleChoiceFilter].classList.remove("is-active");
          }
          activeSingleChoiceFilters[singleChoiceFilter] = singleChoiceFilterItem;
          
          addOrRemoveFilterTag(singleChoiceFilterItem);
          filterItems(singleChoiceFilterItem, event);
        });
      });
    });
  };
  

  const interactiveListElement = document.querySelector("[data-js-list-interactions]");
  if(!interactiveListElement || interactiveListElement === null) return;

  const interactiveListElementHeader = interactiveListElement.querySelector("[data-js-list-interaction-header]");
  const interactiveListElementItems = document.querySelectorAll("[data-js-list-interaction-item]");

  initItemFilters();
  initSingleChoiceFilters();
};




/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", () => {
  addContentInjections();
  linkCompetencies();
  addListInteractions();
});
