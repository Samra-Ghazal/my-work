import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { AnimatePresence, motion } from "framer-motion";
export const SuspenseLoading = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
              <div className="d-flex align-items-center flex-column px-4">
                <HashLoader color="#674989" loading={true} size={100} />
              </div>
              <div className="text-muted font-size-xl text-center pt-3">
                Please wait
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
