import { useEffect } from "react";
import { useState } from "react";

const messages = [
  { id: 0, author_name: "Антон", content: "Привет! Как дела?" },
  { id: 1, author_name: "Сергей", content: "Отлично! Пока живой" },
  {
    id: 2,
    author_name: "Антон",
    content: "Не хочешь завтра поехать на шашлыки?",
  },
  { id: 3, author_name: "Сергей", content: "Отличная идея" },
];

function App() {
  return <div className="app-container"></div>;
}

export default App;
