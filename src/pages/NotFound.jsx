import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="bg-black-600 flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-black  mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            Oops! Page Not Found
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl 300 mb-12 max-w-2xl mx-auto leading-relaxed">
          The page you're looking for seems to have vanished into the digital
          void. Don't worry, even the best explorers get lost sometimes!
        </p>

        {/* Single Home Button */}
        <div className="flex justify-center">
          <Link
            to="/home"
            className="px-8 py-3  text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2">
            <FaHome />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
