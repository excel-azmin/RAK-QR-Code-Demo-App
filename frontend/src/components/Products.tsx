import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store/store";
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
  const modal = useSelector((state: RootState) => state?.modal?.modal);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

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

  const reFatcher = () => {
    setAddSuccess(true);
  };

  return (
    <div className="container mt-6 xl:mt-12">
      {error && <div className="text-red-500">{error}</div>}
      {/* {loading && <div className="text-center mt-12">Loading...</div>} */}
      {loading && (
        <div className="grid sm:grid-cols-2 md::grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-11/12 mx-auto gap-4">
          {[1, 2, 3, 4]?.map((_, index) => {
            return <CardSkeleton key={index} />;
          })}
        </div>
      )}
      {items?.length === 0 ? (
        <div className=" h-40 w-full text-center bg-white border rounded">
          No Recorded Data Yet to Show
        </div>
      ) : (
        ""
      )}

      <div className="grid sm:grid-cols-2 md::grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-11/12 mx-auto gap-4">
        {items?.map((item) => (
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

      {modal && <CreateProduct refatch={reFatcher} />}
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
