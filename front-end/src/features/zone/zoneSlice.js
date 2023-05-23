import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MYSQL_LOGIN_URL,
  GET_TABLE_URL,
  GET_COLUMN_URL,
  HORIZON_MIGRATE,
} from "../../static/API";
import axios from "axios";
import { v1 as uuidv1 } from "uuid";

const initialState = {
  products: [],
  errors: {},
  login_mysql_status: "",
  fetch_table_status: "",
  fetch_column_status: "",
  horizon_migrate_status: "",
  databases: [],
  tables: [],
  columns: [],
  migrate_status: "",
};

export const loginMysql = createAsyncThunk("zone/loginmysql", async (data) => {
  console.log(data);
  const response = await axios.post(MYSQL_LOGIN_URL, data);

  return response.data;
});

export const fetchTable = createAsyncThunk("zone/get_table", async (data) => {
  console.log(data);
  const response = await axios.post(GET_TABLE_URL, data);

  return response.data;
});

export const horizontalMigrate = createAsyncThunk(
  "zone/horizon_migrate",
  async (data) => {
    console.log(data);
    const response = await axios.post(HORIZON_MIGRATE, data);

    return response.data;
  }
);

export const fetchColumn = createAsyncThunk("zone/get_column", async (data) => {
  console.log(data);
  const response = await axios.post(GET_COLUMN_URL, data);

  return response.data;
});

const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    resetMysqlStatus(state, action) {
      state.login_mysql_status = "";
    },
    resetFetchTableStatus(state, action) {
      state.fetch_table_status = "";
    },
    resetFetchColumnStatus(state, action) {
      state.fetch_column_status = "";
    },
    resetColumns(state, action) {
      state.columns = [];
    },
    resetHorizonMigrate(state, action) {
      state.horizon_migrate_status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginMysql.pending, (state, action) => {
        state.login_mysql_status = "loading";
      })
      .addCase(loginMysql.fulfilled, (state, action) => {
        console.log(action.payload);
        state.login_mysql_status = "succeeded";
        state.databases = action.payload;
      })
      .addCase(loginMysql.rejected, (state, action) => {
        state.login_mysql_status = "failed";
        console.log("err");
      })
      .addCase(fetchTable.pending, (state, action) => {
        state.fetch_table_status = "loading";
      })
      .addCase(fetchTable.fulfilled, (state, action) => {
        console.log(action.payload);
        state.fetch_table_status = "succeeded";
        state.tables = action.payload;
      })
      .addCase(fetchTable.rejected, (state, action) => {
        state.fetch_table_status = "failed";
        console.log("err");
      })
      .addCase(fetchColumn.pending, (state, action) => {
        state.fetch_column_status = "loading";
      })
      .addCase(fetchColumn.fulfilled, (state, action) => {
        console.log(action.payload);
        state.fetch_column_status = "succeeded";
        state.columns = action.payload;
      })
      .addCase(fetchColumn.rejected, (state, action) => {
        state.fetch_column_status = "failed";
        console.log("err");
      })
      .addCase(horizontalMigrate.pending, (state, action) => {
        state.horizon_migrate_status = "loading";
      })
      .addCase(horizontalMigrate.fulfilled, (state, action) => {
        console.log(action.payload);

        state.horizon_migrate_status = "succeeded";
      })
      .addCase(horizontalMigrate.rejected, (state, action) => {
        state.horizon_migrate_status = "failed";
        console.log("err");
      });
  },
});

export const getMysqlStatus = (state) => state.zone.login_mysql_status;
export const getDatabases = (state) => state.zone.databases;
export const getTables = (state) => state.zone.tables;
export const getColumns = (state) => state.zone.columns;
export const getFetchTableStatus = (state) => state.zone.fetch_table_status;
export const getFetchColumnStatus = (state) => state.zone.fetch_column_status;
export const getHorizonMigrateStatus = (state) =>
  state.zone.horizon_migrate_status;

export const {
  resetMysqlStatus,
  resetFetchTableStatus,
  resetFetchColumnStatus,
  resetColumns,
  resetHorizonMigrate,
} = zoneSlice.actions;
export default zoneSlice.reducer;
