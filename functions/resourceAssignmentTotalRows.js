const { GraphQLClient, gql } = require("graphql-request");
const fetch = require("./utils/fetchQuery");
const estimateForProjectResourceAssignmentMonth = require("./estimateForProjectResourceAssignmentMonth");
const projectNameForProjectResourceAssignment = require("./projectNameForProjectResourceAssignment");
const resourceAssignmentEstimates = async ({
  projectResourceAssignmentsId,
  beginYear: year,
  beginMonth: month,
  // projectName,
  // projectPriority,
}) => {
  let result = {};
  const projectName = await projectNameForProjectResourceAssignment(
    projectResourceAssignmentsId
  );
  // result.priority = projectPriority ? projectPriority : "";
  for (let i = 1; i <= 12; i++) {
    result[`month_${i}`] = await estimateForProjectResourceAssignmentMonth({
      projectResourceAssignmentsId: projectResourceAssignmentsId,
      month: month,
      year: year,
    });
    year = month === 12 ? year + 1 : year;
    month = month === 12 ? 1 : month + 1;
  }
  result.filter = "";
  result.aggregration = "";

  return {
    ...result,
    column_text: text,
    resource_assignment_id: projectResourceAssignmentsId,
  };
};

module.exports = resourceAssignmentEstimates;
