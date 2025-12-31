import { Camera } from "lucide-react";
const NothingToAppear = ({ header, par }: {
    header: string
    par: string
}) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className=" rounded-full border border-white w-34 h-34 flex items-center justify-center">
                <Camera size={80} />
            </div>
            <div className="flex flex-col mt-8 items-center justify-center w-full gap-y-3">
                <h1 className="md:text-5xl text-xl text-white font-bold">{header}</h1>
                <p className="text-white/50 text-sm font-light">{par}</p>
            </div>
        </div>
    );
}
export default NothingToAppear