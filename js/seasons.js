
const bg1button = document.querySelector('#bg1button');
const bg2button = document.querySelector('#bg2button');
let body = document.getElementsByTagName("body")[0];


bg1button.addEventListener('click', function () {
    body.classList.add("bg1class");
});

bg2button.addEventListener('click', function () {
    body.classList.add("bg2class");
});

bg3button.addEventListener('click', function () {
    body.classList.add("bg3class");
});

bg4button.addEventListener('click', function () {
    body.classList.add("bg4class");
});

function removeAllClasses() {
    var elements = document.querySelectorAll("body");
    elements.forEach(function (el) {
        el.removeAttribute("class");
    });
}