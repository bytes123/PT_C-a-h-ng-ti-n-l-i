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
export default function useAdminArea() {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetch_branch = useSelector(getBranch);

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    dispatch(fetchBranch()).unwrap();
  }, []);

  useEffect(() => {
    if (fetch_branch.length) {
      let temp = fetch_branch;

      setBranches(temp);
    }
  }, [fetch_branch]);

  useEffect(() => {
    dispatch(resetColumns());
  }, [location.pathname]);

  return {
    branches,
  };
}
