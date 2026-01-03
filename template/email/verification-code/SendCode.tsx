import { NumericString } from "@/global";
import Image from "next/image";

const SendCode = ({
    code
}: {
    code: NumericString
}) => {
    return (
        <div className="w-screen min-h-screen bg-black flex flex-col items-start justify-start">
            <div className="image w-full">
                <Image src={'/fsoceity.png'} width={400} height={400} alt="logo" />
            </div>
            <div className=" flex flex-col">
                <p className="text-white font-bold text-3xl">Fsoceity</p>
                <p className="text-white font-bold text-sm">
                    Your code verfication: {code}
                </p>
            </div>
        </div>
    );
}
export default SendCode;