const CODES = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `
    <div class="cell" contenteditable>B1</div>
  `;
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `;
}

function createRow(content) {
  return `
    <div class="row">
      <div class="row-info">${content + 1}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount) //  создаем новый массив от количества колонок
    .fill("") //  заполняем пустой строчкой
    .map(toChar) // преобразовываем к символу
    .map(toColumn)
    .join(""); // соединяем в строчку

  rows.push(createRow(cols)); // делаем шапку excel

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i));
  }

  return rows.join(""); //  формирует в HTML
}
