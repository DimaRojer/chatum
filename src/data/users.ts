import type { User } from "@/types/user";

export const users: User[] = [
    {
        id: 1,
        name: "Сара Ким",
        email: "sara.kim@acmecorp.com",
        role: "Product Designer",
        avatar: "/1.jpg",
        description: "I love India",
        status: "online",
        settings: {
            account: {
                twoFactorEnabled: false,
            },
            language: {
                language: "ru",
                dateFormat: "31.12.2000",
                timeFormat: "14:30",
            },
        },
    },
    {
        id: 2,
        name: "Майк Торрез",
        email: "mike.torrez@acmecorp.com",
        role: "Frontend Developer",
        avatar: "/2.jpg",
        description: "Just Chill",
        status: "offline",
        settings: {
            account: {
                twoFactorEnabled: false,
            },
            language: {
                language: "ru",
                dateFormat: "31.12.2000",
                timeFormat: "14:30",
            },
        },
    },
    {
        id: 3,
        name: "Гамлет Волков",
        email: "hamlet.volkov@acmecorp.com",
        role: "Backend Developer",
        avatar: "/3.jpg",
        description: "qwer",
        status: "away",
        settings: {
            account: {
                twoFactorEnabled: false,
            },

            language: {
                language: "ru",
                dateFormat: "31.12.2000",
                timeFormat: "14:30",
            },
        },
    },
    {
        id: 4,
        name: "Джеймс Парк",
        email: "james.park@acmecorp.com",
        role: "Product Manager",
        avatar: "/4.jpg",
        description: "i need water",
        status: "online",
        settings: {
            account: {
                twoFactorEnabled: false,
            },
            language: {
                language: "ru",
                dateFormat: "31.12.2000",
                timeFormat: "14:30",
            },
        },
    },
    {
        id: 5,
        name: "Дима Гуленков",
        email: "dima.gulenkov@acmecorp.com",
        role: "Frontend Developer",
        avatar: "/dr.jpg",
        description: "Gamarjoba",
        status: "away",
        settings: {
            account: {
                twoFactorEnabled: false,
            },
            language: {
                language: "ru",
                dateFormat: "31.12.2000",
                timeFormat: "14:30",
            },
        },
    },
];