import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteMutation, useUpdateMutation } from "../slices/usersApiSlice";
import { logout, setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProfileApiCall, { isLoading: loadingUpdate }] =
    useUpdateMutation();
  const [deleteProfileApiCall, { isLoading: deleteUpdate }] =
    useDeleteMutation();

  // Getting data using useSelector from auth state.
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("Passwords do not match");
    } else if (
      name == userInfo.name &&
      email == userInfo.email &&
      password === ""
    ) {
      toast.error("Please update atleast one field");
    } else {
      try {
        const res = await updateProfileApiCall({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials({ ...res }));

        toast.success("Profile updated");
      } catch (err) {
        if (err?.status == 500) {
          toast.error("Password length must be greater than 8");
        } else {
          toast.error(err?.data?.message || err.error);
        }
      }
    }
  };

  const deleteUserProfile = async () => {
    try {
      window.alert("Are you sure you want to delete your profile?");

      const res = await deleteProfileApiCall().unwrap();
      dispatch(logout());

      navigate("/");
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Update Profile
          </h1>
          <form
            onSubmit={updateProfileHandler}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="full name"
                autoComplete="true"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                autoComplete="true"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                autoComplete="false"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm password
              </label>
              <input
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                }}
                value={confirmPass}
                type="confirm-password"
                name="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                autoComplete="false"
              />
            </div>
            {loadingUpdate && <Loader />}
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
            >
              Update
            </button>
          </form>
          {deleteUpdate && <Loader />}
          <button
            onClick={deleteUserProfile}
            className="w-full uppercase text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
          >
            Delete profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
