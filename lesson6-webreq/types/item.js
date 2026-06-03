export class BaseUser {
    constructor(name, description, price, quantity) {
        this.name = name
        this.description = description
        this.price = price
        this.quantity = quantity
    }
}

export class User extends BaseUser {
    constructor(id, name, description, price, quantity) {
        super(name, description, price, quantity)
        this.id = id

    }
}

export class CreateUser extends BaseUser {
    constructor(name, description, price, quantity) {
        super(name, description, price, quantity)
    }
}