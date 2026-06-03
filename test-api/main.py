from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from uuid import UUID, uuid4

# Инициализация приложения
app = FastAPI(
    title="Item API",
    description="Простое REST API для управления объектами Item",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Модель данных для создания/обновления объекта
class ItemCreate(BaseModel):
    name: str = Field(
        ..., min_length=1, max_length=100, description="Название предмета"
    )
    description: Optional[str] = Field(None, max_length=500, description="Описание")
    price: float = Field(..., gt=0, description="Цена (должна быть больше 0)")
    quantity: int = Field(..., ge=0, description="Количество на складе")


# Модель для ответа (включает ID)
class ItemResponse(ItemCreate):
    id: UUID = Field(..., description="Уникальный идентификатор")


# Модель для обновления (все поля необязательны)
class ItemUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)


# "База данных" в памяти
items_db: dict[UUID, ItemResponse] = {}

# --- CRUD операции ---


@app.post(
    "/items/",
    response_model=ItemResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать новый предмет",
)
async def create_item(item: ItemCreate):
    """Создает новый предмет и возвращает его с присвоенным ID"""
    item_id = uuid4()
    new_item = ItemResponse(id=item_id, **item.dict())
    items_db[item_id] = new_item
    return new_item


@app.get("/items/", response_model=List[ItemResponse], summary="Получить все предметы")
async def get_all_items():
    """Возвращает список всех предметов"""
    return list(items_db.values())


@app.get(
    "/items/{item_id}", response_model=ItemResponse, summary="Получить предмет по ID"
)
async def get_item(item_id: UUID):
    """Возвращает предмет с указанным ID"""
    item = items_db.get(item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_id} not found",
        )
    return item


@app.put(
    "/items/{item_id}",
    response_model=ItemResponse,
    summary="Полностью обновить предмет",
)
async def update_item(item_id: UUID, item_update: ItemCreate):
    """Полностью заменяет данные предмета с указанным ID"""
    if item_id not in items_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_id} not found",
        )

    updated_item = ItemResponse(id=item_id, **item_update.dict())
    items_db[item_id] = updated_item
    return updated_item


@app.patch(
    "/items/{item_id}", response_model=ItemResponse, summary="Частично обновить предмет"
)
async def patch_item(item_id: UUID, item_update: ItemUpdate):
    """Обновляет только указанные поля предмета"""
    if item_id not in items_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_id} not found",
        )

    current_item = items_db[item_id]
    update_data = item_update.dict(exclude_unset=True)

    # Обновляем только переданные поля
    for field, value in update_data.items():
        setattr(current_item, field, value)

    items_db[item_id] = current_item
    return current_item


@app.delete(
    "/items/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить предмет",
)
async def delete_item(item_id: UUID):
    """Удаляет предмет с указанным ID"""
    if item_id not in items_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_id} not found",
        )

    del items_db[item_id]
    return None  # 204 No Content не возвращает тело


# --- Дополнительные эндпоинты ---


@app.get(
    "/items/search/",
    response_model=List[ItemResponse],
    summary="Поиск предметов по имени",
)
async def search_items(name: str, min_price: Optional[float] = None):
    """Ищет предметы по имени (частичное совпадение) и опционально по минимальной цене"""
    results = []
    for item in items_db.values():
        if name.lower() in item.name.lower():
            if min_price is None or item.price >= min_price:
                results.append(item)
    return results


@app.get("/items/stats/total-value", summary="Общая стоимость всех предметов")
async def get_total_value():
    """Возвращает общую стоимость всех предметов на складе (цена * количество)"""
    total = sum(item.price * item.quantity for item in items_db.values())
    return {"total_value": round(total, 2)}


# Запуск приложения (если файл запущен напрямую)
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=9465)
