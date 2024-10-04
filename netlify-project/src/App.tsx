import { useState } from "react";
import "./App.css";

function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState("");

  const handleConvert = async () => {
    try {
      const response = await fetch(
        `/.netlify/functions/convert-currency?from=${from}&to=${to}&amount=${amount}`
      );
      const data = await response.json();
      setResult(`${amount} ${from} = ${data.convertedAmount} ${to}`);
    } catch (error) {
      setResult("Error: Unable to convert currency.");
    }
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div>
        <label>
          From:
          <input value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          To:
          <input value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
      </div>
      <button onClick={handleConvert}>Convert</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
