import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuList from "../components/Home/MenuList";
import Banner1 from "../components/Banner/Banner1";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    navigate("coffe");
  }, []);

  return (
    <div className="">
      <Banner1 />
      <MenuList />
    </div>
  );
}
