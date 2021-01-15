const {GraphQLClient, gql} = require('graphql-request');
const fetch = require('./utils/fetchQuery');

const handler = async companyId => {
  const query = gql`
    query MyQuery($company_id: bigint!) {
      project_resource_assignments(
        where: {company_project_resource: {company_id: {_eq: $company_id}}}
      ) {
        company_project_resource {
          primary_role_id
        }
      }
    }
  `;

  const data = await fetch(query, {
    company_id: companyId,
  });

  // needs to be uniqued
  return data.project_resource_assignments.map(
    e => e.company_project_resource.primary_role_id,
  );
};

module.exports = handler;
