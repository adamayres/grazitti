const searchElementSelector = '[data-testid="SpotlightSearchIcon.Icon"]';
const searchElementWithEventSelector = '[data-grazittisearch="true"]';
const compiledReactAppScriptUrl = 'https://rawcdn.githack.com/adamayres/grazitti/abfc87f16a3d81f1079a9ed820a2b35fb8a540c4/dist/assets/index-CINq0pkN.js';
const grazittiAppRootId = 'gz-app-root';
const searchOpenEventName = 'gz-search-open';
const onAppLoadedEvents = [];
let appLoaded = false;

/**
 * Adds a script link to the page
 *
 * @param scriptUrl the script URL
 * @param id a unique identifier
 * @return {Promise<unknown>} when the script loads
 */
async function addScriptLink(scriptUrl, id) {
  if (!document.getElementById(id)) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.setAttribute('crossorigin', 'true');
      script.setAttribute('id', id);
      script.setAttribute('src', scriptUrl);
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.append(script);
    });
  }
  return null;
}

/**
 * Simple debounce function
 *
 * @param callback the function to debounce
 * @param wait how long to debounce
 * @return {(function(...[*]): void)|*} a callback to the original function
 */
function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

/**
 * Creates the custom react app root element
 */
function getOrCreateCustomReactAppRoot() {
  const appRoot = document.getElementById(grazittiAppRootId);
  if (appRoot) {
    return appRoot;
  }

  const newAppRoot = document.createElement('div');
  newAppRoot.setAttribute('id', grazittiAppRootId);
  document.body.append(newAppRoot);
  return newAppRoot;
}

/**
 * Click handler for the Aurora Search Icon.
 *
 * @param event the click event
 * @return {Promise<void>}
 */
async function clickHandler(event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  // Check if the custom react app root element exists, if not create it.
  getOrCreateCustomReactAppRoot();

  // Add the custom react search component
  // await addScriptLink(compiledReactAppScriptUrl, 'gz-app');

  // Dispatch a custom event that can be used by the custom react component to know when to open
  function callback() {
    event.target.dispatchEvent(new Event(searchOpenEventName, { bubbles: true }));
  }
  if (appLoaded) {
    callback();
  } else {
    onAppLoadedEvents.push(callback);
  }
}

/**
 * Adds a click handler to the Aurora search Icon
 *
 * @param searchElement the search icon element
 */
function addSearchIconClickHandler(searchElement = document.querySelector(searchElementSelector)) {
  searchElement.addEventListener('click', clickHandler);
  searchElement.dataset.grazittisearch = 'true';
}

// Debounced version
const debouncedAddSearchIconClickHandler = debounce((searchElement) => addSearchIconClickHandler(searchElement), 500);


/**
 * Applies a mutation observer to the page to watch if the search icon is added or removed so
 * we can add and remove the click handler.
 */
function applyPageObserver() {
  const observerOptions = {
    childList: true,
    subtree: true
  };

  const observer = new MutationObserver(function(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.removedNodes.forEach(removedNode => {
          if ('matches' in removedNode && removedNode.matches(searchElementWithEventSelector)) {
            removedNode.removeEventListener('click', clickHandler);
          }
        });
        mutation.addedNodes.forEach(addedNode => {
          if ('matches' in addedNode && addedNode.matches(searchElementSelector) && !addedNode.matches(searchElementWithEventSelector)) {
            debouncedAddSearchIconClickHandler(addedNode);
          }
        });
      }
    }
  });

  observer.observe(document.body, observerOptions);
}

function applyCustomAppRootLoadedObserver() {
  const observerOptions = {
    attributes: true,
    attributesFilter: ['data-loaded']
  };

  const rootElement = getOrCreateCustomReactAppRoot();
  const observer = new MutationObserver(function(mutationsList) {
    if (mutationsList[0].target.dataset.loaded === 'true') {
      appLoaded = true;
      while (onAppLoadedEvents.length > 0) {
        onAppLoadedEvents.pop()();
      }
    }
  });

  observer.observe(rootElement, observerOptions);
}

async function run() {
  getOrCreateCustomReactAppRoot();
  await addScriptLink(compiledReactAppScriptUrl, 'gz-app');

  addSearchIconClickHandler();
  applyCustomAppRootLoadedObserver();
  applyPageObserver();
}

run();
