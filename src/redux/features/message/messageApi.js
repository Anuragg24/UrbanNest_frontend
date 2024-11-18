import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';


const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/message`,
    credentials: 'include', // Include credentials like cookies for authentication
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    // Fetch messages for a user by userId
    getMessages: builder.query({
      query: (userId) => ({
        url: `/messages/${userId}`,
        method: 'GET',
      }),
      providesTags: (result) => result
        ? [{ type: 'Messages', id: result.userId }]
        : [],
    }),

    // Submit a contact message
    submitMessage: builder.mutation({
      query: (messageData) => ({
        url: '/contact',
        method: 'POST',
        body: messageData,
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
  }),
});

export const { useGetMessagesQuery, useSubmitMessageMutation } = messageApi;

export default messageApi;
