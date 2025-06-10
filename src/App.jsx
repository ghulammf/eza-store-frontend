import { Toaster } from "react-hot-toast";
import AppRoute from "./routes/Index";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            marginTop: "23px",
            width: "100%",
            padding: "10px",
          },
        }}
        reverseOrder={false}
      />
      <AppRoute />
    </>
  );
}

export default App;
