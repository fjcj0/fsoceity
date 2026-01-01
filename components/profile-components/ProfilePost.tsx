import Image from "next/image";
import Button from "../Button";
export const ProfilePost = ({ image, par }: { image?: string; par?: string }) => {
    return (
        <div className="w-full bg-black flex flex-col items-end justify-end p-3 gap-y-5 rounded-xl">
            {image ? (
                <div className="relative w-full">
                    <Image
                        src={image}
                        alt={par ?? "User post image"}
                        width={200}
                        height={200}
                        className="object-cover rounded-xl"
                    />
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <h1 className="text-center text-xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
                        <span>This Post Doesn't Contain <br /></span>
                        <span>Any Picture<br /></span>
                    </h1>
                </div>
            )}
            {par && (
                <div className="flex flex-col items-center justify-between w-full gap-3">
                    <p className="text-white text-sm line-clamp-2">{par}</p>
                    <Button
                        title="Delete Post"
                        icon="/trash.png"
                        isLoading={false}
                        onClick={async () => console.log("Delete this post")}
                    />
                </div>
            )}
        </div>
    );
};