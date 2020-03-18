// Snippets examples
document.addEventListener("DOMContentLoaded", pushBodyDown);

function pushBodyDown() {
    setTimeout(function() {
        //  .. by adding a class with padding-top
        document.body.className = "padding-top";
        //  .. by adding style directly to the element
        // document.body.style.paddingTop = "10rem";
        //  .. by iserting a div with padding before element
        // let newDiv = document.createElement("div");
        // newDiv.className = "padding-top";
        // document.body.parentElement.insertBefore(newDiv, document.body);
    }, 5000);
}
