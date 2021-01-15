// this might be a waste of time, was trying to generalize it

exports.handler = (req, resp) => {
  //console.log(req.body);
  const body = JSON.parse(req.body);
  const actionName = body.action.name;

  try {
    const queryHandler = require(`./handlers/${actionName}`);
    if (!queryHandler) {
      return {statusCode: 404, message: 'not found'};
    }
    return queryHandler(req, resp);
  } catch (e) {
    //console.error(e);
    return {statusCode: 500, message: 'unexpected error occurred'};
  }
};
