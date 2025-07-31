function ResetPassword({ error }) {
  return (
    <div>
      <form action="/reset" method="post">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          id="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          id="password"
        />
        <label>New password</label>
        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          required
          id="new_password"
        />
        {error && <p style="color: red"> error </p>}
        <button type="submit">Reset</button>
      </form>
    </div>
  );
}

export default ResetPassword;
