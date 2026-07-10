import { useState } from "react";
import "./App.css";
import ColoredRow, { type ColoredRowProps } from "./components/ColoredRow";

const default_rows: ColoredRowProps[] = [
  { color: "red", counter: 0, num: 10 },
  { color: "cyan", counter: 1, num: 5 },
];

export default function App() {
  const [rows, setRows] = useState(default_rows);
  const [id_counter, setIdCounter] = useState(2);
  const [input_color, setInputColor] = useState("");
  const [input_number, setInputNumber] = useState<number | null>(null);
  // let rows_sum = 0;
  // rows.forEach((item) => (rows_sum += item.num));

  return (
    <div className="rows-container">
      {rows.map((row_data) => {
        return (
          <ColoredRow
            key={row_data.counter}
            color={row_data.color}
            counter={row_data.counter}
            num={row_data.num}
          />
        );
      })}
      <div>Сумма: {rows.reduce((acc, value) => acc + value.num, 0)}</div>
      <div className="input-row">
        <label htmlFor="number_input">Число: </label>
        <input
          id="number_input"
          value={input_number ? input_number : ""}
          onChange={(ev) =>
            setInputNumber(
              ev.target.value.length > 0 ? Number(ev.target.value) : null,
            )
          }
          type="number"
        ></input>
        <label htmlFor="color_input">Цвет:</label>
        <input
          id="color_input"
          value={input_color}
          onChange={(ev) => {
            setInputColor(ev.target.value);
          }}
          type="text"
        ></input>
        <button
          onClick={(ev) => {
            if (input_number === null) {
              alert("Число должно быть число!");
              return;
            }
            setRows([
              ...rows,
              { color: input_color, num: input_number, counter: id_counter },
            ]);
            setInputColor("");
            setInputNumber(null);
            setIdCounter((prev) => prev + 1);
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
