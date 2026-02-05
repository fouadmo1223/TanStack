import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-10">
      <h2 className="text-red-500">Hell React</h2>
    </div>
  );
}

export default App;
