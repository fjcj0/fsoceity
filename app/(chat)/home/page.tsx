import Media from "@/components/home-components/Media";
import Post from "@/components/home-components/Post";
import { posts } from "@/constants/data";
const HomePage = () => {
    return (
        <div className="w-full flex-col mx-auto items-center justify-center max-w-6xl">
            <Media />
            <div className="mt-10 gap-y-5 flex flex-col">
                {
                    posts.map((post, index) => (
                        <Post
                            key={index}
                            name={post.name}
                            profilePicture={post.profilePicture}
                            paragraph={post.paragraph}
                            image={post.image}
                            likesNumber={post.likesNumber}
                            isLiked={post.isLiked ?? false}
                            isBookMarked={post.isBookMarked}
                        />
                    ))
                }
            </div>
        </div>
    );
}
export default HomePage;