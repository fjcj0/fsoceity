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
                <button type="button" className="flex items-center mr-3 justify-center relative cursor-pointer">
                    <Image src={'/bell.png'} width={30} height={30} alt="bell icon" />
                    <div className="flex items-center justify-center absolute bg-red-500 w-3 h-3 rounded-full right-0.5  -top-1 bottom-0">
                        <p className="" style={{ fontSize: 7 }}>0</p>
                    </div>
                </button>
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