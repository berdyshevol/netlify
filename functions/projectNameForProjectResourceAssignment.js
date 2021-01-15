const { GraphQLClient, gql } = require("graphql-request");
const fetch = require("./utils/fetchQuery");

const projectNameForProjectResourceAssignment = async (
  projectResourceAssignmentsId
) => {
  const query = gql`
    query MyQuery($projectResourceAssignmentsId: bigint = "") {
      projects(
        where: {
          project_resource_assignments: {
            id: { _eq: $projectResourceAssignmentsId }
          }
        }
      ) {
        name
      }
    }
  `;
  const data = await fetch(query, {
    projectResourceAssignmentsId,
  });
  console.log("=======", data);
  return data.projects[0].name;
};
module.export = projectNameForProjectResourceAssignment;
