import { range } from "@core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === "cell";
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  //  получаем диапазон ячеек
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  //  формируем их в единый массив
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}
