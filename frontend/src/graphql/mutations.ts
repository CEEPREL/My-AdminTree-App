import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation createDepartment($input: CreateDepartmentInput!) {
    createDepartment(createDepartmentInput: $input) {
      id
      name
      subDepartments {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($updateDepartmentInput: UpdateDepartmentInput!) {
    updateDepartment(updateDepartmentInput: $updateDepartmentInput) {
      id
      name
      createdAt
      updatedAt
      subDepartments {
        id
        name
      }
    }
  }
`;

export const REMOVE_DEPARTMENT = gql`
  mutation RemoveDepartment($id: Int!) {
    removeDepartment(id: $id) {
      id
      name
    }
  }
`;
