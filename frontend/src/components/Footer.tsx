import { FaFacebookF, FaYoutube } from "react-icons/fa";

type Props = {};

const Footer = ({}: Props) => {
  return (
    <div className="flex justify-center items-center gap-3 h-16 mt-12 bg-gray-100">
      <a target="_blank" href="https://www.facebook.com/ExcelTechnologiesLtd/">
        <FaFacebookF className="border border-blue-600 p-2 text-4xl hover:bg-blue-600 hover:text-white text-blue-600 rounded transition-all ease-in-out duration-300" />
      </a>
      <a
        target="_blank"
        href="https://www.youtube.com/channel/UCGXxmjqvOfRrA_qFsWr_OWg"
      >
        <FaYoutube className="border border-red-600 p-2 text-4xl hover:bg-red-600 hover:text-white text-red-600 rounded transition-all ease-in-out duration-300" />
      </a>
    </div>
  );
};

export default Footer;
