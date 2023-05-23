import React, { useEffect, useState } from "react";
import Section from "../../utils/components/Section";
import { billListData } from "../../static/AdminData";
import { Checkbox, Form, Button, Select, Input, Col, Row } from "antd";
import LoginDB from "./Area/LoginDB";
import axios from "axios";
import useAdminArea from "../../utils/hooks/Admin/useAdminArea";
import useForm from "../../utils/hooks/Admin/useForm";
import { rulesArea as rules } from "../../static/UserForm";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import Spinner from "../../utils/components/Spinner";

let { Option } = Select;
export default function MainArea() {
  const data = React.useMemo(() => billListData);

  const [form] = Form.useForm();
  const [tableForm] = Form.useForm();
  const [columnForm] = Form.useForm();

  const [condition, setCondition] = useState("SELECT * FROM");
  const [query, setQuery] = useState("");

  const {
    branches,
    isHorizontal,
    enableHorizontal,
    disableHorizontal,
    isVertical,
    enableVertical,
    disableVertical,
    handleSubmit,
    handleSubmitTable,
    database,
    tables,
    isTable,
    setUser,
    columns,
    storages,
    table,
    handleHorizontalMigrate,
    isMigrating,
  } = useAdminArea(condition);
  useEffect(() => {
    console.log(database);
  }, [database]);

  const [columnsExist, setColumnsExist] = useState([]);

  const onChange = (checkedValues) => {
    setColumnsExist(checkedValues);

    if (checkedValues[checkedValues.length - 1]) {
      setCondition(condition + checkedValues[checkedValues.length - 1]);
    }
  };

  useEffect(() => {
    console.log(columnsExist);
  }, [columnsExist]);

  useEffect(() => {
    if (table) {
      setCondition(`SELECT * FROM ${table} WHERE `);
    }
  }, [table]);

  const handleChangeCondition = (e) => {
    setCondition(e.target.value);
  };

  return (
    <div className="main_product mx-2">
      <Spinner isLoading={isMigrating} />

      <h1 className="text-6xl font-quicksand text-center">Chi nhánh TP.HCM</h1>

      {!isHorizontal && !isVertical ? (
        <div>
          <button
            onClick={enableHorizontal}
            className="btn-primary border-none p-8 my-5 ml-20 text-2xl flex items-center justify-center font-bold"
          >
            Phân mảnh ngang
          </button>
          <button
            onClick={enableVertical}
            className="btn-primary border-none p-8 my-5 ml-20 text-2xl flex items-center justify-center font-bold"
          >
            Phân mảnh dọc
          </button>
        </div>
      ) : (
        ""
      )}

      {isHorizontal ? (
        <div className="ml-20">
          <button
            className="cancel-btn my-5 p-6 text-2xl"
            onClick={disableHorizontal}
          >
            Quay về
          </button>
          <h2 className="font-quicksan text-4xl  my-10">Phân mãnh ngang</h2>
          <Form
            form={columnForm}
            onFinish={handleHorizontalMigrate}
            className="w-[500px]"
          >
            <h3 className="font-quicksand font-semibold mb-2">Kho</h3>
            <Form.Item name="storage_id" rules={rules.storage_id}>
              <Select placeholder="Chọn kho" allowClear>
                {storages.map((item) => (
                  <Option value={item?.id}>{item?.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <h3 className="font-quicksand font-semibold mb-2">
              Chi nhánh phân tán đích
            </h3>
            <Form.Item name="branch_id" rules={rules.branch_id}>
              <Select placeholder="Chọn chi nhánh" allowClear>
                {branches.map((item) => (
                  <Option value={item?.id}>{item?.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="btn-primary border-none my-5 p-8 text-2xl flex items-center justify-center font-bold"
              >
                Phân mãnh
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        ""
      )}

      {isVertical ? (
        <div className="ml-20">
          <button
            className="cancel-btn my-5 p-6 text-2xl"
            onClick={disableVertical}
          >
            Quay về
          </button>
          <h2 className="font-quicksan text-4xl  my-10">Phân mãnh dọc</h2>
          <Form
            form={columnForm}
            onFinish={handleHorizontalMigrate}
            className="w-[500px]"
          >
            <h3 className="font-quicksand font-semibold mb-2">Kho</h3>
            <Form.Item name="storage_id" rules={rules.storage_id}>
              <Select placeholder="Chọn kho" allowClear>
                {storages.map((item) => (
                  <Option value={item?.id}>{item?.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <h3 className="font-quicksand font-semibold mb-2">
              Chi nhánh phân tán đích
            </h3>
            <Form.Item name="branch_id" rules={rules.branch_id}>
              <Select placeholder="Chọn chi nhánh" allowClear>
                {branches.map((item) => (
                  <Option value={item?.id}>{item?.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="btn-primary border-none my-5 p-8 text-2xl flex items-center justify-center font-bold"
              >
                Phân mãnh
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        ""
      )}
    </div>

    // {" "}
    // <Checkbox.Group onChange={onChange}>
    //   <Row>
    //     {columns.map((column) => (
    //       <Col span={24}>
    //         <Checkbox value={column} key={column}>
    //           {column}
    //         </Checkbox>
    //       </Col>
    //     ))}
    //   </Row>
    // </Checkbox.Group>{" "}
  );
}
