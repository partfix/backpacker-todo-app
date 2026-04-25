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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <span>What are we bringing today?</span>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
      </select>
      <input type="text" name="text" placeholder="What's on your mind?"></input>
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
