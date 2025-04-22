import RegisterForm from "../components/registerForm";
import { getUserByCookie } from "../lib/getUser";

export default async function Page() {
  const user = await getUserByCookie();

  return (
    <>
      {user && <p>Welcome, you are logged in!</p>}
      
      {!user && (
        <>
          <p className="text-center text-2xl text-gray-600 mb-5">
            Create new Account
          </p>

          <RegisterForm />
        </>
      )}
    </>
  );
}
