import { StringRepo } from "./repos/string_repo.js"

const STRING_KEY = "my-string"
const repo = new StringRepo(STRING_KEY)

function updateList(list_root) {
    let items = repo.getAll()
    console.log(items)
    let content = ""
    if (items !== null) {
        items.forEach((item, index) => { content += `<li ${(index == (items.length - 1)) ? 'id="last-item"' : ""}>${item}</li>` })
        list_root.innerHTML = content
        document.getElementById("last-item").scrollIntoView({
            "behavior": "smooth"
        })
    }
}

window.addEventListener("load", () => {
    const input_field = document.getElementById("text-input")
    const save_btn = document.getElementById("save-btn")
    const field = document.getElementById("strings-field")
    updateList(field)

    save_btn.addEventListener("click", () => {
        repo.add(input_field.value)
        updateList(field)
    })

    let add_m_btn = document.getElementById("add-multiply-btn")
    add_m_btn.addEventListener("click", () => {
        let base_name = input_field.value
        let counter = 0
        let timer_id = setInterval(() => {
            repo.add(`${base_name}_${counter++}`)
            updateList(field)
            if (counter == 10) {
                clearInterval(timer_id)
            }
        }, 1000)
    })
})