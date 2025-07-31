function Login({ error }) {
  return (
    <div>
      <form action="/login" method="post">
        <input type="text" name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {error && <p className="text-red">`${error}`</p>}
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
