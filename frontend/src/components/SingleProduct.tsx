import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setModal } from "../redux/slice/ModalSlice";
import { RootState } from "../redux/store/store";
import Modal from "./Modal";

type Props = {};
type Item = {
  _id: string;
  itemName: string;
  itemCode: string;
  series: string;
  stock: string;
  productImage: string;
  productQrCode: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const SingleProduct = ({}: Props) => {
  const modal = useSelector((state: RootState) => state?.modal?.modal);
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const url = process.env.BASE_URL;

  useEffect(() => {
    const fetchItems = () => {
      try {
        setLoading(true);
        axios
          .get(`${url}/item/${id}`)
          .then((res) => {
            console.log({ res });
            setItem(res?.data);
            setLoading(false);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
        console.error("There was an error fetching the data!", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container py-5">
      <Link
        to="/"
        className={`border border-violet-800 hover:bg-violet-800 px-4 py-2 rounded-lg text-violet-800 hover:text-white flex items-center gap-2 mb-5 transition-all ease-in-out w-fit`}
      >
        <IoArrowBackOutline />
        Back
      </Link>

      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-violet-500">Loading...</div>}

      <div className="w-full border rounded">
        <img
          src={`${url}/uploads/item-image/${item?.productImage}`}
          onClick={() => dispatch(setModal(true))}
          alt={""}
          title="Click"
          // className="border object-center -md h-full min-h-[240px] sm:min-h-[340px] md:min-h-[400px] xl:min-h-[440px]"
          className="object-cover object-center w-full rounded-t-md max-h-[500px] cursor-pointer"
        />
        <div className="flex flex-wrap justify-between w-full p-4">
          <div className="space-y-2 w-full md:w-[50%]">
            <h3 className="text-xl 2xl:text-2xl font-medium text-violet-700 mt-5">
              {item?.itemName}
            </h3>
            <Title title="Series" value={item?.series} />
            <Title title="Stock" value={item?.stock} />
            <Title title="Item Code" value={item?.itemCode} />
          </div>
          <img
            src={`${url}/uploads/qrcode-image/${item?.productQrCode}`}
            alt={item?.itemName}
            className="h-72 w-auto rounded-t-md "
          />
        </div>
      </div>

      {modal && (
        <Modal
          title="Product Image"
          className="max-w-[90%] md:max-w-[90%] lg:max-w-[90%] xl:max-w-[72%] 2xl:max-w-[60%] "
        >
          <div className="flex justify-center items-center text-center">
            <img
              src={`${url}/uploads/item-image/${item?.productImage}`}
              alt={""}
              className="border object-center h-full min-h-[240px] sm:min-h-[340px] md:min-h-[400px] xl:min-h-[440px] "
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SingleProduct;

const Title = ({ title = "", value = "" }) => {
  return (
    <div className="flex gap-2">
      <h2 className="font-medium">{title} : </h2>
      <h2 className="font-normal">{value}</h2>
    </div>
  );
};
