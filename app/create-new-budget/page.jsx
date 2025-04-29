"use client";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { dateCalculator } from "../../actions/dateCalculations";
import ManualDates from "../../components/manualDates";
import DeductionItem from "../../components/DeductionItem";
import TotalIncome from "../../components/TotalIncome";

// export PATH="/c/Program Files/nodejs/:$PATH"

export default function Page() {
  const [manualDatesState, setToManualDates] = useState(false);

  const [fromState, setFromState] = useState("");

  const [toState, setToState] = useState("");

  const [monthInputValue, setMonthInputValue] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [monthOfPayState, setMonthOfPayState] = useState({});

  useEffect(() => {
    const initialDateObject = dateCalculator(
      new Date().getFullYear() + "-0" + (new Date().getMonth() + 2)
    );

    setMonthOfPayState(initialDateObject);
  }, []);

  const handleMonthChange = (e) => {
    const newValue = e.target.value; // Example: "2025-06"
    setMonthInputValue(newValue);

    const newDateObject = dateCalculator(newValue);
    setMonthOfPayState(newDateObject);
  };

  console.log(fromState, toState);

  return (
    <>
      <div className="flex justify-around">
        <h1 className="text-3xl text-gray-6-- mb-5">New Budgeting Month</h1>

        <h2 className="text-3xl text-gray-6-- mb-5">
          Current date: {new Date().toLocaleDateString("de-De")}
        </h2>
      </div>

      <p className="text-center mb-5">
        {monthOfPayState?.weeks !== undefined && (
          <>
            <span className="font-bold text-blue-600">
              {monthOfPayState.weeks} weeks
            </span>
            {" and "}
            <span className="font-bold text-green-600">
              {monthOfPayState.days} days
            </span>
            {" until last day of budgeting month"}
          </>
        )}
      </p>

      <div className="text-center mb-1">
        <small>(Calculating from 25. to 25.)</small>
        <button
          className="btn btn-xs ml-3 btn-dash"
          onClick={(e) => {
            setToManualDates(!manualDatesState);
            !manualDatesState
              ? (setFromState(""), setToState(""))
              : setToManualDates(!manualDatesState);
          }}
        >
          Toggle Manual Dates!
        </button>
      </div>

      <div className="max-w-sm mx-auto">
        <div className="flex flex-col">
          {!manualDatesState ? (
            <div className="mb-3">
              <input
                className="w-full text-center border border-gray-300 rounded-md p-2 input-sm"
                type="month"
                defaultValue={monthInputValue}
                onChange={handleMonthChange}
              />
            </div>
          ) : (
            <ManualDates
              toState={toState}
              setToState={setToState}
              fromState={fromState}
              setFromState={setFromState}
              setMonthOfPayState={setMonthOfPayState}
            />
          )}

          <TotalIncome />
        </div>
      </div>

      <div className="flex flex-col mb-3">
        <DeductionItem />


      </div>

      <div className="text-center">
        <button className="btn btn-primary">Preview</button>
        <button className="btn btn-primary">Submit</button>
      </div>
    </>
  );
}
