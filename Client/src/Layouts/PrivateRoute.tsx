import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import Redirect from "../components/Redirect";

const PrivateRoute = ({ children }: { children: any }) => {
  const { userAuthToken } = useSelector(selectAuth);
  const { userRefreshToken } = useSelector(selectAuth);
  return userAuthToken || userRefreshToken ? children : <Redirect />;
};

export default PrivateRoute;
