let CurrentPage = "Welcome!"

function OpenPage(PageName) {
    if (CurrentPage == PageName) {return;}
    CurrentPage = PageName

    for (const Page of document.getElementsByClassName("Page")) {
        Page.style.display = "none"
    }

    document.getElementById(PageName).style.display = "inherit";
    document.getElementById("Content").animate(
        [{ transform: "scaleY(0%)" }, { transform: "scaleY(100%)" }],
        { duration: 200, easing: "ease-out" }
    )

    document.getElementById("Content").firstElementChild.innerHTML = "*" + PageName

    const ClickSound = new Audio("Assets/smileOSclick3.wav")
    ClickSound.volume = 0.2
    ClickSound.play()
}