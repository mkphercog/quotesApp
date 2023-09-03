import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerQuoteDataModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<QuoteDataModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content: string;
  readonly source?: SourceData | null;
  readonly comment?: string | null;
  readonly tag?: TagData | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly quoteDataModelSourceId?: string | null;
  readonly quoteDataModelTagId?: string | null;
}

type LazyQuoteDataModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<QuoteDataModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content: string;
  readonly source: AsyncItem<SourceData | undefined>;
  readonly comment?: string | null;
  readonly tag: AsyncItem<TagData | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly quoteDataModelSourceId?: string | null;
  readonly quoteDataModelTagId?: string | null;
}

export declare type QuoteDataModel = LazyLoading extends LazyLoadingDisabled ? EagerQuoteDataModel : LazyQuoteDataModel

export declare const QuoteDataModel: (new (init: ModelInit<QuoteDataModel>) => QuoteDataModel) & {
  copyOf(source: QuoteDataModel, mutator: (draft: MutableModel<QuoteDataModel>) => MutableModel<QuoteDataModel> | void): QuoteDataModel;
}

type EagerSourceData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SourceData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySourceData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SourceData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SourceData = LazyLoading extends LazyLoadingDisabled ? EagerSourceData : LazySourceData

export declare const SourceData: (new (init: ModelInit<SourceData>) => SourceData) & {
  copyOf(source: SourceData, mutator: (draft: MutableModel<SourceData>) => MutableModel<SourceData> | void): SourceData;
}

type EagerTagData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TagData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTagData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TagData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TagData = LazyLoading extends LazyLoadingDisabled ? EagerTagData : LazyTagData

export declare const TagData: (new (init: ModelInit<TagData>) => TagData) & {
  copyOf(source: TagData, mutator: (draft: MutableModel<TagData>) => MutableModel<TagData> | void): TagData;
}