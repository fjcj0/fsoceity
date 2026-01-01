import Media from "@/components/home-components/Media";
import Post from "@/components/home-components/Post";
import { posts } from "@/constants/data";
const HomePage = () => {
    return (
        <div className="w-full flex flex-col items-center max-w-6xl mx-auto">
            <Media />
            <div className="mt-10 w-full grid grid-cols-1 gap-6">
                {posts.map((post, index) => (
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
                ))}
            </div>
        </div>
    );
};
export default HomePage;