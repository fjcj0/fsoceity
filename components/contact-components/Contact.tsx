import Image from "next/image";
import Button from "../Button";
const Contact = ({
    name,
    profilePicture,
    isSent,
    isPending,
    isAccepted,
    date,
}: {
    name: string;
    profilePicture: string;
    isSent: boolean;
    isPending: boolean;
    isAccepted: boolean;
    date: string;
}) => {
    return (
        <div className="w-full p-4 flex max-lg:flex-col items-start lg:items-center justify-between bg-black/50 rounded-3xl">
            <div className="flex flex-col items-start gap-y-2 lg:w-[30%]">
                <div className="w-20 h-20 relative overflow-hidden rounded-full">
                    <Image
                        src={profilePicture}
                        alt={name}
                        fill
                        className=" object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm">{name}</h1>
                    <p className="text-xs font-light text-white/20">
                        Joined At: {date}
                    </p>
                </div>
            </div>
            <div className="lg:w-[70%] max-lg:mt-7 lg:self-end lg:ml-2">
                {!isSent && !isPending && !isAccepted && (
                    <Button
                        icon="/add-user.png"
                        title="Add To Contacts"
                        isLoading={false}
                        onClick={async () => console.log("Send request")}
                    />
                )}
                {isAccepted && (
                    <Button
                        icon="/delete.png"
                        title="Remove Contact"
                        isLoading={false}
                        onClick={async () => console.log("Remove Contact")}
                    />
                )}
                {isPending && (
                    <Button
                        icon="/cancel.png"
                        title="Cancel Request"
                        isLoading={false}
                        onClick={async () => console.log("Cancel Request")}
                    />
                )}
            </div>
        </div>
    );
};
export default Contact;