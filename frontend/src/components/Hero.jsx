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
        <div className="flex items-center justify-center text-black capitalize font-semibold underline">
          You are succesfully logged in {userInfo.name}
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
      <div className=" text-xs flex flex-col gap-5 px-10 py-5 text-justify font-semibold text-gray-700">
        <div>
          At the heart of our platform lies the ingenious use of
          <b> JWT (JSON Web Tokens)</b>, which ensures secure and reliable
          authentication. Unlike traditional token storage methods, we have
          implemented an <b>HTTP-Only cookie strategy</b> to securely store
          JWTs, providing an extra layer of protection against cross-site
          scripting (XSS) attacks.
        </div>
        <div>
          To enhance the application's state management and streamline data
          flow, we have integrated <b>Redux Toolkit</b>. This powerful library
          empowers us to efficiently manage the global state, enabling faster
          rendering of components and creating a smoother user interface.
        </div>
        <div>
          But we didn't stop there. Our user interface is designed with a focus
          on user experience, thanks to the integration of the
          <b> Tailwind CSS library</b>. Tailwind CSS allows us to craft stunning,
          responsive, and customized UI elements, ensuring an intuitive and
          visually pleasing experience for every user.
        </div>
        <div>
          With a relentless commitment to security, performance, and user
          satisfaction, <b>MERN Auth App</b> aims to redefine the way
          authentication systems work. We have taken every measure to protect
          user data while delivering a seamless and enjoyable authentication
          process. Experience the future of secure authentication with{" "}
          <b> MERN Auth App</b>.
        </div>
        <div>
          Get ready to explore a whole new level of user interaction and
          authentication like never before. Stay tuned for an unparalleled web
          experience that prioritizes your security and convenience.
        </div>
      </div>
    </div>
  );
};

export default Hero;
