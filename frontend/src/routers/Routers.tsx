import Layout from "../components/Layout";
import Products from "../components/Products";
import QRCode from "../components/QRCode";
import SingleProduct from "../components/SingleProduct";

export const URLSingleProduct = (id: string = ":id"): string =>
  `/product/${id}`;

const Routes = [
  {
    path: "*",
    element: "",
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/qr-code",
        element: <QRCode />,
      },
      {
        path: "/",
        element: <Products />,
      },
      {
        path: URLSingleProduct(),
        element: <SingleProduct />,
      },
    ],
  },
];

export default Routes;
