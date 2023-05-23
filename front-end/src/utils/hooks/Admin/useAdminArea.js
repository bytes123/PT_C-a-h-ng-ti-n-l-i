import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStorage,
  getStorage,
} from "../../../features/storage/storageSlice";
import { fetchBranch, getBranch } from "../../../features/branch/branchSlice";
import {
  getMysqlStatus,
  getDatabases,
  resetMysqlStatus,
  fetchTable,
  getFetchTableStatus,
  getTables,
  resetFetchTableStatus,
  resetColumns,
  fetchColumn,
  getColumns,
  horizontalMigrate,
  getHorizonMigrateStatus,
  resetHorizonMigrate,
} from "../../../features/zone/zoneSlice";
import { useLocation } from "react-router-dom";
export default function useAdminArea(condition) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAccess, setIsAccess] = useState(false);
  const [isTable, setIsTable] = useState(false);
  const mysql_status = useSelector(getMysqlStatus);
  const fetch_table_status = useSelector(getFetchTableStatus);
  const fetch_databases = useSelector(getDatabases);
  const fetch_tables = useSelector(getTables);
  const fetch_columns = useSelector(getColumns);
  const fetch_storage = useSelector(getStorage);
  const fetch_branch = useSelector(getBranch);
  const [databases, setDatabases] = useState([]);
  const [database, setDatabase] = useState();
  const [tables, setTables] = useState();
  const [table, setTable] = useState();
  const [columns, setColumns] = useState([]);
  const [isMigrating, setIsMigrating] = useState(false);
  const horizonMigrateStatus = useSelector(getHorizonMigrateStatus);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [storages, setStorages] = useState([]);
  const [branches, setBranches] = useState([]);
  const [user, setUser] = useState({
    host: "",
    username: "",
    password: "",
  });

  const enableHorizontal = () => setIsHorizontal(true);
  const disableHorizontal = () => setIsHorizontal(false);

  const enableVertical = () => setIsVertical(true);
  const disableVertical = () => setIsVertical(false);

  useEffect(() => {
    dispatch(fetchStorage()).unwrap();
    dispatch(fetchBranch()).unwrap();
  }, []);

  useEffect(() => {
    if (fetch_storage.length) {
      let temp = fetch_storage;
      temp = [
        {
          id: "all",
          name: "Tất cả",
        },
        ...temp,
      ];

      setStorages(temp);
    }
  }, [fetch_storage]);

  useEffect(() => {
    if (fetch_branch.length) {
      let temp = fetch_branch;
      temp = [
        {
          id: "all",
          name: "Tất cả",
        },
        ...temp,
      ];

      setBranches(temp);
    }
  }, [fetch_branch]);

  useEffect(() => {
    if (fetch_tables.length) {
      setTables(fetch_tables);
    }

    return () => dispatch(resetFetchTableStatus());
  }, [fetch_table_status]);

  useEffect(() => {
    dispatch(resetColumns());
  }, [location.pathname]);

  useEffect(() => {
    setDatabases(fetch_databases);
  }, [fetch_databases]);

  useEffect(() => {
    setColumns(fetch_columns);
  }, [fetch_columns]);

  useEffect(() => {
    if (mysql_status == "succeeded") {
      alert("Thành công");
      setIsAccess(true);
    } else if (mysql_status == "failed") {
      alert("Thất bại");
      setIsAccess(false);
    }

    return () => {
      dispatch(resetMysqlStatus());
    };
  }, [mysql_status]);

  const handleSubmit = async (data) => {
    if (data?.database) {
      setDatabase(data.database);
      user.password = data.password ?? "";

      await dispatch(
        fetchTable({ user: user, database: data.database })
      ).unwrap();
      setIsTable(true);
    }
  };

  const handleSubmitTable = async (data) => {
    if (data?.table) {
      setTable(data.table);
      await dispatch(
        fetchColumn({
          user: user,
          database: database,
          table: data.table,
        })
      ).unwrap();
    }
  };

  const handleHorizontalMigrate = async (data) => {
    setIsMigrating(true);
    if (condition) {
      await dispatch(horizontalMigrate(data)).unwrap();
    }
  };

  useEffect(() => {
    if (horizonMigrateStatus == "succeeded") {
      setTimeout(() => {
        alert("Thành công");
        setIsMigrating(false);
      }, 2000);
    } else if (horizonMigrateStatus == "failed") {
      setTimeout(() => {
        alert("Thất bại");
        setIsMigrating(false);
      }, 2000);
    }

    return () => dispatch(resetHorizonMigrate());
  }, [horizonMigrateStatus]);

  return {
    databases,
    isHorizontal,
    enableHorizontal,
    disableHorizontal,
    isTable,
    handleSubmit,
    database,
    setUser,
    tables,
    handleSubmitTable,
    columns,
    table,
    handleHorizontalMigrate,
    isMigrating,
    storages,
    branches,
    isVertical,
    enableVertical,
    disableVertical,
  };
}
