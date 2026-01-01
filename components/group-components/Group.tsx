import Image from "next/image";
import Button from "../Button";
const Group = ({
    name,
    groupPicture,
    isJoined,
    isPending,
    isCreated,
    createdAt,
}: {
    name: string;
    groupPicture: string;
    isJoined: boolean;
    isPending: boolean;
    isCreated: boolean;
    createdAt: string;
}) => {
    return (
        <div className="w-full p-4 flex max-lg:flex-col items-start lg:items-center justify-between bg-black/50 rounded-3xl">
            <div className="flex flex-col items-start gap-y-2 lg:w-[30%]">
                <div className="w-20 h-20 relative overflow-hidden rounded-full">
                    <Image
                        src={groupPicture}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm">{name}</h1>
                    <p className="text-xs font-light text-white/20">
                        Created At: {createdAt}
                    </p>
                </div>
            </div>
            <div className="lg:w-[70%] max-lg:mt-7 lg:self-end lg:ml-2">
                {!isJoined && !isPending && !isCreated && (
                    <Button
                        icon="/add-user.png"
                        title="Join Group"
                        isLoading={false}
                        onClick={async () => console.log("Send join request")}
                    />
                )}
                {isJoined && (
                    <Button
                        icon="/logout.png"
                        title="Leave Group"
                        isLoading={false}
                        onClick={async () => console.log("Leave group")}
                    />
                )}
                {isPending && (
                    <Button
                        icon="/cancel.png"
                        title="Cancel Request"
                        isLoading={false}
                        onClick={async () => console.log("Cancel join request")}
                    />
                )}
                {isCreated && (
                    <Button
                        icon="/delete.png"
                        title="Delete Group"
                        isLoading={false}
                        onClick={async () => console.log("Delete group")}
                    />
                )}
            </div>
        </div>
    );
};
export default Group;