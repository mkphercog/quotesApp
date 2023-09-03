// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { QuoteDataModel, SourceData, TagData } = initSchema(schema);

export {
  QuoteDataModel,
  SourceData,
  TagData
};