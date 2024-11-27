import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserRequest {
  _id: string; // Add _id to identify the user
  name?: string;
  email?: string;
  password?: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    allUsers: builder.query<User[], void>({
      query: () => `${USERS_URL}/allusers`,
    }),
    updateUser: builder.mutation<UserResponse, UpdateUserRequest>({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
