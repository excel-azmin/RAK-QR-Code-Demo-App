import { useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { setModal } from "../redux/slice/ModalSlice";

type Props = {};

const Header = ({}: Props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  console.log("{location}", pathname?.split("/")?.[1]);
  const path = pathname?.split("/")?.[1];

  return (
    <div className="bg-gray-200  w-screen ">
      <div className="flex justify-between items-center container header">
        <div className="flex items-center">
          <Link to={"/"} className="p-2 font-medium ">
            <img src="/arccaps.png" alt="" className="h-12" />
          </Link>

          <Link to={"/"} className="p-4 font-medium hidden md:block">
            QR Code (Demo App)
          </Link>
        </div>
        <div className="">
          <NavLink to={"/"} className="p-2 md:p-4 font-medium">
            Products
          </NavLink>
          <NavLink to={"/qr-code"} className="p-2 md:p-4 font-medium ">
            QRCode
          </NavLink>
        </div>
        {path === "product" ? (
          <div />
        ) : (
          <button
            onClick={() => dispatch(setModal(true))}
            className={` hover:bg-violet-800 px-3 sm:px-4 py-2 rounded-lg text-white md:ms-4 bg-violet-600 transition-all ease-in-out`}
          >
            Add Product
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
