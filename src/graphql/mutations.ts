/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuoteDataModel = /* GraphQL */ `
  mutation CreateQuoteDataModel(
    $input: CreateQuoteDataModelInput!
    $condition: ModelQuoteDataModelConditionInput
  ) {
    createQuoteDataModel(input: $input, condition: $condition) {
      content
      source {
        title
        author
        id
        createdAt
        updatedAt
        owner
        __typename
      }
      comment
      tag {
        name
        id
        createdAt
        updatedAt
        owner
        __typename
      }
      id
      createdAt
      updatedAt
      quoteDataModelSourceId
      quoteDataModelTagId
      owner
      __typename
    }
  }
`;
export const updateQuoteDataModel = /* GraphQL */ `
  mutation UpdateQuoteDataModel(
    $input: UpdateQuoteDataModelInput!
    $condition: ModelQuoteDataModelConditionInput
  ) {
    updateQuoteDataModel(input: $input, condition: $condition) {
      content
      source {
        title
        author
        id
        createdAt
        updatedAt
        owner
        __typename
      }
      comment
      tag {
        name
        id
        createdAt
        updatedAt
        owner
        __typename
      }
      id
      createdAt
      updatedAt
      quoteDataModelSourceId
      quoteDataModelTagId
      owner
      __typename
    }
  }
`;
export const deleteQuoteDataModel = /* GraphQL */ `
  mutation DeleteQuoteDataModel(
    $input: DeleteQuoteDataModelInput!
    $condition: ModelQuoteDataModelConditionInput
  ) {
    deleteQuoteDataModel(input: $input, condition: $condition) {
      content
      source {
        title
        author
        id
        createdAt
        updatedAt
        owner
        __typename
      }
      comment
      tag {
        name
        id
        createdAt
        updatedAt
        owner
        __typename
      }
      id
      createdAt
      updatedAt
      quoteDataModelSourceId
      quoteDataModelTagId
      owner
      __typename
    }
  }
`;
export const createSourceData = /* GraphQL */ `
  mutation CreateSourceData(
    $input: CreateSourceDataInput!
    $condition: ModelSourceDataConditionInput
  ) {
    createSourceData(input: $input, condition: $condition) {
      title
      author
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateSourceData = /* GraphQL */ `
  mutation UpdateSourceData(
    $input: UpdateSourceDataInput!
    $condition: ModelSourceDataConditionInput
  ) {
    updateSourceData(input: $input, condition: $condition) {
      title
      author
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteSourceData = /* GraphQL */ `
  mutation DeleteSourceData(
    $input: DeleteSourceDataInput!
    $condition: ModelSourceDataConditionInput
  ) {
    deleteSourceData(input: $input, condition: $condition) {
      title
      author
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createTagData = /* GraphQL */ `
  mutation CreateTagData(
    $input: CreateTagDataInput!
    $condition: ModelTagDataConditionInput
  ) {
    createTagData(input: $input, condition: $condition) {
      name
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateTagData = /* GraphQL */ `
  mutation UpdateTagData(
    $input: UpdateTagDataInput!
    $condition: ModelTagDataConditionInput
  ) {
    updateTagData(input: $input, condition: $condition) {
      name
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteTagData = /* GraphQL */ `
  mutation DeleteTagData(
    $input: DeleteTagDataInput!
    $condition: ModelTagDataConditionInput
  ) {
    deleteTagData(input: $input, condition: $condition) {
      name
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
