import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Redirect = () => {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    count === 0 && navigate("/auth");

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="vh-100 gradient-custom">
      <h2 className="mt-7">
        Unauthorized!!!! <br></br>Redirecting you to homepage in {count} seconds
      </h2>
    </div>
  );
};

export default Redirect;
