const projectNameForProjectResourceAssignment = require("./projectNameForProjectResourceAssignment");
const estimateForProjectResourceAssignmentMonth = require("./estimateForProjectResourceAssignmentMonth");

const resourceAssignmentEstimates = async ({
  projectResourceAssignmentsId,
  beginYear: year,
  beginMonth: month,
}) => {
  let result = {};
  result.id = projectResourceAssignmentsId;
  const projectName = await projectNameForProjectResourceAssignment({
    projectResourceAssignmentsId,
  });

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
    text: projectName,
    resource_assignment_id: projectResourceAssignmentsId,
  };
};

module.exports = resourceAssignmentEstimates;
