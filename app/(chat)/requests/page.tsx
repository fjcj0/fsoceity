"use client";
import Input from "@/components/Input";
import Request from "@/components/request-components/Request";
import { FriendRequestType } from "@/global";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import LoaderComponent from "@/tools/LoaderComponent";
axios.defaults.withCredentials = true;
const page = () => {
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorName, setErrorName] = useState("");
    const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);
    const [hasFetched, setHasFetched] = useState(false);
    const fetchRequests = useCallback(async (query: string) => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                query
                    ? `/api/auth/display-recives?name=${query}`
                    : `/api/auth/display-recives`
            );
            setFriendRequests(res.data.recives);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setHasFetched(true);
        }
    }, []);
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchRequests(name.trim());
        }, 500);
        return () => clearTimeout(timeout);
    }, [name, fetchRequests]);
    return (
        <div className="flex flex-col gap-y-5">
            <Input
                placeholder="Enter name"
                value={name}
                setValue={setName}
                errorState={errorName}
                setErrorState={setErrorName}
                type="text"
                isPassword={false}
            />
            {isLoading && (
                <div className="grid md:grid-cols-4 grid-cols-1 gap-3 w-full">
                    {
                        Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map((arr, index) => (
                            <LoaderComponent key={index} />
                        ))
                    }
                </div>)}
            {!isLoading && hasFetched && (
                <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 w-full">
                    {friendRequests.length === 0 ? (
                        <h1 className="text-center col-span-full text-sm text-white/50">
                            No friend requests found
                        </h1>
                    ) : (
                        friendRequests.map((req) => (
                            <Request
                                key={req.sender.id}
                                name={req.sender.name}
                                createdAt={req.sender.createdAt}
                                image={req.sender.profilePicture}
                                id={req.sender.id}
                                setFriendRequests={setFriendRequests}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
export default page;