import type { CodegenConfig } from '@graphql-codegen/cli';

const configCodeGen: CodegenConfig = {
  overwrite: true,
  schema: "https://225c-176-37-228-246.ngrok-free.app/graphql",
  documents: "./**/*.tsx",
  generates: {
    "./gql/": {
      preset: "client",
    },
  }
};

export default configCodeGen;
