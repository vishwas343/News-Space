// import profile from "../assets/profile.png";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../loading/BlogCard/BlogCardSkeleton";
import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";
import { vkyreq } from "../utils/vkyreq";
import Categories from "../components/Categories";

function Blogs() {
  const { mode } = useContext(ModeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);

  // Function to fetch news based on selected category
  const fetchNews = async (category) => {
    setIsLoading(true);

    try {
      if (category === "general") {
        // Fetch all news from /posts if "General" is selected
        const res = await vkyreq("get", "/posts");
        setBlogData(res.data.data);
      } else {
        // Fetch news related to the selected tag
        const res = await vkyreq("post", "/posts/tags", {
          tags: [category], // Send selected tag in the body
        });
        setBlogData(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch general news by default on component load
    fetchNews("general");
  }, []);

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen`}
    >
      <div className="font-bold text-[30px] ml-5">News Articles</div>
      
      <Categories onSelectCategory={fetchNews} /> {/* Pass fetchNews to Categories */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-3 md:mt-8 w-full">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          : blogData.map((blogInfo) => (
              <div className="space-y-5 md:space-y-6" key={blogInfo._id}>
                <BlogCard
                  id={blogInfo._id}
                  heading={blogInfo.heading}
                  user={blogInfo.user}
                  like={blogInfo.like}
                  img={blogInfo.img}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Blogs;
