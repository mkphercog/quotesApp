/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuoteDataModel = /* GraphQL */ `
  subscription OnCreateQuoteDataModel(
    $filter: ModelSubscriptionQuoteDataModelFilterInput
    $owner: String
  ) {
    onCreateQuoteDataModel(filter: $filter, owner: $owner) {
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
export const onUpdateQuoteDataModel = /* GraphQL */ `
  subscription OnUpdateQuoteDataModel(
    $filter: ModelSubscriptionQuoteDataModelFilterInput
    $owner: String
  ) {
    onUpdateQuoteDataModel(filter: $filter, owner: $owner) {
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
export const onDeleteQuoteDataModel = /* GraphQL */ `
  subscription OnDeleteQuoteDataModel(
    $filter: ModelSubscriptionQuoteDataModelFilterInput
    $owner: String
  ) {
    onDeleteQuoteDataModel(filter: $filter, owner: $owner) {
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
export const onCreateSourceData = /* GraphQL */ `
  subscription OnCreateSourceData(
    $filter: ModelSubscriptionSourceDataFilterInput
    $owner: String
  ) {
    onCreateSourceData(filter: $filter, owner: $owner) {
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
export const onUpdateSourceData = /* GraphQL */ `
  subscription OnUpdateSourceData(
    $filter: ModelSubscriptionSourceDataFilterInput
    $owner: String
  ) {
    onUpdateSourceData(filter: $filter, owner: $owner) {
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
export const onDeleteSourceData = /* GraphQL */ `
  subscription OnDeleteSourceData(
    $filter: ModelSubscriptionSourceDataFilterInput
    $owner: String
  ) {
    onDeleteSourceData(filter: $filter, owner: $owner) {
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
export const onCreateTagData = /* GraphQL */ `
  subscription OnCreateTagData(
    $filter: ModelSubscriptionTagDataFilterInput
    $owner: String
  ) {
    onCreateTagData(filter: $filter, owner: $owner) {
      name
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateTagData = /* GraphQL */ `
  subscription OnUpdateTagData(
    $filter: ModelSubscriptionTagDataFilterInput
    $owner: String
  ) {
    onUpdateTagData(filter: $filter, owner: $owner) {
      name
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteTagData = /* GraphQL */ `
  subscription OnDeleteTagData(
    $filter: ModelSubscriptionTagDataFilterInput
    $owner: String
  ) {
    onDeleteTagData(filter: $filter, owner: $owner) {
      name
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
