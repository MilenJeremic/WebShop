//checking user autentication
function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  //check if user is authenticated
  if (!uid) {
    return next(); //return if not without crashing the app/stopping function execution
  }

  //if user is authenticated
  res.locals.uid = uid;
  res.locals.isAuth = true;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuthStatus;
