import Image from "next/image";
const Notification = ({
    picture,
    action,
    by,
}: {
    picture: string;
    action: string;
    by: string;
}) => {
    return (
        <div className="w-full px-3 py-2 flex gap-2 items-start text-black hover:bg-gray-100">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                <Image src={picture} alt={by} fill className="object-cover" />
            </div>

            <div className="flex flex-col items-start justify-start">
                <p style={{ fontSize: 13 }}>{action}</p>
                <p className="text-black/65 font-light" style={{ fontSize: 10 }}>by {by}</p>
            </div>
        </div>
    );
};
export default Notification;