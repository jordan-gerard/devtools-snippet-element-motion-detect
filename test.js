// Logging?
let log = false;
// Target
let sTarget = "#test";
// Prevent further execution if target is not found
if (!document.querySelector(sTarget)) {
  // creates a new exception type:
  function FatalError() {
    Error.apply(this, arguments);
    this.name = "FatalError";
  }
  FatalError.prototype = Object.create(Error.prototype);

  // and then, use this to trigger the error:
  throw new FatalError("Element not found.");
}

// Main object with target, sibling, and parent data
let oTarget = {
  element : document.querySelector(sTarget),
  rect    : {
    x: document.querySelector(sTarget).getBoundingClientRect().x,
    y: document.querySelector(sTarget).getBoundingClientRect().y
  },
  parents : [],
  siblings: []
};
// Get all parents of target
if (!oTarget.element.parentElement) {
  if (log) 
    console.log(`${oTarget.element} has no parent elements...`);
  }
else {
  let {element} = oTarget;
  while (element.parentElement) {
    if (log) 
      console.log(`${element} has a parent element...`);
    if (log) 
      console.info(element.parentElement);
    oTarget.parents.push({
      element: element.parentElement,
      rect   : {
        x: element.parentElement.getBoundingClientRect().x,
        y: element.parentElement.getBoundingClientRect().y
      }
    });
    element = element.parentElement;
  }
}
// Get all siblings of target
if (!oTarget.element.parentElement) {
  if (log) 
    console.log(`${oTarget.element} has no parent element, cannot determine siblings (likely has none as it is the HTML root element)...`)
} else {
  let element = oTarget.element.parentElement.firstElementChild;
  while (element) {
    if (element !== oTarget.element) {
      if (log) 
        console.log(`${element} is a sibling element...`);
      if (log) 
        console.info(element);
      oTarget.siblings.push({
        element,
        rect: {
          x: element.getBoundingClientRect().x,
          y: element.getBoundingClientRect().y
        }
      });
      element = element.nextElementSibling;
    } else {
      break;
    }
  }
}

// Run timers after DOM has loaded
document.addEventListener("DOMContentLoaded", function() {
  startTimers();
});

// Timer functions
//

// Begins all timers (after DOM loads)
function startTimers() {
  // Self first
  startTimer(oTarget.rect, oTarget.element);
  // Siblings
  for (let i = 0; i < oTarget.siblings.length; i++) {
    startTimer(oTarget.siblings[i].rect, oTarget.siblings[i].element);
  }
  // Parents
  for (let i = 0; i < oTarget.parents.length; i++) {
    startTimer(oTarget.parents[i].rect, oTarget.parents[i].element);
  }
}

// (re)Starts a specific timer
function startTimer(reference, element) {
  setTimeout(checkRect.bind(null, reference, element), 1000);
}

// Helper functions
//

// Returns current rectangle
function getRect(el) {
  return el.getBoundingClientRect();
}

// Checks if reference rectangle is the same as target rectangle
function checkRect(reference, element) {
  if (reference.x != getRect(element).x || reference.y != getRect(element).y) {
    console.groupCollapsed(`${element}`);
    console.log(element);
    console.log(`Old rect: (x: ${reference.x}, y: ${reference.y})  |  New rect: (x: ${getRect(element).x}, y: ${getRect(element).y})`);
    console.groupEnd();
  } else {
    if (log) 
      console.log(`Element: ${element}  -  has NOT moved...`);
    startTimer(reference, element);
  }
}
