import "./App.css";
import { useEffect, useState } from "react";

const investedAmount = 7000000
const startOfInvestingDate = new Date("05/30/2022");

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
  
  const ActualDate = new Date();
  const investingPeriodInTime = ActualDate.getTime() - startOfInvestingDate.getTime();
  const investingPeriodInDay = Math.floor(investingPeriodInTime / (1000 * 3600 * 24));
  const yearlyRateBenefit = Math.round(((rate/baseRate - 1)/investingPeriodInDay) * 365 * 10000) / 100;
  const numberOfPacket = 1820543;
  const currentValue = Math.round(numberOfPacket * rate) ;
  const currentValueToString = currentValue.toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",
  });
  const investedAmountToString = investedAmount.toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",
  });
  const BankAcountFeePerDay = (6000000 * 0.0024 + (currentValue-6000000) * 0.00285) /(365/4)
  const BankAcountFeePerInvestingPeriod = Math.round(BankAcountFeePerDay*investingPeriodInDay)+2600
  const taxPerInvestingPeriod = ((currentValue-investedAmount)*0.15)


  const dailyBenefitAfterTaxAndFees= Math.round((currentValue-investedAmount-BankAcountFeePerInvestingPeriod-taxPerInvestingPeriod)/investingPeriodInDay)
  const dailyBenefitAfterTaxAndFeesToString = dailyBenefitAfterTaxAndFees.toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",
  });
  const benefitAfterTaxAndFeesToString = (dailyBenefitAfterTaxAndFees*investingPeriodInDay).toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",  
  });
  const yearlyRateBenefitAfterTaxAndFees = Math.round((dailyBenefitAfterTaxAndFees*365/investedAmount)*10000)/100 ;

  return (
    <>
      <h1>Raiffeisen Kamat Prémium Rövid Kötvény Alap</h1>
      <div>Befektetett összeg: {investedAmountToString}</div>
      <div>Eltelt napok száma a befektetés kezdete óta: {investingPeriodInDay}</div>
      <div>Éves névleges hozam: {yearlyRateBenefit}%</div>
      
      <br />
      <div>Aktuális érték:</div>
      <h1>
        {currentValueToString}
      </h1>
      <div>Napi átlagos hozam adózás és költségek után: {dailyBenefitAfterTaxAndFeesToString}</div>
      <br />
      <div>Teljes hozam adózás és költségek után: 
        <h1>
          {benefitAfterTaxAndFeesToString}
        </h1>
      </div>
      <div>Éves nettó hozam: {yearlyRateBenefitAfterTaxAndFees} %</div>
      <br />
      <div>
        <a href="https://www.bamosz.hu/alapoldal?isin=HU0000702758">Bamosz</a>
      </div>
    </>
 )
};
