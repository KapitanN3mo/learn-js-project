import { ItemRepo } from "./repos/item-repo.js"

const BASE_API_URL = "http://127.0.0.1:9465"

const itemRepo = new ItemRepo(BASE_API_URL)

window.addEventListener("load", () => {
    const form = document.getElementById("item-create-form")
    const resp_res = document.getElementById("response-result")
    itemRepo.getAll().then((items) => {
        resp_res.innerText = JSON.stringify(items)
    })
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()
        let form_data = new FormData(form)
        let item_body = {
            name: form_data.get("name"),
            description: form_data.get("description"),
            price: form_data.get("price"),
            quantity: form_data.get("quantity")
        }
        fetch(`${BASE_API_URL}/items`,
            {
                body: JSON.stringify(item_body),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then((resp) => resp.text()).then((data) => { resp_res.innerText = data })
    })
})