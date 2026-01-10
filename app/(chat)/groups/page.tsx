"use client";
import Group from "@/components/group-components/Group";
import Input from "@/components/Input";
import { dummyGroups } from "@/constants/data";
import { useState } from "react";
const page = () => {
    let devloplemt = true;
    const [groupName, setGroupName] = useState<string>("");
    const [errorGroupName, setErrorGroupName] = useState<string>("");
    const [filter, setFilter] = useState<"All" | "Joined" | "Pending" | "Created" | "NotJoined">("All");
    const filteredGroups = dummyGroups.filter((group) => {
        switch (filter) {
            case "Joined":
                return group.isJoined;
            case "Pending":
                return group.isPending;
            case "Created":
                return group.isCreated;
            case "NotJoined":
                return !group.isJoined && !group.isPending && !group.isCreated;
            default:
                return true;
        }
    });
    if (devloplemt) return (
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="font-bold text-3xl md:text-5xl">Under development</h1>
        </div>
    )
    return (
        <div className="flex flex-col items-start justify-start p-4 w-full">
            <div className="flex items-center justify-start w-full gap-x-2 mb-6">
                <Input
                    placeholder="Enter group name"
                    value={groupName}
                    setValue={setGroupName}
                    errorState={errorGroupName}
                    setErrorState={setErrorGroupName}
                    type="text"
                    isPassword={false}
                />
                <select
                    className="px-2 py-2 rounded-xl bg-black/50"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                >
                    <option value="All">All</option>
                    <option value="Joined">Joined</option>
                    <option value="Pending">Pending</option>
                    <option value="Created">Created</option>
                    <option value="NotJoined">Not Joined</option>
                </select>
            </div>

            {/* قائمة المجموعات */}
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5 w-full">
                {filteredGroups
                    .filter((group) =>
                        group.name.toLowerCase().includes(groupName.toLowerCase())
                    )
                    .map((group, index) => (
                        <Group key={index} {...group} />
                    ))}
            </div>
        </div>
    );
};
export default page;