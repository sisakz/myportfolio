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
  const baseRate = 3.8426
  const rate = Number(
    inputwlb2.substring(start + 30, start + 36).replace(",", ".")
  );
  const date1 = new Date("05/30/2022");
  const date2 = new Date();
  const differenceInTime = date2.getTime() - date1.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const yearlyRateBenefit = Math.round(((rate/baseRate - 1)/differenceInDays) * 365 * 10000) / 100;
  const packet = 1820543;
  const currentValue = Math.round(packet * rate) ;
  const currentValueToString = currentValue.toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",
  });
  
  return (
    <>
      <h1>Raiffeisen Kamat Prémium Rövid Kötvény Alap</h1>
      <div>Eltelt napok száma a befektetés kezdete óta: {differenceInDays}</div>
      <div>Éves hozam százalékban: {yearlyRateBenefit}%</div>
      <div>Aktuális érték:</div>
      <h1>
        {currentValueToString}
      </h1>
      <div>
        <a href="https://www.bamosz.hu/alapoldal?isin=HU0000702758">Bamosz</a>
      </div>
    </>
 )
};
