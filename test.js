// Logging?
let log = false;
// Target
let sTarget = "#test";
let eTarget = document.querySelector(sTarget);
let rTarget = {
    x: eTarget.getBoundingClientRect().x,
    y: eTarget.getBoundingClientRect().y
};
// Get all parents of target
let eTargetParents = [];
if (!eTarget.parentElement) {
    if (log) console.log("target has no parent elements...");
    eTargetParents = null;
} else {
    let t = eTarget;
    while (t.parentElement) {
        if (log) console.log(`target has a parent element...`);
        if (log) console.info(t.parentElement);
        eTargetParents.push(t.parentElement);
        t = t.parentElement;
    }
}
let rElements = [];
for (let i = 0; i < eTargetParents.length; i++) {
    let rect = {
        x: eTargetParents[i].getBoundingClientRect().x,
        y: eTargetParents[i].getBoundingClientRect().y
    };
    rElements.push({
        element: eTargetParents[i],
        rect: rect
    });
}
if (rElements.length > 0) {
    if (log) console.info(rElements);
}
document.addEventListener("DOMContentLoaded", function() {
    startTimers();
});

function getRect(el) {
    return el.getBoundingClientRect();
}

function startTimers() {
    startTimer(rTarget, eTarget);
    for (let i = 0; i < rElements.length; i++) {
        startTimer(rElements[i].rect, rElements[i].element);
    }
}

function startTimer(reference, element) {
    setTimeout(checkRect.bind(null, reference, element), 1000);
}

function checkRect(reference, element) {
    if (reference.x != getRect(element).x || reference.y != getRect(element).y) {
        console.log(`Element: ${element}  -  Rect: (x: ${reference.x}, y: ${reference.y})  -  HAS MOVED!`);
        console.log(`New rect: (x: ${getRect(element).x}, y: ${getRect(element).y})`);
    } else {
        if (log) console.log(`Element: ${element}  -  has NOT moved...`);
        startTimer(reference, element);
    }
}
