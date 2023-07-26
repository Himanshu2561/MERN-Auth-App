import { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

const NavDropdown = ({ userInfo, logoutHandler }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative font-semibold">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-1 bg-blue-200 text-[#515151] px-3 py-1 rounded-lg"
      >
        <span>{userInfo?.name}</span>
        <span className={` text-2xl transition ${isOpen ? "rotate-180" : ""}`}>
          <RiArrowDropDownLine />
        </span>
      </button>
      {isOpen ? (
        <>
          <div className="flex flex-col gap-2 right-0 absolute bg-blue-200 text-[#515151] py-2 mt-1 rounded-lg">
            <Link
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              to="/profile"
            >
              <div className="flex items-center justify-between gap-4 py-[2px] px-3 hover:bg-white">
                <div>Profile</div>
                <div>
                  <CgProfile />
                </div>
              </div>
            </Link>
            <div
              onClick={() => {
                logoutHandler();
                setIsOpen(!isOpen);
              }}
              className="flex items-center gap-4 py-[2px] px-3 hover:bg-white cursor-pointer"
            >
              <div>Logout</div>
              <div>
                <BiLogOut />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavDropdown;
