from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    _id: int
    name: str
    age: int


class BaseUserRepository:
    def get(self, _id: int) -> Optional[User]:
        raise NotImplementedError()

    def find_by_name(self, name: str) -> list[User]:
        raise NotImplementedError()

class ApiUserRepository(BaseUserRepository):
    ge


class SqlLiteUserRepo(BaseUserRepository):
    def get(self, _id: int) -> User | None:
        curs