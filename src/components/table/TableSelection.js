export class TableSelection {
  static className = "selected";
  constructor() {
    this.group = [];
    this.current = null;
  }

  //    $el instanceof DOM === true
  select($el) {
    //  обнуляем список выбранных ячеек
    this.clear();
    //  добавляем выбранную ячейку
    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  clear() {
    //  обнуляем список выбранных ячеек
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  get selectedIds() {
    return this.group.map(($el) => $el.id());
  }

  selectGroup($group = []) {
    //  очищаем имеющиеся выделения ячеек
    this.clear();

    //  записываем текущую группу ячеек
    this.group = $group;
    //  выделяем ячейки
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
