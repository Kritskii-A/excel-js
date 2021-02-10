export class TableSelection {
  static className = "selected";
  constructor() {
    this.group = [];
  }

  //    $el instanceof DOM === true
  select($el) {
    //  обнуляем список выбранных ячеек
    this.clear();
    //  добавляем выбранную ячейку
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  clear() {
    //  обнуляем список выбранных ячеек
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }
  selectGroup() {}
}
