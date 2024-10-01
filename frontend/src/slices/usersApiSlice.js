//here we write all the endpoints to work with the backend
import { apiSlice } from "./apiSlice.js";

const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        })
    })
})

//there is a specific convention in exporting the mutations and queries.
// for mutations -> use-NameOfMutation-Mutation 
// for query -> use-NameOfQuery-Query
export const {useLoginMutation} = userApiSlice;