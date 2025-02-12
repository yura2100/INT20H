"use client";

import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from '@/gql'
import { INDEXER_URL } from "@/web3/constants";

const allProjectsWithVariablesQueryDocument = graphql(`
  query allProjectsWithVariablesQueryDocument {
  projects {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    items {
      description
      expiresAt
      id
      maxAssignments
      name
      reward
      token
    }
  }
}
`)

export function useAllProjectsWithVariablesQuery() {
  return useQuery({
    initialData: { projects: {items: [], totalCount: 0, pageInfo: { hasPreviousPage: false, hasNextPage: false }},},
    queryKey: ['projects'],
    refetchInterval: 5000,
    queryFn: async () =>{
      return request(
        INDEXER_URL,
        allProjectsWithVariablesQueryDocument,
        {}
      )
    }
  })
}
