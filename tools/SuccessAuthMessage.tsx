import Image from "next/image";
import Link from "next/link";
const SuccessAuthMessage = ({
    title,
    paragraph,
}: {
    title: string,
    paragraph: string
}) => {
    return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
            <div className="p-5 mx-5 flex flex-col items-center justify-center bg-[#090909] rounded-xl text-center">
                <div className="flex flex-col items-center justify-center gap-y-4 text-white">
                    <Image src={'/check-mark.png'} alt="check mark" width={70} height={70} />
                    <h1 className="font-bold text-3xl">{title}</h1>
                    <p className="text-sm font-light max-w-sm">{paragraph}</p>
                </div>
                <Link href="/auth" className="text-white mt-8 font-extralight underline">
                    Return Back To Auth Page
                </Link>
            </div>
        </div>
    );
}
export default SuccessAuthMessage;