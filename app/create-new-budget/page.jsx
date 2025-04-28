"use client";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { login } from "../../actions/userHelpers";
import { dateCalculator } from "../../actions/dateCalculations";
import ManualDates from "../../components/manualDates";

// export PATH="/c/Program Files/nodejs/:$PATH"

export default function Page() {
  const [formState, formAction] = useActionState(login, {});

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

  console.log(fromState, toState)

  return (
    <>
      <h1 className="text-center text-3xl text-gray-6-- mb-5">
        New Budgeting Month
      </h1>

      <h3 className="text-center text-2xl text-gray-6-- mb-5">
        Current date: {new Date().toLocaleDateString("de-De")}
      </h3>

      <p className="text-center mb-5">
        {monthOfPayState?.weeks !== undefined && (
          <>
            <small>(Calculating from 25. to 25.)</small>
            <button
              className="btn btn-xs ml-3 btn-dash"
              onClick={(e) => {setToManualDates(!manualDatesState)
                !manualDatesState ? (setFromState(''), setToState('')): setToManualDates(!manualDatesState)
              }}
            >
              Toggle Manual Dates!
            </button>

            <br />
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

      <form action={formAction} className="max-w-sm mx-auto">
        <div className="flex flex-col">
          {!manualDatesState ? (
            <div className="mb-3">
              <input
                className="w-full text-center border border-gray-300 rounded-md p-2 [text-align:center]"
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
            />
          )}
          <div className="flex gap-3">
            <div className="mb-3">
              <label className="floating-label">
                <span>First income</span>
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="First income"
                  className="input input-md no-arrows"
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="floating-label">
                <span>Second income</span>
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="Second income"
                  className="input input-md no-arrows"
                />
              </label>
            </div>
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              className="input"
            />

            {formState?.message && (
              <div role="alert" className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{formState?.message}</span>
              </div>
            )}
          </div>
        </div>

        <button className="btn btn-primary">Preview</button>
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
