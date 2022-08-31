//use/retrive data from session
function getSessionData(req) {
  const sessionData = req.session.flashedData;

  req.session.flashedData = null;

  return sessionData;
}

//save input data into session
function flashDataToSession(req, data, action) {
  req.session.flashedData = data;
  req.session.save(action);
}

module.exports = {
  getSessionData: getSessionData,
  flashDataToSession: flashDataToSession,
};
