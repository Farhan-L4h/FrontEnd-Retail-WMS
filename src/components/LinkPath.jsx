import { useLocation } from "react-router-dom";

export default function LinkPath() {
  const location = useLocation();
  const linkPath = `${location.pathname}>`;

  return <h3 className="text-start text-2xl font-medium text-gray-600 my-5">{linkPath}</h3>;
}
