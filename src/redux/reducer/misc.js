import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSearch: false,
    isNotification: false, 
    isAddMember: false,
    isNewGroup: false,
    isMobile: false,
    isFileMenu: false,
    isDeleteMenu: false,
    uploadingLoader: false,
    selectedDeleteChat: {
        chatId: "",
        groupChat: false
    }
}

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload
        },
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload
        },
    }
})

export default miscSlice
export const { setIsAddMember, setIsDeleteMenu, setIsFileMenu, setIsMobile, setIsNewGroup, setIsNotification, setIsSearch, setSelectedDeleteChat, setUploadingLoader } = miscSlice.actions