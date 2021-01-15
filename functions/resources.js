const {GraphQLClient, gql} = require('graphql-request');
const fetch = require('./utils/fetchQuery');
const resourceAssignmentTotalRows = require('./resourceAssignmentTotalRows');
const roleRow = require('./roleRow');
const estimateForProjectResourceAssignmentMonth = require('./estimateForProjectResourceAssignmentMonth');
const primaryRolesForCompany = require('./primaryRolesForCompany');

exports.handler = async (req, resp) => {
  const companyPrimaryRoles = await primaryRolesForCompany(1);
  // stubbed for now will come in request
  let month = 4;
  let year = 2020;

  //result = companyPrimaryRoles;

  result = companyPrimaryRoles.map(e => {
    return roleRow(e);
  });

  console.log('RESULT:', result);
  /*
  const foo = estimateForProjectResourceAssignmentMonth({
    projectResourceAssignmentsId: 1,
    month: 4,
    year: 2020,
  });

  const foo = await resourceAssignmentTotalRows({
    projectResourceAssignmentsId: 1,
    beginMonth: 4,
    beginYear: 2020,
    projectName: 'wooot',
    projectPriority: 'HIGH',
  });
*/

  //console.log(data);
  //console.log(foo);

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    console.error(e);
    return resp.status(500).json({
      message: 'unexpected',
    });
  }
};
