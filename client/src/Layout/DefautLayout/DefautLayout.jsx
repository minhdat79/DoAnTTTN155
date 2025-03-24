import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Chat from "../../Components/Chat/Chat";

const DefautLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Chat />
      <Footer />
    </>
  );
};

export default DefautLayout;
