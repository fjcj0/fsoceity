import Image from "next/image";
import Button from "./Button";

const Header = () => {
    return (
        <div className="w-full mb-10 flex items-center justify-between">
            <div className="flex items-center justify-center">
                <Image src={'/fsoceity.png'} width={60} height={60} alt="icon" />
            </div>
            <div>
                <Button
                    title="logout"
                    onClick={async () => console.log('logout')}
                    isLoading={false}
                    icon="/logout.png"
                />
            </div>
        </div>
    )
}
export default Header;