import { useEffect, useState } from "react";
import { vkyreq } from "../utils/vkyreq";

function Categories({ onSelectCategory }) {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("general");

    // Fetch tags on component load
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const categories = await vkyreq("get", "/posts/tags/gettags");
                setTags(categories.data.data); // Fetch the tags from backend
            } catch (error) {
                console.log(error);
            }
        };

        fetchTags();
    }, []);

    // Handle tag selection and update parent component
    const handleTagSelection = (tag) => {
        setSelectedTag(tag);
        onSelectCategory(tag); // Pass selected category back to the parent component (Blogs)
    };

    return (
        <div className="p-4">
            {/* Tags section */}
            <div className="flex overflow-x-auto space-x-4 mb-4">
                <button
                    onClick={() => handleTagSelection("general")} // "General" for all news
                    className={`px-4 py-2 ${
                        selectedTag === "general"
                            ? "bg-gray-700 text-white"
                            : "bg-blue-500 text-white"
                    } rounded-lg hover:bg-blue-600 transition-colors`}
                >
                    General
                </button>

                {tags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => handleTagSelection(tag)}
                        className={`px-4 py-2 ${
                            selectedTag === tag
                                ? "bg-gray-700 text-white"
                                : "bg-blue-500 text-white"
                        } rounded-lg hover:bg-blue-600 transition-colors`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Categories;
