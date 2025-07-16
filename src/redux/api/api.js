import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../components/constants/config'

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/`,
    credentials: "include"
  }),
  tagTypes: ["Chat", "User", "Message", "Admin"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => `chat/me`,
      providesTags: ["Chat"]
    }),

    searchUser: builder.query({
        query: (name) => `user/search?name=${name}`,
        providesTags: ["User"]
    }),

    sendFriendRequest: builder.mutation({
        query: (data) => ({
            url: "user/sendrequest",
            method: "PUT",
            body: data
        }),
        invalidatesTags: ["User"]
    }),

    getNotification: builder.query({
        query: () => "user/notifications",
        keepUnusedDataFor: 0
    }),

    acceptFriendRequest: builder.mutation({
        query: (data) => ({
            url: "user/acceptrequest",
            method: "PUT",
            body: data
        }),
        invalidatesTags: ["Chat"]
    }),

    chatDetails: builder.query({
      query: ({chatId, populate = false}) => {
        let url = `chat/${chatId}`
        if(populate) url+="?populate=true"
        return {
          url
        }
      },
      providesTags: ["Chat"]
    }),

    getMessages: builder.query({
      query: ({chatId, page}) => `chat/message/${chatId}?page=${page}`,
      keepUnusedDataFor: 0
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
          url: "chat/message",
          method: "POST",
          body: data
      }),
    }),

  availableFriends: builder.query({
    query: (chatId) => {
      let url = "user/friends"
      if(chatId) url+=`?chatId=${chatId}`
      return {
        url
      }
    },
    providesTags: ["Chat"]
  }),

  myGroups: builder.query({
    query: () => `chat/me/groups`,
    providesTags: ["Chat"]
  }),

  newGroup: builder.mutation({
    query: ({name, members}) => ({
      url: "chat/new",
      method: "POST",
      body: {name, members}
    }),
    invalidatesTags: ["Chat"]
  }),

  renameGroup: builder.mutation({
    query: ({chatId, name}) => ({
      url: `chat/${chatId}`,
      method: "PUT",
      body: {name}
    }),
    invalidatesTags: ["Chat"]
  }),

  removeGroupMember: builder.mutation({
    query: ({chatId, userId}) => ({
      url: `chat/removeMember`,
      method: "PUT",
      body: {chatId, userId}
    }),
    invalidatesTags: ["Chat"]
  }),

  addGroupMembers: builder.mutation({
    query: ({members, chatId}) => ({
      url: `chat/addMembers`,
      method: "PUT",
      body: {members, chatId}
    }),
    invalidatesTags: ["Chat"]
  }),

  deleteChat: builder.mutation({
    query: (chatId) => ({
      url: `chat/${chatId}`,
      method: "DELETE",
    }),
    providesTags: ["Chat"]
  }),

  leaveGroup: builder.mutation({
    query: (chatId) => ({
      url: `chat/leave/${chatId}`,
      method: "DELETE",
    }),
    providesTags: ["Chat"]
  }),
   
  getStats: builder.query({
    query: () => "admin/stats",
    providesTags: ["Admin"]
  }),

  getUserData: builder.query({
    query: () => "admin/users",
    providesTags: ["Admin"]
  }),

  getChatData: builder.query({
    query: () => "admin/chats",
    providesTags: ["Admin"]
  }),

  getMessageData: builder.query({
    query: () => "admin/messages",
    providesTags: ["Admin"]
  })

  })
})

export default api
export const { useMyChatsQuery, useLazySearchUserQuery, useSendFriendRequestMutation, useGetNotificationQuery, useAcceptFriendRequestMutation, useChatDetailsQuery, useGetMessagesQuery, useSendAttachmentsMutation, useMyGroupsQuery, useAvailableFriendsQuery, useNewGroupMutation, useRenameGroupMutation, useRemoveGroupMemberMutation, useAddGroupMembersMutation, useDeleteChatMutation, useLeaveGroupMutation, useGetStatsQuery, useGetUserDataQuery, useGetChatDataQuery, useGetMessageDataQuery } = api
