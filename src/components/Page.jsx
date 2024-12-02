import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNumber, counterName, moneyfetch, toCountry, sendConvert } from "../features/fetch";
import './Page.css'
const Page = () => {
  const dispatch = useDispatch();
  const { CURRENCY_NAME_TO_CODE, moneyNumber, countryName, toCountryName, check, data, status } = useSelector((state) => state.fetch);




  useEffect(() => {
    if (check && moneyNumber && countryName && toCountryName) {
      dispatch(moneyfetch({ moneyNumber, countryName, toCountryName }));
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [dispatch, check, moneyNumber, countryName, toCountryName]);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(sendConvert());
    }
  };
  return (
    <div className="page-container">
      <h1>Currency Converter</h1>
      <div>
        <label>Convert:</label>
        <input
        onKeyDown={handleKeyDown}
          onChange={(e) => dispatch(changeNumber(e.target.value))}
          value={moneyNumber}
          type="number"
        />
      </div>

      <div>
        <label>From:</label>
        <select value={countryName} onChange={(e) => dispatch(counterName(e.target.value))}>
          <option value="">Select Country Money</option>
          {Object.keys(CURRENCY_NAME_TO_CODE).map((money) => (
            <option key={money} value={CURRENCY_NAME_TO_CODE[money]}>
              {money}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>To:</label>
        <select value={toCountryName} onChange={(e) => dispatch(toCountry(e.target.value))}>
          <option value="">Select Country Money</option>
          {Object.keys(CURRENCY_NAME_TO_CODE).map((money) => (
            <option key={money} value={CURRENCY_NAME_TO_CODE[money]}>
              {money}
            </option>
          ))}
        </select>
      </div>

      <div className="status-message">
        {status === "loading" && <p className="loading">Loading...</p>}
        {status === "succeeded" && data && <p className="succeeded">Converted Money:{moneyNumber} {countryName} = {data.result.toFixed(2)} {toCountryName}</p>}
        {status === "failed" && <p className="failed">Failed to fetch data.</p>}
      </div>
    </div>
  );
};

export default Page;
