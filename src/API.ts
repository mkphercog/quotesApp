/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuoteDataModelInput = {
  content: string,
  comment?: string | null,
  id?: string | null,
  quoteDataModelSourceId?: string | null,
  quoteDataModelTagId?: string | null,
};

export type ModelQuoteDataModelConditionInput = {
  content?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  and?: Array< ModelQuoteDataModelConditionInput | null > | null,
  or?: Array< ModelQuoteDataModelConditionInput | null > | null,
  not?: ModelQuoteDataModelConditionInput | null,
  quoteDataModelSourceId?: ModelIDInput | null,
  quoteDataModelTagId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type QuoteDataModel = {
  __typename: "QuoteDataModel",
  content: string,
  source?: SourceData | null,
  comment?: string | null,
  tag?: TagData | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  quoteDataModelSourceId?: string | null,
  quoteDataModelTagId?: string | null,
  owner?: string | null,
};

export type SourceData = {
  __typename: "SourceData",
  title?: string | null,
  author?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type TagData = {
  __typename: "TagData",
  name?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateQuoteDataModelInput = {
  content?: string | null,
  comment?: string | null,
  id: string,
  quoteDataModelSourceId?: string | null,
  quoteDataModelTagId?: string | null,
};

export type DeleteQuoteDataModelInput = {
  id: string,
};

export type CreateSourceDataInput = {
  title?: string | null,
  author?: string | null,
  id?: string | null,
};

export type ModelSourceDataConditionInput = {
  title?: ModelStringInput | null,
  author?: ModelStringInput | null,
  and?: Array< ModelSourceDataConditionInput | null > | null,
  or?: Array< ModelSourceDataConditionInput | null > | null,
  not?: ModelSourceDataConditionInput | null,
};

export type UpdateSourceDataInput = {
  title?: string | null,
  author?: string | null,
  id: string,
};

export type DeleteSourceDataInput = {
  id: string,
};

export type CreateTagDataInput = {
  name?: string | null,
  id?: string | null,
};

export type ModelTagDataConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTagDataConditionInput | null > | null,
  or?: Array< ModelTagDataConditionInput | null > | null,
  not?: ModelTagDataConditionInput | null,
};

export type UpdateTagDataInput = {
  name?: string | null,
  id: string,
};

export type DeleteTagDataInput = {
  id: string,
};

export type ModelQuoteDataModelFilterInput = {
  content?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  and?: Array< ModelQuoteDataModelFilterInput | null > | null,
  or?: Array< ModelQuoteDataModelFilterInput | null > | null,
  not?: ModelQuoteDataModelFilterInput | null,
  quoteDataModelSourceId?: ModelIDInput | null,
  quoteDataModelTagId?: ModelIDInput | null,
};

export type ModelQuoteDataModelConnection = {
  __typename: "ModelQuoteDataModelConnection",
  items:  Array<QuoteDataModel | null >,
  nextToken?: string | null,
};

export type ModelSourceDataFilterInput = {
  title?: ModelStringInput | null,
  author?: ModelStringInput | null,
  and?: Array< ModelSourceDataFilterInput | null > | null,
  or?: Array< ModelSourceDataFilterInput | null > | null,
  not?: ModelSourceDataFilterInput | null,
};

export type ModelSourceDataConnection = {
  __typename: "ModelSourceDataConnection",
  items:  Array<SourceData | null >,
  nextToken?: string | null,
};

export type ModelTagDataFilterInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTagDataFilterInput | null > | null,
  or?: Array< ModelTagDataFilterInput | null > | null,
  not?: ModelTagDataFilterInput | null,
};

export type ModelTagDataConnection = {
  __typename: "ModelTagDataConnection",
  items:  Array<TagData | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionQuoteDataModelFilterInput = {
  content?: ModelSubscriptionStringInput | null,
  comment?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQuoteDataModelFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuoteDataModelFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionSourceDataFilterInput = {
  title?: ModelSubscriptionStringInput | null,
  author?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSourceDataFilterInput | null > | null,
  or?: Array< ModelSubscriptionSourceDataFilterInput | null > | null,
};

export type ModelSubscriptionTagDataFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTagDataFilterInput | null > | null,
  or?: Array< ModelSubscriptionTagDataFilterInput | null > | null,
};

export type CreateQuoteDataModelMutationVariables = {
  input: CreateQuoteDataModelInput,
  condition?: ModelQuoteDataModelConditionInput | null,
};

export type CreateQuoteDataModelMutation = {
  createQuoteDataModel?:  {
    __typename: "QuoteDataModel",
    content: string,
    source?:  {
      __typename: "SourceData",
      title?: string | null,
      author?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?: string | null,
    tag?:  {
      __typename: "TagData",
      name?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    quoteDataModelSourceId?: string | null,
    quoteDataModelTagId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateQuoteDataModelMutationVariables = {
  input: UpdateQuoteDataModelInput,
  condition?: ModelQuoteDataModelConditionInput | null,
};

export type UpdateQuoteDataModelMutation = {
  updateQuoteDataModel?:  {
    __typename: "QuoteDataModel",
    content: string,
    source?:  {
      __typename: "SourceData",
      title?: string | null,
      author?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?: string | null,
    tag?:  {
      __typename: "TagData",
      name?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    quoteDataModelSourceId?: string | null,
    quoteDataModelTagId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteQuoteDataModelMutationVariables = {
  input: DeleteQuoteDataModelInput,
  condition?: ModelQuoteDataModelConditionInput | null,
};

export type DeleteQuoteDataModelMutation = {
  deleteQuoteDataModel?:  {
    __typename: "QuoteDataModel",
    content: string,
    source?:  {
      __typename: "SourceData",
      title?: string | null,
      author?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?: string | null,
    tag?:  {
      __typename: "TagData",
      name?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    quoteDataModelSourceId?: string | null,
    quoteDataModelTagId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateSourceDataMutationVariables = {
  input: CreateSourceDataInput,
  condition?: ModelSourceDataConditionInput | null,
};

export type CreateSourceDataMutation = {
  createSourceData?:  {
    __typename: "SourceData",
    title?: string | null,
    author?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateSourceDataMutationVariables = {
  input: UpdateSourceDataInput,
  condition?: ModelSourceDataConditionInput | null,
};

export type UpdateSourceDataMutation = {
  updateSourceData?:  {
    __typename: "SourceData",
    title?: string | null,
    author?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteSourceDataMutationVariables = {
  input: DeleteSourceDataInput,
  condition?: ModelSourceDataConditionInput | null,
};

export type DeleteSourceDataMutation = {
  deleteSourceData?:  {
    __typename: "SourceData",
    title?: string | null,
    author?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateTagDataMutationVariables = {
  input: CreateTagDataInput,
  condition?: ModelTagDataConditionInput | null,
};

export type CreateTagDataMutation = {
  createTagData?:  {
    __typename: "TagData",
    name?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateTagDataMutationVariables = {
  input: UpdateTagDataInput,
  condition?: ModelTagDataConditionInput | null,
};

export type UpdateTagDataMutation = {
  updateTagData?:  {
    __typename: "TagData",
    name?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTagDataMutationVariables = {
  input: DeleteTagDataInput,
  condition?: ModelTagDataConditionInput | null,
};

export type DeleteTagDataMutation = {
  deleteTagData?:  {
    __typename: "TagData",
    name?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetQuoteDataModelQueryVariables = {
  id: string,
};

export type GetQuoteDataModelQuery = {
  getQuoteDataModel?:  {
    __typename: "QuoteDataModel",
    content: string,
    source?:  {
      __typename: "SourceData",
      title?: string | null,
      author?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?: string | null,
    tag?:  {
      __typename: "TagData",
      name?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    quoteDataModelSourceId?: string | null,
    quoteDataModelTagId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListQuoteDataModelsQueryVariables = {
  filter?: ModelQuoteDataModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuoteDataModelsQuery = {
  listQuoteDataModels?:  {
    __typename: "ModelQuoteDataModelConnection",
    items:  Array< {
      __typename: "QuoteDataModel",
      content: string,
      source?:  {
        __typename: "SourceData",
        title?: string | null,
        author?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      comment?: string | null,
      tag?:  {
        __typename: "TagData",
        name?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      quoteDataModelSourceId?: string | null,
      quoteDataModelTagId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSourceDataQueryVariables = {
  id: string,
};

export type GetSourceDataQuery = {
  getSourceData?:  {
    __typename: "SourceData",
    title?: string | null,
    author?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListSourceDataQueryVariables = {
  filter?: ModelSourceDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSourceDataQuery = {
  listSourceData?:  {
    __typename: "ModelSourceDataConnection",
    items:  Array< {
      __typename: "SourceData",
      title?: string | null,
      author?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTagDataQueryVariables = {
  id: string,
};

export type GetTagDataQuery = {
  getTagData?:  {
    __typename: "TagData",
    name?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListTagDataQueryVariables = {
  filter?: ModelTagDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagDataQuery = {
  listTagData?:  {
    __typename: "ModelTagDataConnection",
    items:  Array< {
      __typename: "TagData",
      name?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateQuoteDataModelSubscriptionVariables = {
  filter?: ModelSubscriptionQuoteDataModelFilterInput | null,
  owner?: string | null,
};

export type OnCreateQuoteDataModelSubscription = {
  onCreateQuoteDataModel?:  {
    __typename: "QuoteDataModel",
    content: string,
    source?:  {
      __typename: "SourceData",
      title?: string | null,
      author?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?: string | null,
    tag?:  {
      __typename: "TagData",
      name?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    quoteDataModelSourceId?: string | null,
    quoteDataModelTagId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateQuoteDataModelSubscriptionVariables = {
  filter?: ModelSubscriptionQuoteDataModelFilterInput | null,
  owner?: string | null,
};

export type OnUpdateQuoteDataModelSubscription = {
  onUpdateQuoteDataModel?:  {
    __typename: "QuoteDataModel",
    content: string,
    source?:  {
      __typename: "SourceData",
      title?: string | null,
      author?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?: string | null,
    tag?:  {
      __typename: "TagData",
      name?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    quoteDataModelSourceId?: string | null,
    quoteDataModelTagId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteQuoteDataModelSubscriptionVariables = {
  filter?: ModelSubscriptionQuoteDataModelFilterInput | null,
  owner?: string | null,
};

export type OnDeleteQuoteDataModelSubscription = {
  onDeleteQuoteDataModel?:  {
    __typename: "QuoteDataModel",
    content: string,
    source?:  {
      __typename: "SourceData",
      title?: string | null,
      author?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    comment?: string | null,
    tag?:  {
      __typename: "TagData",
      name?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    quoteDataModelSourceId?: string | null,
    quoteDataModelTagId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateSourceDataSubscriptionVariables = {
  filter?: ModelSubscriptionSourceDataFilterInput | null,
  owner?: string | null,
};

export type OnCreateSourceDataSubscription = {
  onCreateSourceData?:  {
    __typename: "SourceData",
    title?: string | null,
    author?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateSourceDataSubscriptionVariables = {
  filter?: ModelSubscriptionSourceDataFilterInput | null,
  owner?: string | null,
};

export type OnUpdateSourceDataSubscription = {
  onUpdateSourceData?:  {
    __typename: "SourceData",
    title?: string | null,
    author?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteSourceDataSubscriptionVariables = {
  filter?: ModelSubscriptionSourceDataFilterInput | null,
  owner?: string | null,
};

export type OnDeleteSourceDataSubscription = {
  onDeleteSourceData?:  {
    __typename: "SourceData",
    title?: string | null,
    author?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateTagDataSubscriptionVariables = {
  filter?: ModelSubscriptionTagDataFilterInput | null,
  owner?: string | null,
};

export type OnCreateTagDataSubscription = {
  onCreateTagData?:  {
    __typename: "TagData",
    name?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTagDataSubscriptionVariables = {
  filter?: ModelSubscriptionTagDataFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTagDataSubscription = {
  onUpdateTagData?:  {
    __typename: "TagData",
    name?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTagDataSubscriptionVariables = {
  filter?: ModelSubscriptionTagDataFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTagDataSubscription = {
  onDeleteTagData?:  {
    __typename: "TagData",
    name?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
