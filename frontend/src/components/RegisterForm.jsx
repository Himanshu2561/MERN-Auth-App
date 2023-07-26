import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerApiCall, { isLoading }] = useRegisterMutation();

  // Getting data using useSelector from auth state.
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await registerApiCall({ name, email, password }).unwrap();

        dispatch(setCredentials({ ...res }));

        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create an account
        </h1>
        <form onSubmit={registerHandler} className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Your name
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Full name"
              required={true}
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
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required={true}
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
              type="password"
              name="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required={true}
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
              type="confirm-password"
              name="confirm-password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required={true}
              autoComplete="false"
            />
          </div>
          {isLoading && <Loader />}
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
