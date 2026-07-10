export type ColoredRowProps = {
  counter: number;
  num: number;
  color: string;
};

export default function ColoredRow({ counter, num, color }: ColoredRowProps) {
  return (
    <div className="colored_row_container" style={{ backgroundColor: color }}>
      <div>ID: {counter}</div>
      <div className="colored-row-number">Число: {num}</div>
    </div>
  );
}
