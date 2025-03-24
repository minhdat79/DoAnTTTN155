import React from "react";
import contact_icon_1 from "../../assets/img/contact/contact-icon-1.png";
import contact_icon_2 from "../../assets/img/contact/contact-icon-2.png";
import contact_icon_3 from "../../assets/img/contact/contact-icon-3.png";
import ContactForm from "../Forms/ContactForm/ContactForm";
import {
  FacebookFilled,
  LinkedinFilled,
  TwitchFilled,
} from "@ant-design/icons";

const ContactArea = () => {
  return (
    <>
      <section className="py-12">
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Gửi Tin Nhắn
                  </h3>
                  <div>
                    <ContactForm />
                    <p className="text-red-500 mt-4"></p>
                  </div>
                </div>
              </div>
              <div className="mt-20">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={contact_icon_1}
                      alt="contact-icon"
                      className="w-10 h-10"
                    />
                    <div>
                      <p>
                        <a
                          href="mailto:contact@shofy.com"
                          className="text-blue-500 hover:underline"
                        >
                          dat.vminh07@gmail.com
                        </a>
                      </p>
                      <p>
                        <a
                          href="tel:670-413-90-762"
                          className="text-blue-500 hover:underline"
                        >
                          +0938358630
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <img
                      src={contact_icon_2}
                      alt="contact-icon"
                      className="w-10 h-10"
                    />
                    <div>
                      <p>
                        <a
                          href="https://www.google.com/maps/place/New+York,+NY,+USA/"
                          target="_blank"
                          className="text-blue-500 hover:underline"
                        >
                          Thanh Pho <br /> Ho Chi Minh
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <img
                      src={contact_icon_3}
                      alt="contact-icon"
                      className="w-10 h-10"
                    />
                    <div>
                      <h4 className="text-lg font-medium text-gray-700 mb-4">
                        Kết nối trên mạng xã hội
                      </h4>
                      <div className="flex space-x-4">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FacebookFilled className="text-4xl" />
                        </a>
                        <a
                          href="#"
                          className="text-blue-400 hover:text-blue-600"
                        >
                          <TwitchFilled className="text-4xl" />
                        </a>
                        <a
                          href="#"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <LinkedinFilled className="text-4xl" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactArea;
