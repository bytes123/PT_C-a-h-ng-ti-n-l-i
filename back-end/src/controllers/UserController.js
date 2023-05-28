"use strict";

const User = require("../models/User");
const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
var uuidv1 = require("uuidv1");
const sendAuthMail = require("./AuthMailController");
const MOMENT = require("moment");
var fs = require("fs");
var filePath = "public/resources/avatar/";

module.exports = {
  getAllUser: async (req, result) => {
    User.getAllUser(async (req, users) => {
      if (users.recordset) {
        User.getAllDetailTypeUser(async (req, res) => {
          let detail_type_user = res.recordset;
          const merged = users.recordset.map((user) => ({
            ...user,
            detail_type_user: detail_type_user.filter(
              (item) => item.user_name == user.user_name
            ),
          }));
          return result.status(200).json(merged);
        });
      } else {
      }
    });
  },
  // ĐĂNG KÝ
  signUpCustomer: async (req, result) => {
    let avatar = null;
    if (req.file) {
      avatar = req.file.filename;
    }
    const data = JSON.parse(req.body.data);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);

    let dateTimeNow = new Date();
    let authen_token = uuidv1();

    data.user_name = data.user_name.trim();
    data.phone_number = data.phone_number.trim();
    data.fullname = data.fullname.trim();

    let auth_data = {
      auth_token: authen_token,
      user_name: data.user_name,
      createdAt: dateTimeNow,
    };

    let notifications = [];

    const user = avatar
      ? {
          user_name: data.user_name,
          password: password,
          avatar: avatar,
          email: data.email,
          isAuth: true,

          createdAt: new Date(),
        }
      : {
          user_name: data.user_name,
          password: password,
          email: data.email,
          isAuth: true,

          createdAt: new Date(),
        };

    const customer = {
      user_name: data.user_name,
      fullname: data.fullname,
      gender: data.gender,
      phone_number: data.phone_number,
      province_id: data.user_province.province_id,
      province_name: data.user_province.province_name,
      district_id: data.user_district.district_id,
      district_name: data.user_district.district_name,
      ward_id: data.user_ward.ward_id,
      ward_name: data.user_ward.ward_name,
    };

    const detail_type_user = [
      {
        user_name: data.user_name,
        type_user_id: "normal-customer",
      },
    ];

    User.getUserByName(user, (err, res) => {
      if (res.recordset.length > 0) {
        notifications.push("USER_EXISTS");
      }

      User.getUserByMail(user, (err, res) => {
        if (res.recordset.length > 0) {
          notifications.push("EMAIL_EXISTS");
        }

        if (notifications.length > 0) {
          return result.send(notifications);
        } else {
          User.deleteUserNotAuth(user, (err, res) => {
            if (!err) {
              User.setUser(user, (err, res) => {
                if (err) {
                  return result.status(400).json(err);
                } else {
                  User.setCustomer(customer, (err, res) => {
                    if (err) {
                      console.log(err);
                      return result.status(400).json(err);
                    } else {
                      detail_type_user.forEach((item) => {
                        User.setDetailTypeUser(item, (err, res) => {
                          if (err) {
                            return result.status(400).json(err);
                          }
                        });
                      });

                      notifications.push("SIGNUP_SUCCESS");

                      return result.send(notifications);
                    }
                  });
                }
              });
            } else {
              return result.status(400).json(err);
            }
          });
        }
      });
    });
  },
  signUpStaff: async (req, result) => {
    let avatar = null;
    if (req.file) {
      avatar = req.file.filename;
    }
    const data = JSON.parse(req.body.data);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);

    let notifications = [];

    data.user_name = data.user_name.trim();
    data.phone_number = data.phone_number.trim();
    data.fullname = data.fullname.trim();

    const user = avatar
      ? {
          user_name: data.user_name,
          password: password,
          avatar: avatar,
          email: data.email,

          isAuth: 1,
          createdAt: new Date(),
        }
      : {
          user_name: data.user_name,
          password: password,
          email: data.email,

          isAuth: 1,
          createdAt: new Date(),
        };

    const staff = {
      user_name: data.user_name,
      fullname: data.fullname,
      gender: data.gender,
      phone_number: data.phone_number,
      province_id: data.user_province.province_id,
      province_name: data.user_province.province_name,
      district_id: data.user_district.district_id,
      district_name: data.user_district.district_name,
      ward_id: data.user_ward.ward_id,
      ward_name: data.user_ward.ward_name,
      address: data.address,
    };

    console.log(user);

    const detail_type_user =
      data?.type_user &&
      data?.type_user.map((item) => ({
        user_name: data.user_name,
        type_user_id: item,
      }));

    User.getUserByName(user, (err, res) => {
      if (res.recordset.length > 0) {
        notifications.push("USER_EXISTS");
      }

      User.getUserByMail(user, (err, res) => {
        if (res.recordset.length > 0) {
          notifications.push("EMAIL_EXISTS");
        }

        if (notifications.length > 0) {
          return result.send(notifications);
        } else {
          User.setUser(user, (err, res) => {
            if (err) {
              console.log(err);
              return result.status(400).json(err);
            } else {
              User.setStaff(staff, (err, res) => {
                if (err) {
                  return result.status(400).json(err);
                } else {
                  if (detail_type_user && detail_type_user?.length) {
                    detail_type_user.forEach((item) => {
                      User.setDetailTypeUser(item, (err, res) => {
                        if (err) {
                          return result.status(400).json(err);
                        }
                      });
                    });
                    notifications.push("SIGNUP_SUCCESS");

                    return result.send(notifications);
                  } else {
                    notifications.push("SIGNUP_SUCCESS");

                    return result.send(notifications);
                  }
                }
              });
            }
          });
        }
      });
    });
  },
  updateStaff: async (req, result) => {
    let avatar = null;
    let notifications = [];
    if (req.file) {
      avatar = req.file.filename;
    }
    const data = JSON.parse(req.body.data);

    const salt = await bcrypt.genSalt(10);
    const password = data.password
      ? await bcrypt.hash(data.password, salt)
      : null;
    let old_user_avatar = data?.old_user_avatar;
    let current_user_name = data?.current_user_name;
    const type_user =
      data?.type_user &&
      Object.entries(data?.type_user).map(([key, value]) => ({
        key,
        value,
      }));

    let user = {
      user_name: data?.user_name ?? "",
      password: password ?? "",
      avatar: avatar ?? "",
      email: data?.email ?? "",

      updatedAt: new Date(),
    };

    let staff = {
      fullname: data?.fullname ?? "",
      phone_number: data?.phone_number ?? "",
      gender: data?.gender ?? "",
      province_id: data?.user_province?.province_id ?? "",
      province_name: data?.user_province?.province_name ?? "",
      district_id: data?.user_district?.district_id ?? "",
      district_name: data?.user_district?.district_name ?? "",
      ward_id: data?.user_ward?.ward_id ?? "",
      ward_name: data?.user_ward?.ward_name ?? "",
      address: data?.address ?? "",
    };

    user = Object.fromEntries(
      Object.entries(user).filter(function ([key, value]) {
        return value !== "";
      })
    );
    staff = Object.fromEntries(
      Object.entries(staff).filter(function ([key, value]) {
        return value !== "";
      })
    );

    const handleUpdate = () => {
      User.updateUser(
        {
          user: user,
          current_user_name: current_user_name,
        },
        (err, res) => {
          if (err) throw err;
        }
      );

      if (Object.entries(staff).length) {
        User.updateStaff(
          {
            staff: staff,
            current_user_name: current_user_name,
          },
          (err, res) => {
            if (err) throw err;
            if (res) {
              if (avatar && old_user_avatar !== "default.jpg") {
                fs.stat(filePath + old_user_avatar, function (err, stats) {
                  if (err) return console.log(err);
                  fs.unlink(filePath + old_user_avatar, function (err) {
                    if (err) return console.log(err);
                  });
                });
              }
            }
          }
        );
      }

      type_user &&
        type_user.forEach((item) => {
          // KIỂM TRA NẾU QUYỀN ĐÓ ĐC CẤP
          if (item.value) {
            User.checkDetailTypeUser(
              {
                current_user_name: current_user_name,
                type_user_id: item.key,
              },
              (err, res) => {
                if (err) throw err;
                if (res.recordset.length) {
                } else {
                  User.setDetailTypeUser(
                    { user_name: current_user_name, type_user_id: item.key },
                    (err, res) => {
                      if (err) throw err;
                    }
                  );
                }
              }
            );
          } else {
            User.checkDetailTypeUser(
              {
                current_user_name: current_user_name,
                type_user_id: item.key,
              },
              (err, res) => {
                if (err) throw err;
                if (res.recordset.length) {
                  User.deleteDetailTypeUser(
                    { user_name: current_user_name, type_user_id: item.key },
                    (err, res) => {
                      if (err) throw err;
                      if (res) {
                        console.log("Xóa quyền thành công");
                      }
                    }
                  );
                }
              }
            );
          }
        });
      return result.status(200).json("SUCCESS_UPDATE");
    };

    if (user.hasOwnProperty("user_name") && user.hasOwnProperty("email")) {
      User.getUserConfirmed(
        {
          user_name: user?.user_name,
        },
        (err, res) => {
          if (res.recordset.length) {
            notifications.push("USER_EXISTS");
            User.getUserByMail({ email: user?.email }, (err, res) => {
              if (res.recordset.length) {
                notifications.push("EMAIL_EXISTS");
              }
            });

            if (notifications.length) {
              return result.send(notifications);
            } else {
              console.log(notifications);
              handleUpdate();
            }
          } else {
            handleUpdate();
          }
        }
      );
    } else if (
      user.hasOwnProperty("user_name") &&
      !user.hasOwnProperty("email")
    ) {
      User.getUserByName(
        {
          user_name: user.user_name,
        },
        (err, res) => {
          if (res.recordset.length) {
            notifications.push("USER_EXISTS");
            return result.send(notifications);
          } else {
            handleUpdate();
          }
        }
      );
    } else if (
      !user.hasOwnProperty("user_name") &&
      user.hasOwnProperty("email")
    ) {
      User.getUserByMail({ email: user?.email }, (err, res) => {
        if (res.recordset.length) {
          notifications.push("EMAIL_EXISTS");
          return result.send(notifications);
        } else {
          handleUpdate();
        }
      });
    } else {
      handleUpdate();
    }
  },
  // ĐĂNG NHẬP
  login: async (req, result) => {
    const data = req.body;
    const salt = await bcrypt.genSalt(10);

    User.getUser(data, async (err, res) => {
      if (res.recordset.length) {
        User.getUserConfirmed(data, async (err, res) => {
          if (res.recordset.length) {
            const validPassword = await bcrypt.compare(
              data.password,
              res.recordset[0].password
            );

            if (validPassword) {
              User.getDetailTypeUser(data, async (err, type_user) => {
                if (err) throw err;
                if (res.recordset.length) {
                  const data = {
                    user: res.recordset[0],
                    type_user: type_user.recordset,
                  };
                  return result.send(data);
                } else {
                  const data = res[0];
                  return result.send(data);
                }
              });
            } else {
              return result.status(200).json("FAILED_LOGIN");
            }
          }
        });
      } else {
        return result.status(200).json("FAILED_LOGIN");
      }
    });
  },
  fbLogin: async (req, result) => {
    const { id, name, email, picture } = req.body;

    const user = {
      user_name: id,
    };
  },
  updateOnline: async (req, res) => {
    const data = req.body;
    User.updateOnline(data, async (err, result) => {
      if (data.online) {
        return res.status(200).json("ONLINE");
      } else {
        return res.status(200).json("OFFLINE");
      }
    });
  },
  deleteUser: async (req, res) => {
    const data = req.body;

    User.deleteUser(data, async (err, result) => {
      if (!err) {
        return res.status(200).json("SUCCESS_DELETE");
      } else {
        return res.status(200).json("FAILED_DELETE");
      }
    });
  },
  getAdminTypeUser: (req, result) => {
    User.getAdminTypeUser((err, res) => {
      return result.status(200).json(res.recordset);
    });
  },
  searchUser: (req, result) => {
    const data = req.body;

    User.searchUser(data, (err, users) => {
      if (err) throw err;
      if (users.recordset) {
        User.getAllDetailTypeUser(async (req, res) => {
          let detail_type_user = res.recordset;
          const merged = users.recordset.map((user) => ({
            ...user,
            detail_type_user: detail_type_user.filter(
              (item) => item.user_name == user.user_name
            ),
          }));
          return result.status(200).json(merged);
        });
      }
    });
  },
};
