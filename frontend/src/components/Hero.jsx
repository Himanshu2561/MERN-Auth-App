import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-center items-center flex-col gap-5 w-[60%] mx-auto text-center mt-10 bg-blue-100 rounded-sm border border-gray-300 px-5 py-10">
      <div className=" text-2xl font-semibold">MERN Authentication</div>
      <div className=" text-lg">
        This is a MERN authentication that stores a JWT in an HTTP-Only cookie.
        It also uses Redux Toolkit and the Tailwind CSS library
      </div>
      {userInfo ? (
        <div className="flex items-center justify-center text-black uppercase font-semibold">
          You are logged in
        </div>
      ) : (
        <div className="flex items-center gap-4 text-white font-semibold">
          <div className=" py-2 px-4 bg-blue-400 rounded-lg cursor-pointer">
            <Link to="/login">Sign In</Link>
          </div>
          <div className=" py-2 px-4 bg-[#2f2f2f] rounded-lg cursor-pointer">
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
