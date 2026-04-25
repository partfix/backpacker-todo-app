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
  return (
    <form className="add-form">
      <span>What are we bringing today?</span>
      <select>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </form>
  );
}

function UserPackingList() {
  return (
    <div className="list">
      <ul>
        {contextSample.map((item) => <Item items={item} />)}
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
