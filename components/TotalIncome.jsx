"use client";

import { useState, useEffect } from "react";

export default function TotalIncome() {
  const [firstIncomeState, setFirstIncome] = useState("");

  const [secondIncomeState, setSecondIncome] = useState("");

  const [totalIncomeState, setTotalIncome] = useState("");

  useEffect(() => {
    if(firstIncomeState && secondIncomeState){

        const sum = parseInt(firstIncomeState) + parseInt(secondIncomeState);

        setTotalIncome(sum)

    } else {
        setTotalIncome("")
    }
  }, [firstIncomeState, secondIncomeState]);

  return (
    <>
      <div className="flex gap-3">
        <div className="mb-3">
          <label className="floating-label">
            <span>First income</span>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              step="1"
              placeholder="First income"
              defaultValue={firstIncomeState}
              className="input  no-arrows input-sm"
              onChange={(e) => {
                const newValue = e.target.value;

                const parsedValue = parseInt(newValue, 10);

                if(!isNaN(parsedValue)){
                    setFirstIncome(e.target.value)
                } else {
                    setFirstIncome('')
                }
              }}
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="floating-label">
            <span>Second income</span>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              step="1"
              placeholder="Second income"
              defaultValue={secondIncomeState}
              className="input  no-arrows input-sm"
              onChange={(e) => {
                const newValue = e.target.value;

                const parsedValue = parseInt(newValue, 10);

                if(!isNaN(parsedValue)){
                    setSecondIncome(e.target.value)
                } else {
                    setSecondIncome('')
                }
              }}
            />
          </label>
        </div>
      </div>
      <p className="text-center mb-5">
        <span>Total Income: {totalIncomeState ? totalIncomeState : '🥺'}</span>
      </p>
    </>
  );
}
