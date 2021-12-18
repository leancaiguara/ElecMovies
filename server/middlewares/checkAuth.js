const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).send("## Login is required ##");
};

module.exports = { checkAuth };
