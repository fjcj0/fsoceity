import Image from "next/image";

const SendLink = ({
    link
}: {
    link: string
}) => {
    return (
        <div className="w-screen min-h-screen bg-black">
            <div className="image w-full">
                <Image src={'/fsoceity.png'} width={400} height={400} alt="logo" />
            </div>
            <div className=" flex flex-col">
                <p className="text-white font-bold text-3xl">Fsoceity</p>
                <div className="flex items-center font-bold justify-center">
                    <a href={link} className="font-bold p-3 bg-gray-600/20">Reset Password</a>
                </div>
            </div>
        </div>
    );
}
export default SendLink;