var btn = document.querySelector("button");

btn.addEventListener("click", () => {
    // var body_bg = document.body.style.background;
    // if (document.body.style.background === 'purple') {
    //     document.body.style.background = 'white';
    // } else {
    //     document.body.style.background = 'purple';
    // }

    document.body.classList.toggle('purple');
});