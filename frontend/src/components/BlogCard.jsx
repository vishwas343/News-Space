import PropTypes from "prop-types";
import stripText from "../utils/textStrip";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ModeContext } from "../main";

function BlogCard({ heading, id, img, status }) {
  const { mode } = useContext(ModeContext);
  const navigate = useNavigate();

  const overlayStyle = {
    moderation: "bg-gray-500 bg-opacity-30",
    rejected: "bg-red-500 bg-opacity-30",
  }[status] || "";

  return (
    <div
      className={`relative duration-200 rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2 md:ml-10 md:mr-10 ${
        mode === "light" ? "bg-white" : "bg-secDark"
      }`}
    >
      {overlayStyle && (
        <div
          className={`absolute inset-0 ${overlayStyle} z-10 pointer-events-none`}
        ></div>
      )}
      <div
        className={`relative ${overlayStyle ? "bg-transparent" : ""} ${
          mode === "light" ? "text-black" : "text-white"
        }`}
        onClick={() => navigate(`/news/${id}`, { state: { id } })}
      >
        <div className="flex pt-4 pb-4 items-center">
          <div className="flex-shrink-0">
            <img
              src={
                img ||
                "https://static.toiimg.com/thumb/imgsize-21670,msid-113238540,width-400,resizemode-4/113238540.jpg"
              }
              alt=""
              className="rounded-xl h-[107px] w-[105px]"
            />
          </div>
          <div className="text-[13px] lg:text-xl md:ml-5 ml-2 mr-2 text-left flex-grow">
            <p className="whitespace-normal break-words">
              {stripText(heading, 300)} {/* Increase character limit here */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  heading: PropTypes.string.isRequired,
  user: PropTypes.shape({
    img: PropTypes.string,
    username: PropTypes.string, // Removed from rendering
  }).isRequired,
  id: PropTypes.string.isRequired,
  img: PropTypes.string,
  status: PropTypes.string.isRequired,
};

export default BlogCard;
