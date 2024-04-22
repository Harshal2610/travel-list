import { useState } from "react";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

function App() {
  const [items, setItems] = useState([]);
  function handelClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete the list"
    );
    if (confirmed) setItems([]);
  }
  function handelItems(item) {
    setItems((items) => [...items, item]);
  }

  function handelDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handelToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onItemChange={handelItems} />
      <PackingList
        items={items}
        onItemDelete={handelDeleteItem}
        onToggleItem={handelToggleItem}
        onClearList={handelClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        You have to start adding items to your packinng list.
      </p>
    );
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItems / totalItems) * 100);
  return (
    <footer className="stats">
      {packedPercentage === 100
        ? "You got everything to go ✈"
        : `You have ${totalItems} items on your list, and you have packed
      ${packedItems} (${packedPercentage}%)`}
    </footer>
  );
}
export default App;
