import { mobile_links } from "@/constants/data";
import { X } from "lucide-react";
import UrlMobile from "./UrlMobile";
import useHeaderStore from "@/store/HeaderStore";
const SliderMobile = () => {
    const { toggleHeaderSlide } = useHeaderStore();
    return (
        <div className="w-full flex flex-col items-start justify-start">
            <button type="button" onClick={toggleHeaderSlide} className="cursor-pointer active:opacity-50 active:scale-75 duration-300 ease-in-out transition-all">
                <X color="white" size={25} />
            </button>
            <div className="mt-5 bg-[#242424] w-full flex flex-col items-start justify-start">
                {mobile_links.map((mobile_link, index) => (
                    <UrlMobile
                        key={index}
                        title={mobile_link.title}
                        icon={mobile_link.icon}
                        direction={mobile_link.direction}
                    />
                ))}
            </div>
        </div>
    );
}
export default SliderMobile;