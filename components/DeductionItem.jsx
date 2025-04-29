"use client";

import { useState, useEffect } from "react";

export default function DeductionItem() {
  const [deductionsState, setDeductions] = useState({});

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
