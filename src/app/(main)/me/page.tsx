"use client";

import { useState } from "react";

import { Search } from "@/components/ui/Search/Search";
import { UserList } from "@/components/UserList/UserList";

import { users } from "@/data/users";
import { directChats } from "@/data/directChats";
import { currentUserId } from "@/data/currentUser";

export default function Page() {
    const [search, setSearch] = useState("");
    
const myChats = directChats.filter(
    (chat) => chat.userIds.includes(currentUserId)
);    const chatUserIds = myChats.map((chat) => chat.userIds.find( (userId) => userId !== currentUserId)!);
    const chatUsers = users.filter((user) => chatUserIds.includes(user.id));
    const filteredUsers = chatUsers.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="px-4">
            <Search value={search} onChange={setSearch}/>
            <div className="mt-6">
                <UserList users={filteredUsers} variant="compact"/>
            </div>
        </div>
    );
}