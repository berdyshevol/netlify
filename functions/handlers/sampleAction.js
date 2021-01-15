const handler = (req, resp) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({accessToken: 5}),
    };
  } catch (e) {
    console.error(e);
    return resp.status(500).json({
      message: 'unexpected',
    });
  }
};

module.exports = handler;
