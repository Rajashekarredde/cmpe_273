import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../features/productsSlice";
import { selectUser } from "../features/userSlice";
// import EditShop from "./ShopDetails/editShop";
import EditShopImage from "./products/editShopImage";

function shopHeader() {
  const user = useSelector(selectUser);
  const product = useSelector(getProducts);
  const [shopName, setShopName] = useState("");
  const [userId, setUserId] = useState();
  const [editShopPage, setEditShopPage] = useState(false);
  const [userName, setUserName] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [shopDetails, setShopDetails] = useState();
  const [prodUserId, setProdUserId] = useState(0);

  useEffect(() => {
    Axios.get("/getShopById/" + user.id).then((response) => {
      if (response.data.success) {
        // setShop(response.data.result);
        setShopName(response.data.result[0].shopName);
        setUserName(response.data.result[0].name);
        setShopImage(response.data.result[0].shopImage);
      } else {
        console.log("Failed in getting shop by id ");
      }
    });
  }, []);

  const editShopDetails = (id) => {
    setUserId(id);
    setEditShopPage(true);
    console.log("In edit shop details");
  };

  return (
    <div className="shophome_header">
      <div className="owner_details" style={{ marginLeft: "580px" }}>
        <h6 style={{ fontSize: "18px" }}>SHOP OWNER</h6>
        <img
          style={{ width: "30%", borderRadius: "50%", height: "100px" }}
          src={"/Users/Images/" + user.profilePic}
        ></img>
        <h5>{"Bob Holland"}</h5>
      </div>
      {editShopPage && (
        <EditShopImage editShopPage={setEditShopPage} userId={userId} />
      )}
    </div>
  );
}

export default shopHeader;
