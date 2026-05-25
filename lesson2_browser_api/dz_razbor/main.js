window.addEventListener("load", () => {
    const widgets = document.getElementsByClassName("counter-widget")
    for (let i = 0; i < widgets.length; i++) {
        const widget = widgets[i]
        let value = 0
        let counter_value = document.createElement("h1")
        let btn_container = document.createElement("div")
        btn_container.classList.add("btn-container")
        widget.appendChild(counter_value)
        widget.appendChild(btn_container)
        counter_value.innerText = value
        let numbers = Array.of(-1000, -100, -10, -1, 1, 10, 100, 1000)
        numbers.forEach((num) => {
            let btn = document.createElement("button")
            btn_container.appendChild(btn)
            btn.innerText = num
            btn.addEventListener("click", () => {
                value += num
                counter_value.innerText = value
            })
        })
    }
})