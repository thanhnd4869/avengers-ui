import "./App.css";

function App() {
  return (
    <main className="app">
      <h1 className="app__title">{process.env.WEBPACK_APP_NAME}</h1>
    </main>
  );
}

export default App;
