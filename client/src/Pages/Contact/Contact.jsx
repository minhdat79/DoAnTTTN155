import React from "react";
import ContactArea from "../../Components/ContactArea/ContactArea";

const Contact = () => {
  return (
    <>
      <section className="bg-gray-100 text-center pt-24 pb-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Giữ Liên Lạc Với Chúng Tôi
            </h3>
            <div className="flex space-x-2 text-gray-600 mt-4">
              <a href="#" className="hover:underline">
                Trang Chủ
              </a>
              <span>/</span>
              <span>Liên Hệ</span>
            </div>
          </div>
        </div>
        <ContactArea />
      </section>
    </>
  );
};

export default Contact;
