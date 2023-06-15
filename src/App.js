import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { SelectedDateContext } from "./context";
import { SuspenseLoading } from "./helper";

const CalenderPage = lazy(() => import("./pages/Calender"));
const TimeSlotPage = lazy(() => import("./pages/TimeSlot"));

const App = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <SelectedDateContext.Provider value={[value, setValue]}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          pauseOnHover
        />
        <div className="App">
          <Suspense fallback={<SuspenseLoading />}>
            <Routes>
              <Route path="/" exact element={<CalenderPage />} />
              <Route path="/timeSlot" element={<TimeSlotPage />} />
            </Routes>
          </Suspense>
        </div>
      </SelectedDateContext.Provider>
    </>
  );
};

export default App;
