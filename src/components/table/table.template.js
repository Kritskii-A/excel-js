const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row, col) {
  return `
    <div 
      class="cell" 
      data-col="${col}" 
      data-id="${row}:${col}" 
      data-type="cell"
      contenteditable
    ></div>
  `;
}

// function toCell(row) {
//   return function (_, col) {
//     return `
//     <div class="cell" data-col="${col}" data-row="${row}" contenteditable></div>
//   `;
//   };
// }

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ""}
        ${resize}
      </div>
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

  rows.push(createRow(null, cols)); // делаем шапку excel

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("") //  заполняем пустой строчкой
      .map((_, col) => toCell(row, col)) // формируем
      // .map(toCell(row))  //  способ изящнее
      .join(""); // преобразовываем в строку

    rows.push(createRow(row + 1, cells));
  }

  return rows.join(""); //  формирует в HTML
}
