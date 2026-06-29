import { AppConfig } from "./config"
import { CategoryRepo } from "./repos/category_repo"
import { ProductRepo } from "./repos/product_repo"
import { hash, validate } from "./services/security"

window.addEventListener("load", async () => {
    const res = await hash("hello world", "test")
    console.log(`Result: ${res}`)
    const check_res = await validate("hello world", res);
    console.log(check_res)
    const card_template = document.querySelector<HTMLTemplateElement>("#product-card-template")
    if (!card_template) {
        console.warn("Не удалось найти шаблон карточки товара")
        return
    }
    const card_container = document.querySelector<HTMLDivElement>("#catalog-container")
    if (!card_container) {
        return
    }
    const products_repo = new ProductRepo(AppConfig.PRODUCT_REPO_KEY)
    const category_repo = new CategoryRepo(AppConfig.CATEGORY_REPO_KEY)
    products_repo.getAll().forEach((product) => {
        const card = card_template.content.cloneNode(true) as HTMLDivElement
        if (product.image) {
            card.querySelector<HTMLImageElement>(".product-card-image")!!.src = product.image
        }
        card.querySelector<HTMLParagraphElement>(".product-card-title")!!.innerText = product.name
        const category = category_repo.get(product.category_id)
        if (category) {
            card.querySelector<HTMLDivElement>(".product-card-category")!!.innerText = category.name
        }
        card.querySelector<HTMLParagraphElement>(".product-card-description")!!.innerText = product.description
        card.querySelector<HTMLDivElement>(".product-card-price")!!.innerHTML = product.price + " ₽"
        card.querySelector<HTMLDivElement>(".product-card-quantity")!!.innerText = `В наличии: ${product.quantity} шт`
        card_container.appendChild(card)
    })
})