import './TaskItems.scss';

export default function TaskItem({ items, textareaRefs, handleBlur, isEditing, handleCheck, handleEdit, handleDelete }) {
  return (
    <ol id="list">
      {items.map(item => (
        <li key={item.id} data-check={item.isChecked ? "checked" : ""}>
          <div>
            {item.isEditing ? (
              <textarea defaultValue={item.value}
                ref={el => (textareaRefs.current[item.id] = el)} onBlur={e => handleBlur(e, item.id)} />
            ) : (
              <textarea defaultValue={item.value}
                readOnly disabled />
            )}
            <div className="item-action-container">
              <input type="checkbox" name="item-action-check" className="item-action item-action-check"
                checked={item.isChecked} disabled={isEditing} onChange={() => handleCheck(item.id)} />
              <button className="item-action item-action-edit" disabled={isEditing} onClick={() => handleEdit(item.id)}>edit</button>
              <button className="item-action item-action-delete" disabled={isEditing} onClick={() => handleDelete(item.id)}>delete</button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

