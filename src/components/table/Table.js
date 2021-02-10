import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";
import { createTable } from "@/components/table/table.template";
import { resizeHandler } from "@/components/table/table.resize";
import {
  shouldResize,
  isCell,
  matrix,
} from "@/components/table/table.functions";
import { TableSelection } from "@/components/table/TableSelection";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable(40);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init(); //  вызываем базовые составляющие

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute("data-resize"));
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        //  получаем ДОМ элементы выделенных ячеек
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );

        //  отображаем выделенные ячейки
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
}
