"use client";

import { useActionState } from "react";
import { useState } from "react";
import { login } from "../../actions/userHelpers";



export default function Page() {
  const [formState, formAction] = useActionState(login, {});
  const [monthOfPayState, setMonthOfPayState] = useState(new Date().getFullYear() + "-0" + (new Date().getMonth() + 2));
  const [lastDayPayState, setLastDayPayState] = useState("Last Day is:")
  console.log(formState);

  const daysBetweenPays = (e) => {
    const value = e.target.value;

    const payDate = new Date(value + '-25');

    const dayName = payDate.toLocaleDateString('en-US', {weekday: 'short'});

    const DayNumb = payDate.getDate();

    const month = payDate.getMonth() + 1;

    const year = payDate.getFullYear();

    //Last Day of Pay
    const lastDayDate = new Date(value + '-25');

    const lastDayName = lastDayDate.toLocaleDateString('en-US', {weekday: 'short'});

    const lastDayNumb = lastDayDate.getDate();

    const lastDayMonth = lastDayDate.getMonth() + 2;

    // payDate.setMonth(payDate.getMonth() + 1)
    setMonthOfPayState(value);
    setLastDayPayState()
    console.log(dayName, DayNumb, month, year, 'payDay is :', payDate);
  
  }

  return (
    <>
      <h1 className="text-center text-3xl text-gray-6-- mb-5">
        New Budgeting Month
      </h1>

      <h3 className="text-center text-2xl text-gray-6-- mb-5">Current date: {new Date().toLocaleDateString('de-De')}</h3>

      <form action={formAction} className="max-w-sm mx-auto">
        <div className="flex flex-col">
          <div className="mb-3">
            <input
              type="month"
              defaultValue={
                monthOfPayState
              }
              onChange={daysBetweenPays}
            />

          </div>
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
