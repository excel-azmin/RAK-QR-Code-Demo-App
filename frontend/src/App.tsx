import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Routes from "./routers/Routers";

const router = createBrowserRouter([
  {
    children: Routes,
    errorElement: "Error",
  },
]);

function App() {
  return (
    <>
      <Toaster /> <RouterProvider router={router} />
    </>
  );
}

export default App;
