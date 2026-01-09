import Image from "next/image";
import Button from "../Button";
const Request = ({
    id,
    status,
    image,
    name,
    createdAt,
}: {
    id: string,
    status: string,
    image: string,
    name: string,
    createdAt: string
}) => {
    return (
        <div className="w-full p-4 flex flex-col items-start justify-between bg-black/50 rounded-3xl">
            <div className="flex flex-col items-start gap-y-2">
                <div className="w-20 h-20 relative overflow-hidden rounded-full">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className=" object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm">{name}</h1>
                    <p className="text-xs font-light text-white/20">
                        Joined At: {createdAt}
                    </p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
                <Button icon="/cancel.png" title="Cancel" isLoading={false} onClick={async () => console.log('')} />
                <Button icon="/check-mark.png" title="Aceept" isLoading={false} onClick={async () => console.log('')} />
            </div>
        </div>
    );
}
export default Request;