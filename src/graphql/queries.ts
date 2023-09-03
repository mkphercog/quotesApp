/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuoteDataModel = /* GraphQL */ `
  query GetQuoteDataModel($id: ID!) {
    getQuoteDataModel(id: $id) {
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
export const listQuoteDataModels = /* GraphQL */ `
  query ListQuoteDataModels(
    $filter: ModelQuoteDataModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuoteDataModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getSourceData = /* GraphQL */ `
  query GetSourceData($id: ID!) {
    getSourceData(id: $id) {
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
export const listSourceData = /* GraphQL */ `
  query ListSourceData(
    $filter: ModelSourceDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSourceData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        author
        id
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTagData = /* GraphQL */ `
  query GetTagData($id: ID!) {
    getTagData(id: $id) {
      name
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listTagData = /* GraphQL */ `
  query ListTagData(
    $filter: ModelTagDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        id
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
