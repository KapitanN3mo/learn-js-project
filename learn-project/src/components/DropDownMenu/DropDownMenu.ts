import dd_menu from "./DropDownMenu.html?raw";
import dd_menu_css from "./DropDownMenu.css?raw"

interface dd_item {
    value: string
    onclick: (ev: Event) => void
};

export class DropDownMenu {
    items: dd_item[] = []

    constructor() {
        if (!document.getElementById("ddm-template")) {
            let tags = document.getElementsByTagName("body")
            if (tags.length != 1) {
                console.warn("Несколько body на одной странице")
                return
            }
            tags[0].insertAdjacentHTML("beforeend", dd_menu)
            tags[0].insertAdjacentHTML("beforeend", `<style>${dd_menu_css}</style>`)
        }
    }

    add_item(value: string, callback: (ev: Event) => void) {
        this.items.push({ value, onclick: callback })
    }

    erase() {
        this.items.length = 0
    }

    render(root: HTMLElement) {
        const dd_container_template = document.querySelector<HTMLTemplateElement>("#ddm-template")
        const dd_item_template = document.querySelector<HTMLTemplateElement>("#ddm-item-template")
        if (!dd_container_template || !dd_item_template) {
            console.log("Не удалось найти шаблон ddm_container")
            return
        }
        const cont = dd_container_template.content.cloneNode(true)
        this.items.forEach((item) => {
            const item_obj = dd_item_template.content.cloneNode(true) as HTMLDivElement
            item_obj.querySelector<HTMLDivElement>(".ddm-item-value")!!.innerText = item.value
            item_obj.onclick = item.onclick
            cont.appendChild(item_obj)
        })
        root.innerHTML = ""
        root.appendChild(cont)
    }
}
