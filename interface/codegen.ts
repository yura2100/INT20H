import type { CodegenConfig } from '@graphql-codegen/cli';

const configCodeGen: CodegenConfig = {
  overwrite: true,
  schema: "https://int20h-indexer.onrender.com/graphql",
  documents: "./**/*.tsx",
  generates: {
    "./gql/": {
      preset: "client",
    },
  }
};

export default configCodeGen;
