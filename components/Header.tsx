import Image from "next/image";
import Button from "./Button";
import { List } from "lucide-react";
import useHeaderStore from "@/store/HeaderStore";
import useAuthStore from "@/store/AuthStore";
const Header = () => {
    const { logout } = useAuthStore();
    const { toggleHeaderSlide } = useHeaderStore();
    return (
        <div className="w-full mb-10 flex items-center justify-between">
            <div className="flex items-center justify-center">
                <Image src={'/fsoceity.png'} width={60} height={60} alt="icon" />
            </div>
            <div className="flex items-center justify-center gap-3">
                <Button
                    title="logout"
                    onClick={logout}
                    isLoading={false}
                    icon="/logout.png"
                />
                <button type="button" onClick={toggleHeaderSlide} className="cursor-pointer active:opacity-50 active:scale-75 duration-300 transition-all md:hidden">
                    <List />
                </button>
            </div>
        </div>
    )
}
export default Header;