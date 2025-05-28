"use client";

import { useState, useEffect } from "react";

export default function DeductionItem() {
  const [deductionsState, setDeductions] = useState({});

  /* This should be a template item for creating all sorts of deductions
  It will need to be used inside of another component which will be a component for the regular and reaccuring deductions, which you can set up in your profile settings page.

  FINISH - this template item

  CREATE - profile page and new table for regular deductions per user which can be changed. 

  CREATE - regular deductions component which will be automatically added to the +Budget (new budgeting month) page
  */

  return (
    <>
      <div className="flex flex-row max-w-sm">
        <label className="floating-label ">
          <span>Deduction [name]</span>
          <input
            type="number"
            placeholder="Deduction [name]"
            name="Deduction [name_i]"
            pattern="[0-9]*"
            className="input input-sm no-arrows"
          />
        </label>
        
        <div className="container max-w-sm">
        <span>Cash: </span>
        <input type="checkbox" name="cash[id]" id="cash[id]" />

        <select>
          <option value="user1">User 1 [name]</option>
          <option value="user2">User 2 [name]</option>
        </select>
        <button>Delete</button>
        </div>
      </div>

      <input
        type="number"
        placeholder="Deduction [name]"
        name="Deduction [name_i]"
        pattern="[0-9]*"
        className="input input-sm no-arrows"
      />
      <input
        type="number"
        placeholder="Deduction [name]"
        name="Deduction [name_i]"
        pattern="[0-9]*"
        className="input input-sm no-arrows"
      />
    </>
  );
}
