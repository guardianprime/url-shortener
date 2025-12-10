export const signUpController = (req, res) => {
  res.send("this is the auth signup controller");
};

export const loginController = (req, res) => {
  res.send("this is the auth login controller");
};

export const logoutController = (req, res) => {
  res.send("this is the auth logout controller");
};

export const checkUserStatusController = (req, res) => {
  const isAuthenticated = false;
  res.status(200).json({
    success: true,
    data: isAuthenticated,
  });
};
