import { AppConfig } from "./config"
import { ProductRepo } from "./repos/product_repo"

window.addEventListener("load", () => {
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
    products_repo.getAll().forEach((product) => {
        const card = card_template.content.cloneNode(true) as HTMLDivElement
        card.querySelector<HTMLParagraphElement>(".product-card-title")!!.innerText = product.name
        card.querySelector<HTMLParagraphElement>(".product-card-description")!!.innerText = product.description
        card.querySelector<HTMLDivElement>(".product-card-price")!!.innerHTML = product.price + " ₽"
        card.querySelector<HTMLDivElement>(".product-card-quantity")!!.innerText = product.quantity + " шт"
        card_container.appendChild(card)
    })
})