import React, { useEffect, useState, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
export default function AddressForm({
  values,
  handleValues,
  newValues,
  error,
  clearError,
  status,
}) {
  const refProvince = useRef(null);
  const refDistrict = useRef(null);
  const refWard = useRef(null);

  const [isOpenProvinces, setIsOpenProvinces] = useState(false);
  const [isOpenDistricts, setIsOpenDistricts] = useState(false);
  const [isOpenWards, setIsOpenWards] = useState(false);

  const [provinces, setProvinces] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState();
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState();
  const [selectedAddress, setSelectedAddress] = useState();

  const [mockValues, setMockValues] = useState(values);

  useEffect(() => {
    if (status == "succeeded") {
      setSelectedProvince();
      setSelectedDistrict();
      setSelectedWard();
      setSelectedAddress("");
    }
  }, [status]);

  useEffect(() => {
    if (selectedProvince) {
      if (!newValues) {
        handleValues({
          ...values,
          user_province: selectedProvince,
        });
      } else {
        handleValues({
          ...newValues,
          user_province: selectedProvince,
        });
      }
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      if (!newValues) {
        handleValues({
          ...values,
          user_district: selectedDistrict,
        });
      } else {
        handleValues({
          ...newValues,
          user_district: selectedDistrict,
        });
      }
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedWard) {
      if (!newValues) {
        handleValues({
          ...values,
          user_ward: selectedWard,
        });
      } else {
        handleValues({
          ...newValues,
          user_ward: selectedWard,
        });
      }
    }
  }, [selectedWard]);

  useEffect(() => {
    if (selectedAddress) {
      if (!newValues) {
        handleValues({
          ...values,
          address: selectedAddress,
        });
      } else {
        handleValues({
          ...newValues,
          address: selectedAddress,
        });
      }
    }
  }, [selectedAddress]);

  async function getProvinces() {
    try {
      const response = await axios.get(
        "https://vapi.vnappmob.com/api/province"
      );
      if (response.data.results.length > 0) {
        setProvinces(response.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProvinces();
  }, []);

  const handleOpenProvinces = (e) => {
    setIsOpenProvinces(!isOpenProvinces);
    document.addEventListener("click", (ev) => {
      if (refProvince.current && !refProvince.current.contains(ev.target)) {
        setIsOpenProvinces(false);
      }
    });
  };

  const handleOpenDistrict = (e) => {
    if (selectedProvince) {
      setIsOpenDistricts(!isOpenDistricts);
      document.addEventListener("click", (ev) => {
        if (refDistrict.current && !refDistrict.current.contains(ev.target)) {
          setIsOpenDistricts(false);
        }
      });
    }
  };

  const handleOpenWard = (e) => {
    if (selectedDistrict) {
      setIsOpenWards(!isOpenWards);
      document.addEventListener("click", (ev) => {
        if (refWard.current && !refWard.current.contains(ev.target)) {
          setIsOpenWards(false);
        }
      });
    }
  };

  const handleProvinceChange = async (province) => {
    setSelectedProvince(province);
    setSelectedDistrict("");
    setMockValues("");
    setSelectedWard("");
    setIsOpenProvinces(false);
    clearError();

    // Lấy dữ liệu quận/huyện từ API dựa trên tỉnh/thành phố đã chọn
    if (province) {
      try {
        const response = await axios.get(
          `https://vapi.vnappmob.com/api/province/district/${province.province_id}`
        );
        if (response.data.results.length > 0) {
          setDistricts(response.data.results);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDistrictChange = async (district) => {
    setSelectedDistrict(district);
    setSelectedWard("");
    setMockValues("");
    setIsOpenDistricts(false);
    clearError();
    // Lấy dữ liệu quận/huyện từ API dựa trên tỉnh/thành phố đã chọn
    if (district) {
      try {
        const response = await axios.get(
          `https://vapi.vnappmob.com/api/province/ward/${district.district_id}`
        );
        if (response.data.results.length > 0) {
          setWards(response.data.results);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleWardChange = async (ward) => {
    setSelectedWard(ward);
    setIsOpenWards(false);
    clearError();
    // Lấy dữ liệu quận/huyện từ API dựa trên tỉnh/thành phố đã chọn
    if (ward) {
      setSelectedWard(ward);
    }
  };

  const handleAddressChange = (e) => {
    clearError();
    setSelectedAddress(e.target.value);
  };

  return (
    <>
      <h4 className=" font-bold text-xl">Nơi ở & địa chỉ người dùng</h4>
      <div
        className={`checkout_profile-address-wrapper mb-10 mt-4 rounded-xl ${
          error?.address ? "error-input" : ""
        }`}
      >
        <div
          className="checkout_profile-province address-item col-6"
          ref={refProvince}
        >
          <div
            className="checkout_province-selected address-selected"
            onClick={handleOpenProvinces}
          >
            <p>
              {selectedProvince?.province_name ??
                mockValues?.user_province?.province_name ??
                "Chọn tỉnh,thành"}
            </p>
            <ArrowDropDownIcon />
          </div>
          <div
            className={
              isOpenProvinces ? "checkout_ship-sub active" : "checkout_ship-sub"
            }
          >
            <div className="checkout_adrress-search ">
              <input
                type="text"
                className="checkout_address-search-input"
                placeholder="Nhập tỉnh,thành để tìm kiếm nhanh"
              />
              <div className="checkout_search-icon">
                <SearchIcon />
              </div>
            </div>
            <ul className="checkout_province-list address-subList ">
              {provinces.map((item, index) => (
                <li
                  className="checkout_province-item"
                  key={index}
                  onClick={() => handleProvinceChange(item)}
                >
                  <p className="address-subItem">{item?.province_name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="checkout_profile-district address-item col-6"
          ref={refDistrict}
        >
          <div
            className="checkout_district-selected address-selected"
            onClick={handleOpenDistrict}
          >
            <p>
              {selectedDistrict?.district_name ??
                mockValues?.user_district?.district_name ??
                "Chọn Quận / huyện"}
            </p>
            <ArrowDropDownIcon />
          </div>

          <div
            className={
              isOpenDistricts ? "checkout_ship-sub active" : "checkout_ship-sub"
            }
          >
            <div className="checkout_adrress-search ">
              <input
                type="text"
                className="checkout_address-search-input"
                placeholder="Nhập quận,huyện để tìm kiếm nhanh"
              />
              <div className="checkout_search-icon">
                <SearchIcon />
              </div>
            </div>
            <ul className="checkout_province-list address-subList ">
              {districts.map((item, index) => (
                <li
                  className="checkout_province-item "
                  key={index}
                  onClick={() => handleDistrictChange(item)}
                >
                  <p className="address-subItem">{item.district_name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="checkout_profile-ward address-item col-6" ref={refWard}>
          <div
            className="checkout_ward-selected address-selected"
            onClick={handleOpenWard}
          >
            <p>
              {selectedWard?.ward_name ??
                mockValues?.user_ward?.ward_name ??
                "Chọn Phường / Xã"}
            </p>
            <ArrowDropDownIcon />
          </div>

          <div
            className={
              isOpenWards ? "checkout_ship-sub active" : "checkout_ship-sub"
            }
          >
            <div className="checkout_adrress-search ">
              <input
                type="text"
                className="checkout_address-search-input"
                placeholder="Nhập phường,xã để tìm kiếm nhanh"
              />
              <div className="checkout_search-icon">
                <SearchIcon />
              </div>
            </div>
            <ul className="checkout_province-list address-subList row">
              {wards.map((item, index) => (
                <li
                  className="checkout_province-item"
                  key={index}
                  onClick={() => handleWardChange(item)}
                >
                  <p className="address-subItem">{item.ward_name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="checkout_profile-myAdress address-item col-6">
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            name="address"
            value={selectedAddress ?? mockValues?.address ?? ""}
            onChange={handleAddressChange}
            className="checkout_profile-address h-full rounded-lg h-[33px] p-3 outline-none checkout_text-input w-100"
          />
        </div>
        {error?.address ? (
          <p className="error-text text-2xl">Vui lòng nhập đầy đủ địa chỉ</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
