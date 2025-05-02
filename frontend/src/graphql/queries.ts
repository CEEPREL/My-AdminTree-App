import { gql } from "@apollo/client";

export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments($skip: Int, $take: Int) {
    getAllDepartments(skip: $skip, take: $take) {
      id
      name
      createdAt
      updatedAt
      subDepartments {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
