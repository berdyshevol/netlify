const { GraphQLClient, gql } = require("graphql-request");
const fetch = async (query, variables) => {
  const { HASURA_API_URL, HASURA_API_SECRET } = process.env;
  const graphQLClient = new GraphQLClient(HASURA_API_URL, {
    headers: {
      "x-hasura-admin-secret": HASURA_API_SECRET,
    },
  });
  const data = await graphQLClient.request(query, variables);
  return data;
};
module.exports = fetch;
