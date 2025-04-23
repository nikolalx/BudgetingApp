"use client";

import { useActionState } from "react";
import { login } from "../../actions/userHelpers";

export default function Page() {
  const [formState, formAction] = useActionState(login, {});
  console.log(formState);

  return (
    <>
      <h2 className="text-center text-2xl text-gray-6-- mb-5">
        New Budgeting Month
      </h2>

      <form action={formAction} className="max-w-sm mx-auto">
        <div className="flex flex-col">
          <div className="mb-3">
            <input
              type="month"
              defaultValue={
                new Date().getFullYear() + "-0" + (new Date().getMonth() + 1)
              }
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
