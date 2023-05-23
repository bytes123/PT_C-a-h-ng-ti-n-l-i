import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  resetSearchStatus,
  fetchAllUser,
  getFetchSearchStatus,
  getSearchStatus,
  getSearchUsers,
  getAllUser,
  getUpdateStatus,
  resetDeleteStatus,
  getDeleteStatus,
  fetchSearchUser,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function useMainUser(
  onSuccessDelete,
  onSuccessUpdate,
  onClearToast,
  activeSortIndex,
  activeDisplayIndex
) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [currentSearch, setCurrentSearch] = useState();
  const search_status = useSelector(getSearchStatus);
  const search_users = useSelector(getSearchUsers);
  const fetch_search_status = useSelector(getFetchSearchStatus);
  const fetchUsers = useSelector(getAllUser);
  const location = useLocation();

  const update_status = useSelector(getUpdateStatus);
  const delete_status = useSelector(getDeleteStatus);

  useEffect(() => {
    setIsSearch(false);
    setCurrentSearch();
    setIsLoadingAllUsers(false);
    setIsLoadingSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    console.log(activeSortIndex, activeDisplayIndex);
  }, [activeSortIndex, activeDisplayIndex]);

  useEffect(() => {
    if (delete_status == "succeeded") {
      const updateDelete = async () => {
        if (currentSearch) {
          await dispatch(fetchSearchUser(currentSearch)).unwrap();
        } else {
          await dispatch(fetchAllUser()).unwrap();
        }
        onSuccessDelete();
      };
      updateDelete();
    }

    return () => {
      onClearToast();
      dispatch(resetDeleteStatus());
    };
  }, [delete_status]);

  useEffect(() => {
    dispatch(fetchAllUser()).unwrap();
  }, []);

  useEffect(() => {
    if (update_status == "succeeded") {
      console.log(currentSearch);
      const updateEdit = async () => {
        if (currentSearch) {
          console.log("Có ");
          await dispatch(fetchSearchUser(currentSearch));
        } else {
          await dispatch(fetchAllUser()).unwrap();
        }
        onSuccessUpdate();
      };
      updateEdit();
    }

    return () => onClearToast();
  }, [update_status]);

  useEffect(() => {
    setUsers(search_users);
  }, [fetch_search_status]);

  const fetchData = async () => {
    if (fetchUsers) {
      setUsers(fetchUsers);
    }
  };

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setUsers(search_users);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    }
  }, [search_status]);

  useEffect(() => {
    fetchData();
  }, [fetchUsers]);

  const handleSearch = (value, callback) => {
    if (value !== "") {
      setCurrentSearch(value);
    }
    callback();
  };

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllUsers(true);
    setTimeout(async () => {
      await dispatch(fetchAllUser()).unwrap();
      setIsLoadingAllUsers(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return {
    users,
    setUsers,
    isLoadingSearch,
    isSearch,
    handleSearch,
    handleOutSearch,
    isLoadingAllUsers,
    currentSearch,
  };
}
