const express = require("express");
const ShopDB = require("./../db/ShopDataBase");

const usersRouter = express.Router();

// routes

usersRouter.get("/", (req, res) => {
  let selectAllUsersQuery = `SELECT * FROM Users`;

  ShopDB.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.delete("/:userID", (req, res) => {
  let userID = req.params.userID;

  let deleteUserQuery = `DELETE FROM Users WHERE id = ${userID}`;

  ShopDB.query(deleteUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.put("/:userID", (req, res) => {
  let userID = req.params.userID;
  let body = req.body;

  let editUserQuery = `UPDATE Users SET firsname="${body.firsname}", lastname="${body.lastname}", username="${body.username}", password="${body.password}", phone=${body.phone}, city="${body.city}", email="${body.email}", address="${body.address}" ,score=${body.score}, buy=${body.buy} WHERE id = ${userID}`;

  ShopDB.query(editUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = usersRouter;
