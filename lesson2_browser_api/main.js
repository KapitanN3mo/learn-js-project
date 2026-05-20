window.addEventListener("load", () => {
    const mdiv = document.getElementById("my-div")

    const btn = document.getElementById("my-btn")
    const divs = document.getElementsByClassName("test-class")
    btn.addEventListener("click", () => {
        mdiv.textContent = "Привет мир!"
        mdiv.style.backgroundColor = "red"
        mdiv.style.textAlign = "center"
        // let counter = 0
        console.log(divs)
        for (let i = 0; i < divs.length; i++) {
            // divs[i].style.fontSize = `${counter * 2 + 10}px`
            divs[i].style.fontSize = `${i * 2 + 10}px`
        }
    })
})