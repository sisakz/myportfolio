import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState(null);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      "https://shrouded-sea-88824.herokuapp.com/https://www.bamosz.hu/alapoldal?isin=HU0000702758"
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setValue(getCurrentValueOfMyPortfolio(data));
      });
  }, []);
  return <div className="App">{value}</div>;
}

export default App;

const getCurrentValueOfMyPortfolio = (htmlInput) => {
  const inputwlb = htmlInput.replace(/\r?\n|\r/g, "");
  const inputwlb2 = inputwlb.replace(/\s+/g, "");

  const start = inputwlb2.indexOf('Árfolyam:</td><tdclass="data">');
  const rate = Number(
    inputwlb2.substring(start + 30, start + 36).replace(",", ".")
  );
  const packet = 1820543;
  return Math.round(packet * rate).toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",
  });
};
