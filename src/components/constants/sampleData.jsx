import { Avatar } from "@mui/material";

export const SampleChats = [{
    avatar: [<Avatar/>],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"]
},
{
    avatar: [<Avatar/>, <Avatar/>, <Avatar/>],
    name: "John Doe",
    _id: "2",
    groupChat: true,
    members: ["1", "2"]
}]

export const SampleUsers = [{
    avatar: [<Avatar/>],
    name: "John Doe",
    _id: "1",
},
{
    avatar: [<Avatar/>],
    name: "John Doe",
    _id: "2",
}]

export const SampleNotifications = [{
    sender:{
        avatar: [<Avatar/>],
        name: "John Doe",
    },
    _id: "1",
},
{
    sender:{
        avatar: [<Avatar/>],
        name: "John Doe",
    },
    _id: "2",
}]

export const sampleMessage = [
    {
        attachments: [
            {
                public_id: "asdsad",
                url: "https://www.w3school.com/howto/img_avatar.png",
            },
        ],
        content: "Kuch bhi message",
        _id: "ddkjsdlkfjdslkjlssf",
        sender:{
            _id: "user._id",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2025-02-12T10:41:30.6302",
    },

    {
        attachments: [
            {
                public_id: "asdsad2",
                url: "https://www.w3school.com/howto/img_avatar.png",
            },
        ],
        content: "Kuch bhi message",
        _id: "ksdjklasa",
        sender:{
            _id: "ksdjklas",
            name: "Chaman2",
        },
        chat: "chatId2",
        createdAt: "2025-02-12T10:41:30.6302",
    },
]

export const dashboardData = {
    users:[
        {
            avatar: [<Avatar/>],
            name: "John Doe",
            _id: "1",
            username: "john_doe",
            friends: 20,
            groups: 5,
            email: "john@gmail.com"
        },
        {
            avatar: [<Avatar/>],
            name: "John Doe",
            _id: "2",
            username: "john_doe",
            friends: 20,
            groups: 5,
            email: "john@gmail.com"
        }
    ],

    chats:[
        {
            avatar: [<Avatar/>],
            name: "John ",
            _id: "2",
            groupChat: false,
            members: [{_id:"1", avatar:""}, {_id:"2", avatar:""}],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                avatar: [<Avatar/>],
                name: "John Doe",
            }
        },
    {
            avatar: [<Avatar/>],
            name: "John 2",
            _id: "2",
            groupChat: false,
            members: [{_id:"1", avatar:""}, {_id:"2", avatar:""}],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                avatar: [<Avatar/>],
                name: "John Doe",
            }
        },
    ],
    messages:[
        {
            attachments: [],
            content: "Kuch bhi likh do",
            _id: "kjdakllkssss",
            sender: {
                name: "John 2",
                avatar: "",
            },
            chat: "chatId",
            groupChat: false,
            createdAt: "2024-02-12T10:41:30.6302"
        },
        {
            attachments: ["https://www.w3school.com/home.png"],
            content: "Kuch bhi likh do",
            _id: "kjdakllksss",
            sender: {
                name: "John 2",
                avatar: "",
            },
            chat: "chatId",
            groupChat: true,
            createdAt: "2024-02-12T10:41:30.6302"
        }
    ]
}