window.addEventListener("load", () => {
    const form = document.getElementById("user-info")
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()
        const formData = new FormData(form)
        let name = formData.get("name")
        let sex = formData.get("sex")
        let hobby = formData.getAll("hobby").join(", ")
        let country = formData.get("country")
        console.log(`Имя: ${name}, Пол: ${sex}, Хобби: ${hobby}, Страна: ${country}`)
    })

    const range_input = document.getElementById("form-range")
    range_input.addEventListener("input", (ev) => {
        // console.log(ev.target.value)
        range_input.parentElement.style.backgroundColor = `hsl(${ev.target.value}deg 100% 50%)`
    })
})