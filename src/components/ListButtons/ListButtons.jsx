import { useState } from "react";

import './ListButtons.scss'

export default function ListButtons({ items, setItems, isEditing }) {
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAll = isChecked => {
    setItems(prevItems => prevItems.map(item => ({ ...item, isChecked: isChecked, })));
  };

  const handleToggleCheckAll = () => {
    setCheckAll(!checkAll);
    handleCheckAll(!checkAll);
  };

  const resizeBtn = () => {
    const itemsTextarea = document.querySelectorAll('#list > li > div > textarea');

    itemsTextarea.forEach(item => {
      item.style.width = '';
      item.style.height = '';
    });
  }

  const deleteAllBtn = () => setItems([]);

  return items.length > 0 && (
    <div id="list-action-container">
      <div id="check-all-container">
        <label htmlFor="check-all">mark all done</label>
        <input type="checkbox" id="check-all" checked={checkAll} disabled={isEditing} onChange={handleToggleCheckAll} />
      </div>
      <button id="resize-items" title="resize all <textarea>s" disabled={isEditing} onClick={resizeBtn}>reisze all tasks</button>
      <button id="delete-items" disabled={isEditing} onClick={deleteAllBtn}>delete all tasks</button>
      {/* @todo: add a button for removing checked tasks */}
      {/* <button id="remove-checked">remove checked tasks</button> */}
      {/* @todo: add a button for removing unchecked tasks */}
      {/* <button id="remove-unchecked">remove unchecked tasks</button> */}
      {/* @todo: add filter as search by text, index, checked, unchecked */}
    </div>
  );
}

