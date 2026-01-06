import Hamburger from "../components/Hamburger";

function ForgetPassword() {
  return (
    <div className="h-full">
      <Hamburger />
      <div className="h-2/3 p-4">
        <h1 className="text-4xl bold">Reset Password</h1>
        <p>Don't have access to your email? contact support.</p>
        <form>
          <div className="flex flex-col justify-between">
            <label>Enter email</label>
            <input type="email" name="email" id="email" />
          </div>
          <button
            type="submit"
            className="w-full bg-[#031f13] text-white p-2 rounded mt-3"
          >
            Send password reset link
          </button>
        </form>
        <div>
          <Link to="/login">Back to log in</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
