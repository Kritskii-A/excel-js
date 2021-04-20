import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";
import { toInlineStyles } from "../../core/utils";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function toCell(state, row) {
  return (_, col) => {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
    <div 
      class="cell" 
      data-col="${col}" 
      data-id="${id}" 
      data-type="cell"
      contenteditable
      data-value="${data || ""}"
      style="${styles}; width: ${width}"
    >${parse(data) || ""}</div>
  `;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, state) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  const height = getHeight(state, index);
  return `
    <div class="row" data-type="resizable" style="height: ${height}" data-row="${index}">
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

function withWidthFrom(state) {
  return (col, index) => {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount) //  создаем новый массив от количества колонок
    .fill("") //  заполняем пустой строчкой
    .map(toChar) // преобразовываем к символу
    .map(withWidthFrom(state))
    .map(toColumn)
    .join(""); // соединяем в строчку

  rows.push(createRow(null, cols, {})); // делаем шапку excel

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("") //  заполняем пустой строчкой
      .map(toCell(state, row)) //  способ изящнее
      .join(""); // преобразовываем в строку

    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join(""); //  формирует в HTML
}
