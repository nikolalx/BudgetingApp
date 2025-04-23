import Link from "next/link";
import { getUserByCookie } from "../lib/getUser";
import { logout } from "../actions/userHelpers";

export default async function Header() {
  const user = await getUserByCookie();

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="flex-1">
            <Link className="btn btn-ghost text-xl" href="/">
              BudgetingApp
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {!user && (
                <li>
                  <Link href="/login">Log in</Link>
                </li>
              )}
              {user && (
                <>
                  <li className="mr-3">
                    <Link href='/create-new-budget' className="btn btn-primary ">+Budget</Link>
                  </li>
                  <li>
                    <form action={logout} className="btn btn-neutral">
                      <button>Log out</button>
                    </form>
                  </li>
                </>
              )}
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
