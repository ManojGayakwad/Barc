import { Routes, Route } from "react-router-dom";
import Barcode from "./components/BarcodeScanner";

function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Barcode />} />
      </Routes>
    </>
  );
}

export default App;
