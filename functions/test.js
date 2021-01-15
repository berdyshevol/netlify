const resourceAssignmentEstimates = require("./resourceAssignmentTotalRows");

exports.handler = async (req, resp) => {
  const data = await resourceAssignmentEstimates({
    projectResourceAssignmentsId: 1,
    beginYear: 2021,
    beginMonth: 1,
    // projectName: "projectName",
    // projectPriority: "high",
  });
  console.log("=========", data);
  try {
    if (data) {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else {
      return { statusCode: 404, body: "no data" };
    }
  } catch (e) {
    console.error(e);
    return resp.status(500).json({
      message: "unexpected",
    });
  }
};
