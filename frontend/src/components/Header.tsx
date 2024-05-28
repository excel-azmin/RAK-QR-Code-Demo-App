import { Link } from "react-router-dom";

type Props = {};

const Header = ({}: Props) => {
  return (
    <div className="bg-gray-200  w-screen ">
      <div className="flex justify-between items-center container">
        <Link to={"/"} className="p-4 font-medium ">
          <img src="/arccaps.png" alt="" className="h-12" />
        </Link>
        <Link to={"/"} className="p-4 font-medium ">
          QR Code (Demo App)
        </Link>
      </div>
    </div>
  );
};

export default Header;
