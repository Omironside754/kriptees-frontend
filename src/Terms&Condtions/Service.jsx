import React from "react";

import {
  LocalShipping,
  Security,
  LocalOffer,
  CreditCard,
} from "@mui/icons-material";


const servicesData = [
  {
    id: 1,
    icon: <LocalShipping fontSize="large" />,
    title: "Express Delivery",
    info: "Ships in 24 Hours",
  },
  {
    id: 2,
    icon: <Security fontSize="large" />,
    title: "Brand Warranty",
    info: "100% Original products",
  },
  {
    id: 3,
    icon: <LocalOffer fontSize="large" />,
    title: "Exciting Deals",
    info: "On all prepaid orders",
  },
  {
    id: 4,
    icon: <CreditCard fontSize="large" />,
    title: "Secure Payments",
    info: "SSL / Secure сertificate",
  },
];

const Services = () => {

  return (
    <>
      <div style={{
        backgroundColor: "#000",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        fontFamily: "'Roboto', sans-serif",
      }}>
        <div style={{
          display: "flex",
          gap: "2.5rem",
          width: "100%",
          flexWrap: "wrap",
          height: "auto",
          paddingTop: "20px",
          justifyContent: "center",
        }} >
          {servicesData.map((item) => {

            return (
              <div style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#111",
                borderRadius: "1rem",
                padding: "2rem",
                marginLeft: "1rem",
                marginBottom: "2rem",
              }} key={item.id}>
                <div style={{
                  color: "#ed1c24",
                  fontSize: "3rem",
                  marginRight: "2.5rem",
                  "& svg": {
                    fontSize: "3rem !important",
                  },

                }}>{item.icon}</div>
                <div>
                  <div style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}>{item.title}</div>
                  <div style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                  }}>{item.info}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Services;
