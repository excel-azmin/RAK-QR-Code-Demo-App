import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  closer: () => void;
  refatch: () => void;
};

const CreateProduct = ({ closer, refatch }: Props) => {
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [series, setSeries] = useState("");
  const [stock, setStock] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const url = process.env.BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("itemCode", itemCode);
    formData.append("series", series);
    formData.append("stock", stock);
    if (productImage) {
      formData.append("productImage", productImage);
    }

    try {
      const response = await axios.post(`${url}/item`, formData);

      if (response.status === 201) {
        toast.success("Product created successfully!");
        refatch();
        closer();
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the product");
    }
  };

  return (
    <div className="absolute top-0 left-0 bg-black/20 w-screen h-screen overflow-hidden flex justify-center items-center transition-opacity ease-in-out duration-700">
      <div className="bg-white w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[800px] rounded-md">
        <div className="flex justify-between items-center border-b px-3 py-2">
          <h2 className="text-xl font-medium">Add Product</h2>
          <button onClick={closer} className="bg-gray-200 h-6 w-6 rounded ">
            X
          </button>
        </div>

        <form className="p-5 grid gap-3 md:gap-4" onSubmit={handleSubmit}>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="itemName" className="text-sm ">
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              placeholder="Type Item Name"
              className="w-full rounded-md focus:outline-none border p-2 mt-2"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="col-span-full sm:col-span-3">
            <label htmlFor="itemCode" className="text-sm ">
              Item Code
            </label>
            <input
              id="itemCode"
              type="text"
              placeholder="Type Item Code"
              className="w-full rounded-md focus:outline-none border p-2 mt-2"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
          </div>

          <div className="col-span-full sm:col-span-3">
            <label htmlFor="series" className="text-sm ">
              Series
            </label>
            <input
              id="series"
              type="text"
              placeholder="Type Series"
              className="w-full rounded-md focus:outline-none border p-2 mt-2"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
            />
          </div>

          <div className="col-span-full sm:col-span-3">
            <label htmlFor="stock" className="text-sm ">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Type Stock"
              className="w-full rounded-md focus:outline-none border p-2 mt-2"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="col-span-full sm:col-span-3">
            <label htmlFor="productImage" className="text-sm ">
              Product Image
            </label>
            <input
              id="productImage"
              type="file"
              className="w-full rounded-md focus:outline-none border p-2 mt-2"
              onChange={(e) => setProductImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-800 px-4 py-2 rounded-lg text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
