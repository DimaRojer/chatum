import type { DirectChat } from "@/types/direct-chat";

export const directChats: DirectChat[] = [
    {
        id: 1,
        userIds: [1, 2],
        messages: [
            {
                id: 1,
                userId: 1,
                text: "Привет! Как дела?",
                time: "09:15",
            },
            {
                id: 2,
                userId: 2,
                text: "Привет! Всё отлично.",
                time: "09:16",
            },
            {
                id: 3,
                userId: 1,
                text: "Что сегодня по задачам?",
                time: "09:18",
            },
            {
                id: 4,
                userId: 2,
                text: "Надо закончить авторизацию и проверить API.",
                time: "09:20",
            },
            {
                id: 5,
                userId: 1,
                text: "Окей, тогда вечером посмотрю.",
                time: "09:22",
            },
        ],
    },

    {
        id: 2,
        userIds: [2, 3],
        messages: [
            {
                id: 6,
                userId: 3,
                text: "Скинул тебе макеты.",
                time: "10:20",
            },
            {
                id: 7,
                userId: 2,
                text: "Вижу, сейчас посмотрю.",
                time: "10:21",
            },
            {
                id: 8,
                userId: 3,
                text: "Особенно глянь новый header.",
                time: "10:21",
            },
            {
                id: 9,
                userId: 2,
                text: "Да, выглядит намного лучше.",
                time: "10:34",
            },
            {
                id: 10,
                userId: 3,
                text: "Тогда оставляем этот вариант.",
                time: "10:36",
            },
            {
                id: 11,
                userId: 2,
                text: "Договорились.",
                time: "10:37",
            },
        ],
    },

    {
        id: 3,
        userIds: [1, 4],
        messages: [
            {
                id: 12,
                userId: 4,
                text: "Ты сегодня будешь на созвоне?",
                time: "11:05",
            },
            {
                id: 13,
                userId: 1,
                text: "Да, буду.",
                time: "11:06",
            },
            {
                id: 14,
                userId: 4,
                text: "Окей, тогда до встречи.",
                time: "11:07",
            },
        ],
    },

    {
        id: 4,
        userIds: [1, 5],
        messages: [
            {
                id: 15,
                userId: 5,
                text: "Я закончил свою задачу.",
                time: "12:30",
            },
            {
                id: 16,
                userId: 1,
                text: "Отлично. Можно отправлять на ревью.",
                time: "12:31",
            },
            {
                id: 17,
                userId: 5,
                text: "Уже отправил 👍",
                time: "12:32",
            },
            {
                id: 18,
                userId: 1,
                text: "Посмотрю в течение часа.",
                time: "12:40",
            },
        ],
    },

    {
        id: 5,
        userIds: [2, 5],
        messages: [
            {
                id: 19,
                userId: 2,
                text: "У тебя случайно нет последней версии API?",
                time: "13:10",
            },
            {
                id: 20,
                userId: 5,
                text: "Есть, сейчас закину.",
                time: "13:12",
            },
            {
                id: 21,
                userId: 2,
                text: "Спасибо.",
                time: "13:13",
            },
        ],
    },

    {
        id: 6,
        userIds: [3, 5],
        messages: [
            {
                id: 22,
                userId: 3,
                text: "Привет, можешь помочь с CSS?",
                time: "14:02",
            },
            {
                id: 23,
                userId: 5,
                text: "Да, кидай код.",
                time: "14:04",
            },
            {
                id: 24,
                userId: 3,
                text: "Вот, проблема с flex.",
                time: "14:06",
            },
            {
                id: 25,
                userId: 5,
                text: "Сейчас посмотрю.",
                time: "14:08",
            },
        ],
    },

    {
        id: 7,
        userIds: [4, 5],
        messages: [
            {
                id: 26,
                userId: 5,
                text: "Когда будет готов новый дизайн?",
                time: "15:15",
            },
            {
                id: 27,
                userId: 4,
                text: "Думаю, к завтрашнему утру.",
                time: "15:18",
            },
        ],
    },

    {
        id: 8,
        userIds: [1, 5],
        messages: [
            {
                id: 28,
                userId: 1,
                text: "Кстати, не забудь про новый канал.",
                time: "16:20",
            },
            {
                id: 29,
                userId: 5,
                text: "Точно, вечером создам.",
                time: "16:22",
            },
        ],
    },
];