import React from "react";

export default function Login() {
  return (
    <form action="/login" method="post">
      <div class="container">
        <h1>Login</h1>
        <hr />
        <label for="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />
        <button type="submit">Login</button>
        <label>
          <input type="checkbox" name="remember" /> Remember me
        </label>
      </div>

      <div class="container">
        <span class="psw">
          Forgot <a href="#">password?</a>
        </span>
      </div>
    </form>
  );
}
