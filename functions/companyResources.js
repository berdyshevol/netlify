const { GraphQLClient, gql } = require("graphql-request");
const fetch = require("./utils/fetchQuery");
exports.handler = async (req, resp) => {
  const query = gql`
    query MyQuery {
      companies {
        id
      }
    }
  `;
  const data = await fetch(query, {});
  try {
    if (data.companies) {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else {
      return { statusCode: 404, body: "not found" };
    }
  } catch (e) {
    console.error(e);
    return resp.status(500).json({
      message: "unexpected",
    });
  }
};
