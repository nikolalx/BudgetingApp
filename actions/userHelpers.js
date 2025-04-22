"use server";

import {
  getAllData,
  createUser,
  getUserByUsername,
} from "../actions/dbHelpers";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

function isAlphaNumeric(x) {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(x);
}

export const login = async function (prevState, formData) {
  const errors = {
    success: false,
    message: "Invalid username / password",
  };

  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof user.username != "string") user.username = "";
  if (typeof user.password != "string") user.password = "";

  const fetchedUser = await getUserByUsername(user.username, "users");
  console.log(fetchedUser)


  if (!fetchedUser) {
    return errors;

  }

  const matchingStatus = bcrypt.compareSync(
    user.password,
    fetchedUser.password
  );

  if (!matchingStatus) {
    return errors;
  }

  // create jwt value
  const tokenValue = jwt.sign(
    { userId: fetchedUser.user_id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    process.env.JWT_SECRET
  );

  let fetchedCookies = await cookies();

  fetchedCookies.set("budgetingApp", tokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return redirect('/')

};

export const logout = async function () {
  const cookie = await cookies();

  cookie.delete("budgetingApp");

  redirect("/");
};

export const Register = async function (prevState, formData) {
  const errors = {};

  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof user.username != "string") user.username = "";
  if (typeof user.password != "string") user.password = "";

  Object.entries(user).forEach(([key, value]) => {
    key.trim();
    value.trim();
  });

  // Username validation
  if (user.username.length < 5)
    errors.username = "Username must be at least 5 characters long!";
  if (user.username.length > 30)
    errors.username = "Username cannot exceed 30 characters!";

  if (!isAlphaNumeric(user.username))
    errors.username = "Username can only contain letters and numbers!";

  if (user.username == "") errors.username = "You must provide a username!";

  //Password validation
  if (user.password.length < 8)
    errors.password = "Password must be at least 8 characters long!";
  if (user.password.length > 30)
    errors.password = "Password cannot exceed 30 characters!";

  if (!isAlphaNumeric(user.password))
    errors.password = "Password can only contain letters and numbers!";

  if (user.password == "") errors.password = "You must provide a password!";

  if (errors.username || errors.password) {
    return {
      errors: errors,
      status: false,
    };
  }

  // hash password first
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

  // store new user in DB
  // ALL USERS = const allUsers = await getAllData("users");
  const newUser = await createUser(user.username, user.password, "users");

  // create JWT value
  const tokenValue = jwt.sign(
    { userId: newUser, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    process.env.JWT_SECRET
  );

  // log user in with cookie
  let fetchedCookies = await cookies();

  fetchedCookies.set("budgetingApp", tokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return {
    success: true,
  };
};
