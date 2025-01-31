// imports
import { useRef, useState, useEffect } from 'react';

import TaskInput from "../../components/TaskInput/TaskInput";
import ListButtons from "../../components/ListButtons/ListButtons";
import TaskItems from "../../components/TaskItems/TaskItems";

import './App.scss';

function App() {
  // expressions
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  const addBtnRef = useRef();
  const textareaRefs = useRef({});

  const handleAdd = () => {
    const input = inputRef.current;
    const value = input.value;

    if (value === '') {
      input.focus();
      return;
    }

    setItems([...items, { id: Date.now(), value, isEditing: false, isChecked: false }]);
    input.value = '';
    input.focus();
  };

  const handleCheck = taskId => {
    setItems(prevItems => prevItems.map(item => item.id === taskId ? { ...item, isChecked: !item.isChecked } : item));
  };

  const handleEdit = taskId => {
    setItems(prevItems => prevItems.map(item => item.id === taskId ? { ...item, isEditing: true } : item));
    setIsEditing(true);
  };

  useEffect(() => {
    const editingItem = items.find(item => item.isEditing);
    if (editingItem && textareaRefs.current[editingItem.id]) {
      textareaRefs.current[editingItem.id].select();
    }
  }, [items]);

  const handleBlur = (event, taskId) => {
    setItems(prevItems => prevItems.map(item => item.id === taskId ? { ...item, value: event.target.value, isEditing: false } : item));

    setTimeout(() => {
      setIsEditing(false);
      getSelection().removeAllRanges();
    }, 300);
  };

  const handleDelete = taskId => {
    setItems(prevItems => prevItems.filter(item => item.id !== taskId));
  };

  return (
    <>
      {/* html */}
      <h1>To Do List</h1>
      <section id="task">
        <TaskInput inputRef={inputRef} addBtnRef={addBtnRef} handleAdd={handleAdd} isEditing={isEditing} />
        <ListButtons items={items} setItems={setItems} isEditing={isEditing} />
      </section>
      <TaskItems items={items} textareaRefs={textareaRefs} isEditing={isEditing}
        handleBlur={handleBlur} handleCheck={handleCheck} handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
  );
}

export default App;

