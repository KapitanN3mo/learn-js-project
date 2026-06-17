import { AppConfig } from "../../config"
import { ProductRepo } from "../../repos/product_repo"

function showFormStatus(status: string | null) {
    const status_tag = document.querySelector<HTMLParagraphElement>("#product-create-form-status")
    if (!status_tag) {
        return
    }
    if (status) {
        status_tag.innerText = status
    } else {
        status_tag.innerText = ""
    }
}

window.addEventListener("load", () => {
    const prod_repo = new ProductRepo(AppConfig.PRODUCT_REPO_KEY)
    // const form = document.getElementById("product-create-form") as HTMLFormElement
    const form = document.querySelector<HTMLFormElement>("#product-create-form")
    form?.addEventListener("submit", (ev) => {
        ev.preventDefault()
        const formData = new FormData(form)

        let prod_name = formData.get("name")
        if (typeof prod_name != "string" || prod_name.length == 0) {
            showFormStatus("Название товара не может быть пустым")
            return
        }

        let prod_category_id = formData.get("category_id")
        console.log(Number(prod_category_id))
        if (typeof prod_category_id != "string" || prod_category_id.length == 0 || isNaN(Number(prod_category_id))) {
            showFormStatus("ID категории должно быть числом")
            return
        }

        let prod_description = formData.get("description")
        if (typeof prod_description != "string") {
            showFormStatus("Что-то пошло не так")
            return
        }

        let prod_price = formData.get("price")
        if (typeof prod_price != "string" || isNaN(Number(prod_price))) {
            showFormStatus("Цена должна быть числом")
            return
        }

        let prod_quantity = formData.get("quantity")
        if (typeof prod_quantity != "string" || isNaN(Number(prod_quantity)) || Number(prod_quantity) <= 0) {
            showFormStatus("Количество товаров должно быть числом, большим чем ноль")
            return
        }
        const new_product = prod_repo.add({
            name: prod_name,
            category_id: Number(prod_category_id),
            price: Number(prod_price),
            quantity: Number(prod_quantity),
            description: prod_description
        })
        showFormStatus(`Товар успешно добавлен. ID: ${new_product.id}`)
        form.reset()

    })
})