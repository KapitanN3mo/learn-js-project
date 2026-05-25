const products = Array.of(
    { "id": 1, "name": "Смартфон Galaxy A15", "category": "Электроника", "price": 15999.99, "stock": 45, "rating": 4.3, "inStock": true },
    { "id": 2, "name": "Ноутбук Aspire 5", "category": "Электроника", "price": 42990.00, "stock": 12, "rating": 4.7, "inStock": true },
    { "id": 3, "name": "Беспроводные наушники WaveBuds", "category": "Аксессуары", "price": 2499.00, "stock": 120, "rating": 4.5, "inStock": true },
    { "id": 4, "name": "Футболка хлопок белая", "category": "Одежда", "price": 899.99, "stock": 0, "rating": 4.1, "inStock": false },
    { "id": 5, "name": "Кроссовки RunMax Pro", "category": "Обувь", "price": 5499.00, "stock": 23, "rating": 4.8, "inStock": true },
    { "id": 6, "name": "Умная колонка Echo Dot", "category": "Электроника", "price": 3990.00, "stock": 8, "rating": 4.6, "inStock": true },
    { "id": 7, "name": "Рюкзак городской 20л", "category": "Спорт и туризм", "price": 2790.00, "stock": 34, "rating": 4.4, "inStock": true },
    { "id": 8, "name": "Электрическая зубная щетка CleanPro", "category": "Здоровье", "price": 3290.00, "stock": 17, "rating": 4.2, "inStock": true },
    { "id": 9, "name": "Книга 'Искусство программирования'", "category": "Книги", "price": 1850.00, "stock": 5, "rating": 4.9, "inStock": true },
    { "id": 10, "name": "Чехол для iPhone 15 силикон", "category": "Аксессуары", "price": 790.00, "stock": 60, "rating": 4.0, "inStock": true },
    { "id": 11, "name": "Монитор 24\" Full HD", "category": "Электроника", "price": 11999.00, "stock": 9, "rating": 4.5, "inStock": true },
    { "id": 12, "name": "Мышь беспроводная LogiTech", "category": "Аксессуары", "price": 1590.00, "stock": 42, "rating": 4.6, "inStock": true },
    { "id": 13, "name": "Джинсы классические синие", "category": "Одежда", "price": 2999.00, "stock": 28, "rating": 4.3, "inStock": true },
    { "id": 14, "name": "Термос 0.5л нерж.", "category": "Спорт и туризм", "price": 1290.00, "stock": 53, "rating": 4.4, "inStock": true },
    { "id": 15, "name": "Смарт-часы FitBand 5", "category": "Электроника", "price": 5490.00, "stock": 19, "rating": 4.7, "inStock": true },
    { "id": 16, "name": "Шапка зимняя вязаная", "category": "Одежда", "price": 1199.00, "stock": 11, "rating": 4.2, "inStock": true },
    { "id": 17, "name": "Внешний SSD 1TB", "category": "Электроника", "price": 7990.00, "stock": 6, "rating": 4.8, "inStock": true },
    { "id": 18, "name": "Набор кухонных ножей 3шт", "category": "Дом", "price": 2390.00, "stock": 0, "rating": 4.0, "inStock": false },
    { "id": 19, "name": "Коврик для йоги", "category": "Спорт и туризм", "price": 1990.00, "stock": 37, "rating": 4.3, "inStock": true },
    { "id": 20, "name": "Зарядное устройство 65W GaN", "category": "Аксессуары", "price": 2490.00, "stock": 21, "rating": 4.5, "inStock": true },
    { "id": 21, "name": "Пылесос робот CleanRoom X", "category": "Дом", "price": 18990.00, "stock": 4, "rating": 4.9, "inStock": true },
    { "id": 22, "name": "Толстовка с капюшоном", "category": "Одежда", "price": 3499.00, "stock": 14, "rating": 4.4, "inStock": true },
    { "id": 23, "name": "Кофеварка капсульная", "category": "Дом", "price": 6990.00, "stock": 7, "rating": 4.6, "inStock": true },
    { "id": 24, "name": "Фитнес-бутылка 1л", "category": "Спорт и туризм", "price": 590.00, "stock": 88, "rating": 4.1, "inStock": true },
    { "id": 25, "name": "Микрофон USB Podcast", "category": "Электроника", "price": 4590.00, "stock": 13, "rating": 4.3, "inStock": true },
    { "id": 26, "name": "Шарф кашемировый", "category": "Одежда", "price": 2590.00, "stock": 0, "rating": 4.7, "inStock": false },
    { "id": 27, "name": "Игра PS5 'Racing Legends'", "category": "Игры", "price": 3990.00, "stock": 19, "rating": 4.5, "inStock": true },
    { "id": 28, "name": "Подставка для ноутбука", "category": "Аксессуары", "price": 1290.00, "stock": 65, "rating": 4.2, "inStock": true },
    { "id": 29, "name": "Пауэрбанк 20000mAh", "category": "Аксессуары", "price": 2790.00, "stock": 31, "rating": 4.6, "inStock": true },
    { "id": 30, "name": "Шорты спортивные", "category": "Одежда", "price": 1299.00, "stock": 44, "rating": 4.3, "inStock": true },
    { "id": 31, "name": "Весы кухонные электронные", "category": "Дом", "price": 1190.00, "stock": 26, "rating": 4.4, "inStock": true },
    { "id": 32, "name": "Клавиатура механическая", "category": "Аксессуары", "price": 6490.00, "stock": 10, "rating": 4.8, "inStock": true },
    { "id": 33, "name": "Набор полотенец 4шт", "category": "Дом", "price": 1990.00, "stock": 39, "rating": 4.1, "inStock": true },
    { "id": 34, "name": "Гантели 2x5 кг", "category": "Спорт и туризм", "price": 3490.00, "stock": 8, "rating": 4.5, "inStock": true },
    { "id": 35, "name": "Кроссовки детские", "category": "Обувь", "price": 2990.00, "stock": 0, "rating": 4.2, "inStock": false },
    { "id": 36, "name": "Портативная колонка SoundMini", "category": "Электроника", "price": 3590.00, "stock": 22, "rating": 4.4, "inStock": true },
    { "id": 37, "name": "Органайзер для проводов", "category": "Аксессуары", "price": 390.00, "stock": 112, "rating": 4.0, "inStock": true },
    { "id": 38, "name": "Стул компьютерный", "category": "Дом", "price": 11990.00, "stock": 5, "rating": 4.6, "inStock": true },
    { "id": 39, "name": "Кепка бейсболка", "category": "Одежда", "price": 790.00, "stock": 56, "rating": 4.1, "inStock": true },
    { "id": 40, "name": "USB флешка 64GB", "category": "Электроника", "price": 690.00, "stock": 200, "rating": 4.3, "inStock": true },
    { "id": 41, "name": "Лыжи беговые", "category": "Спорт и туризм", "price": 7990.00, "stock": 3, "rating": 4.7, "inStock": true },
    { "id": 42, "name": "Набор свечей ароматных", "category": "Дом", "price": 1490.00, "stock": 48, "rating": 4.5, "inStock": true },
    { "id": 43, "name": "Фен для волос ProStyle", "category": "Здоровье", "price": 4290.00, "stock": 14, "rating": 4.2, "inStock": true },
    { "id": 44, "name": "Конструктор LEGO City", "category": "Игры", "price": 4990.00, "stock": 9, "rating": 4.9, "inStock": true },
    { "id": 45, "name": "Тостер 2 слота", "category": "Дом", "price": 2490.00, "stock": 18, "rating": 4.3, "inStock": true },
    { "id": 46, "name": "Носки термо 3 пары", "category": "Одежда", "price": 990.00, "stock": 73, "rating": 4.2, "inStock": true },
    { "id": 47, "name": "Мыло жидкое алоэ", "category": "Здоровье", "price": 290.00, "stock": 140, "rating": 4.1, "inStock": true },
    { "id": 48, "name": "Подвесной светильник", "category": "Дом", "price": 3890.00, "stock": 6, "rating": 4.5, "inStock": true },
    { "id": 49, "name": "Велосипед горный 26\"", "category": "Спорт и туризм", "price": 24990.00, "stock": 2, "rating": 4.8, "inStock": true },
    { "id": 50, "name": "Брелок с фонариком", "category": "Аксессуары", "price": 190.00, "stock": 315, "rating": 3.9, "inStock": true }
)
const high_rating_products = products.filter((item) => item.rating >= 4.2)
console.log(`High rating products: ${high_rating_products}`)
products.filter((item) => item.rating >= 4.2).forEach((filtered) => console.log(filtered))

// Задание №2
products.filter((item) => item.category === "Дом" || item.category === "Игры")
    .forEach((f) => console.log(`ID: ${f.id} ${f.name} - ${f.price}`))

// Задание №3
products.forEach((item) => console.log(`${item.price} ${item.price * 0.8}`))
