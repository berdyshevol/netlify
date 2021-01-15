const {GraphQLClient, gql} = require('graphql-request');
const fetch = require('./utils/fetchQuery');

const resourceAssignmentEstimates = async ({
  projectResourceAssignmentsId,
  beginYear,
  beginMonth,
}) => {
  // hard assumption of a 12 month increment
  const endYear = beginMonth === 1 ? beginYear : beginYear + 1;
  const endMonth = beginMonth === 1 ? beginMonth + 11 : beginMonth - 1;

  const lowerBound = beginYear * 100 + beginMonth;
  const upperBound = endYear * 100 + endMonth;

  const query = gql`
    query MyQuery($projectResourceAssignmentsId: bigint!) {
      project_resource_assignment_time_period_details(
        where: {
          project_resource_assignment_id: {_eq: $projectResourceAssignmentsId}
        }
      ) {
        id
        month
        year
        estimate
      }
    }
  `;

  const data = await fetch(query, {
    projectResourceAssignmentsId: projectResourceAssignmentsId,
  });

  // add yearMonth
  const resultSet = data.project_resource_assignment_time_period_details.map(
    el => ({
      ...el,
      yearMonth: el.year * 100 + el.month,
    }),
  );

  const filteredResults = resultSet.filter(({yearMonth}) => {
    return yearMonth >= lowerBound && yearMonth <= upperBound;
  });
  console.log('filteredResults', filteredResults);
};

module.exports = resourceAssignmentEstimates;
