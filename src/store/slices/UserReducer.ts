import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MAIN_URL } from "../../constants/url";
import { IUser } from "../../types/userTypes";
import { filteredUsers } from "../../utils/functions";

interface IState {
  users: IUser[];
  searchValue: string;
  changedUsers: IUser[];
  deleteUserIds: number[];
  isShowModal: boolean;
  activeUserId: number;
}

export const getUsers = createAsyncThunk<IUser[]>("user/getUsers", async () => {
  try {
    const response = await fetch(MAIN_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Reducer getUsers error");
  }
});

const initialState: IState = {
  users: [],
  changedUsers: [],
  activeUserId: 0,
  searchValue: "",
  deleteUserIds: [],
  isShowModal: false,
};

const AuthReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    removeUserById(state, action) {
      state.changedUsers = state.changedUsers.filter((user) => {
        if (user.id !== action.payload) {
          return user;
        } else {
          state.deleteUserIds.push(user.id);
          return false;
        }
      });
    },
    getSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    filterUsersBySearchValue(state, action) {
      state.changedUsers = filteredUsers(
        state.users,
        action.payload,
        state.deleteUserIds
      );
    },
    resetChanges(state) {
      state.changedUsers = state.users;
      state.deleteUserIds = [];
    },
    handleShowModal(state, action) {
      state.isShowModal = action.payload;
    },
    getActiveUserId(state, action) {
      state.activeUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
        state.changedUsers = action.payload;
      }
    );
  },
});

export const {
  removeUserById,
  getSearchValue,
  filterUsersBySearchValue,
  resetChanges,
  handleShowModal,
  getActiveUserId,
} = AuthReducer.actions;
export default AuthReducer.reducer;
