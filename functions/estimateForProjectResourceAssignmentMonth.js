const {GraphQLClient, gql} = require('graphql-request');
const fetch = require('./utils/fetchQuery');

const handler = (resourceAssignmentEstimates = async ({
  projectResourceAssignmentsId,
  year,
  month,
}) => {
  const query = gql`
    query MyQuery(
      $projectResourceAssignmentsId: bigint!
      $year: Int!
      $month: Int!
    ) {
      project_resource_assignment_time_period_details(
        where: {
          project_resource_assignment_id: {_eq: $projectResourceAssignmentsId}
          month: {_eq: $month}
          year: {_eq: $year}
        }
      ) {
        estimate
      }
    }
  `;

  const data = await fetch(query, {
    projectResourceAssignmentsId: projectResourceAssignmentsId,
    year: year,
    month: month,
  });

  if (data.project_resource_assignment_time_period_details.length > 0) {
    return data.project_resource_assignment_time_period_details[0].estimate;
  } else {
    return 0;
  }
});

module.exports = handler;
