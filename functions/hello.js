exports.handler = async function (event, context) {
  const name = "Oleg";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello World ${name}` }),
  };
};
