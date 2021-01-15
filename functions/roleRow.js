const {GraphQLClient, gql} = require('graphql-request');
const fetch = require('./utils/fetchQuery');

const handler = async roleId => {
  const query = gql`
    query MyQuery($role_id: bigint!) {
      company_resource_roles(where: {id: {_eq: $role_id}}) {
        name
      }
    }
  `;

  const data = await fetch(query, {
    role_id: roleId,
  });

  return data;

  //console.log('ROLES', data);

  //return data;
};

module.exports = handler;
