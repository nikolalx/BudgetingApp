'use client'

import { useEffect } from "react"
import { dateCalculator } from "../actions/dateCalculations"

export default function ManualDates({toState, setToState, fromState, setFromState, setMonthOfPayState}) {

  useEffect(() => {
    if(fromState && toState) {
      const result = dateCalculator(null, new Date(fromState), new Date(toState));

      setMonthOfPayState(result);
    }
  }, [fromState, toState])


    return (
        <div className="mb-3">
              <legend>From: </legend>
              <input
                className="w-full text-center border border-gray-300 rounded-md p-2 input-sm"
                type="date"
                placeholder="Manual date"
                value={fromState}
                onChange={(e) => setFromState(e.target.value)}
              />
              <legend>To: </legend>
              <input
                className="w-full text-center border border-gray-300 rounded-md p-2 input-sm"
                type="date"
                placeholder="Manual date"
                value={toState}
                onChange={(e) => setToState(e.target.value)}
              />
            </div>
    )
}