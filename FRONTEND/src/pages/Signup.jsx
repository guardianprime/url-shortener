function Signup({ error }) {
  return (
    <div>
      <form action="/signup" method="post">
        <input type="text" name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {error && <p className="text-red"> error</p>}
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
