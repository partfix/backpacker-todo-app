import { useState } from "react";

const contextSample = [
  { id: 1, description: "Documents", quantity: 1, packed: false },
  { id: 2, description: "Clothes", quantity: 2, packed: true }
];

export default function App() {
  return (
    <div className="app">
      <Header />
      <UserForm />
      <UserPackingList />
      <UserStatus />
    </div>
  )
}

function Header() {
  return (
    <h1>BackPacker</h1>
  );
}

function UserForm() {
  // to store data from the form itself not the dom
  const [description, setDescription] = useState('');
  const [option, setOption] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newData = { description, option, packed: false, id: Date.now() }
    console.log(newData);

    setDescription('');
    setOption(1);

  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <span>What are we bringing today?</span>
      <select value={option} onChange={(e) => setOption(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
        {/*this add empty array, and render it all by looping inside the option*/}
      </select>
      <input type="text" name="text"
        placeholder="What's on your mind?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}>
      </input>
      <button>Add this</button>
    </form>
  );
}

function UserPackingList() {
  return (
    <div className="list">
      <ul>
        {contextSample.map((item) => <Item items={item} key={item.id} />)}
      </ul>
    </div>
  );
}

function Item({ items }) {
  return (
    <li>
      <span style={items.packed ? { textDecoration: "line-through" } : { textDecoration: "none" }}>
        {items.quantity} {items.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function UserStatus() {
  return (
    <footer className="stats">
      <em>You have (items) item on your list, you already packed (items) (items%)</em>
    </footer>
  )
} 