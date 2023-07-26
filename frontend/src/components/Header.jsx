import NavDropdown from "./NavDropdown";
import { PiSignInBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-10 bg-[#2f2f2f] text-white py-5 flex justify-between items-center font-semibold">
      <div className="">
        <Link to="/">MERN Auth App</Link>
      </div>
      <div className="flex gap-5 items-center text-[#c2c2c2] font-bold">
        {userInfo ? (
          <NavDropdown userInfo={userInfo} logoutHandler={logoutHandler} />
        ) : (
          <>
            <div className="flex items-center gap-1">
              <div>
                <PiSignInBold />
              </div>
              <div className=" cursor-pointer">
                <Link to="/login">Sign in</Link>
              </div>
            </div>
            <div className=" cursor-pointer bg-[#c2c2c2] text-[#2f2f2f] rounded-lg px-4 py-1">
              <Link to="/register">Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
