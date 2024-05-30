import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../redux/slice/ModalSlice";

type Props = {
  children: React.ReactNode;
  className?: string;
  title: string;
};

const Modal = ({ children, className = "" , title = "" }: Props) => {
  const dispatch = useDispatch();

  const closer = () => {
    dispatch(setModal(false));
  };

  useEffect(() => {
    // Add the no-scroll class to the body when the modal mounts
    document.body.classList.add("no-scroll");

    // Remove the no-scroll class from the body when the modal unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <dialog className=" top-0 left-0 bg-black/20 w-screen h-screen overflow-hidden fixed flex justify-center items-center transition-opacity ease-in-out duration-700">
      <div
        className={`bg-white w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[800px] rounded-md  ${className}`}
      >
        <div className={`flex justify-between items-center border-b px-3 py-2`}>
          <h2 className="text-xl font-medium">{title}</h2>
          <button onClick={closer} className="bg-gray-200 h-6 w-6 rounded ">
            X
          </button>
        </div>

        <div className="p-5 grid gap-3 md:gap-4 modal-content ">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
