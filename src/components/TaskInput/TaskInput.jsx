import './TaskInput.scss'

export default function TaskInput({ inputRef, addBtnRef, handleAdd, isEditing }) {
  return (
    <form id="form" onSubmit={e => e.preventDefault()}>
      <label htmlFor="task-input">task: </label>
      <input type="text" id="task-input" name="task-input" autoFocus disabled={isEditing} ref={inputRef} />
      <button id="add-btn" disabled={isEditing} ref={addBtnRef} onClick={handleAdd}>add</button>
    </form>
  );
}

