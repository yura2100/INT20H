import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from '@/gql'
import { INDEXER_URL } from "@/web3/constants";

const projectQueryDocument = graphql(`query Project($id: BigInt!) {
  project(id: $id) {
    name
    createdAt
    expiresAt
    creator {
      address
      email
      name
      role
    }
    description
    maxAssignments
    assignments {
      items {
        id
        data
        status
        student
        gradesCount
      }
    }
    userProjectRelation {
      items {
        user {
          role
          name
          email
          address
        }
      }
    }
    token
    reward
    id
  }
}
`)

export function useProjectQuery(id: number) {
  return useQuery({
    refetchInterval: 5000,
    queryKey: ['project', id],
    queryFn: async () =>
      request(
        INDEXER_URL,
        projectQueryDocument,
        {id}
      ),
  })
}
