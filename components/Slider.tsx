import { LinkType } from "@/global";
import Url from "./Url";
const Slider = ({ links }: { links: LinkType[] }) => {
    return (
        <div className="flex flex-col items-center gap-6 bg-[#242424] p-3 rounded-full">
            {links.map((link, index) => (
                <Url
                    key={index}
                    direction={link.direction}
                    icon={link.icon}
                    isButton={link.isButton}
                />
            ))}
        </div>
    );
};
export default Slider;