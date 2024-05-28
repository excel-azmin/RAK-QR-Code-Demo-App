import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardSkeleton from "./CardSkeleton";
import CreateProduct from "./CreateProduct";

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

const Products = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [tab, setTab] = useState("product");
  const [modal, setModal] = useState(false);

  const url = process.env.BASE_URL;

  useEffect(() => {
    const fetchItems = () => {
      try {
        setLoading(true);
        axios
          .get(`${url}/item`)
          .then((res) => {
            console.log({ res });
            setItems(res?.data);
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
  }, [addSuccess]);

  const modalCloser = () => {
    setModal(false);
  };
  const reFatcher = () => {
    setAddSuccess(true);
  };

  return (
    <div className="container">
      <div className="md:flex justify-center items-center my-5">
        <div className="flex">
          <button
            onClick={() => setTab("product")}
            className={` hover:bg-violet-800 px-4 py-2 rounded-s-lg text-white ${
              tab === "product" ? "bg-violet-800" : "bg-violet-500"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setTab("qrcode")}
            className={` hover:bg-violet-800 px-4 py-2 rounded-e-lg text-white ${
              tab === "qrcode" ? "bg-violet-800" : "bg-violet-500"
            }`}
          >
            QR Code
          </button>
        </div>

        <button
          onClick={() => setModal(true)}
          className={` hover:bg-violet-800 px-4 py-2 rounded-lg text-white mt-3 md:mt-0 md:ms-4  ${
            tab === "qrcode" ? "bg-violet-800" : "bg-violet-500"
          }`}
        >
          Add Product
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {/* {loading && <div className="text-center mt-12">Loading...</div>} */}
      {loading && (
        <div className="grid sm:grid-cols-2 md::grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-11/12 mx-auto gap-4">
          {[1, 2, 3, 4]?.map((_, index) => {
            return <CardSkeleton key={index} />;
          })}
        </div>
      )}

      {tab === "product" && (
        <div className="grid sm:grid-cols-2 md::grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-11/12 mx-auto gap-4">
          {items.map((item) => (
            <Link to={`product/${item._id}`}>
              <div key={item._id} className="rounded-md shadow-md border">
                <img
                  src={`${url}/uploads/item-image/${item.productImage}`}
                  alt={item.itemName}
                  className="object-cover object-center w-full rounded-t-md h-72"
                />
                <div className="flex flex-col justify-between p-4 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold tracking-wide text-violet-700">
                      {item.itemName}
                    </h2>
                    <Title title="Series" value={item?.series} />
                    <Title title="Stock" value={item?.stock} />
                    <Title title="Item Code" value={item?.itemCode} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {tab === "qrcode" && (
        <div className="grid sm:grid-cols-2 md::grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-11/12 mx-auto gap-4">
          {items.map((item) => (
            <Link to={`product/${item._id}`}>
              <div key={item._id} className="rounded-md shadow-md border">
                <div className="flex justify-center">
                  <img
                    src={`${url}/uploads/qrcode-image/${item.productQrCode}`}
                    alt={item.itemName}
                    className=" w-72 rounded-t-md h-72 "
                  />
                </div>
                <div className="flex flex-col justify-between p-4 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold tracking-wide text-violet-700">
                      {item.itemName}
                    </h2>
                    <Title title="Series" value={item?.series} />
                    <Title title="Stock" value={item?.stock} />
                    <Title title="Item Code" value={item?.itemCode} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {modal && <CreateProduct closer={modalCloser} refatch={reFatcher} />}
    </div>
  );
};

export default Products;

const Title = ({ title = "", value = "" }) => {
  return (
    <div className="flex gap-2">
      <h2 className="font-medium">{title} : </h2>
      <h2 className="font-normal">{value}</h2>
    </div>
  );
};
