import express from "express";
import cors from "cors";

import database from "./db";
import generateAccessToken from "./utils/generateAccessToken";
import { AuthenticatedRequest, verify } from "./utils/verifyToken";
import { Server } from "socket.io";
import http from "http";

export const app = express();
app.use(cors());
app.use(express.json());

app.post(
  "/api/account/friends/accept-request",
  verify,
  async (req: AuthenticatedRequest, res) => {
    try {
      const connection = await database.getConnection();
      const { senderID } = req.body;
      const userID = req.user.id;
      // begin a transaction
      await connection.beginTransaction();
      const queryToRemoveFromPendings =
        "DELETE FROM pendings where senderID=? AND receiverID=?;";
      const queryToAddToContacts =
        "INSERT INTO contacts (userID, contactID) VALUES(?, ?)";
      await connection.query(queryToRemoveFromPendings, [senderID, userID]);
      await connection.query(queryToAddToContacts, [senderID, userID]);

      await connection.commit();
      connection.release();
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

app.get(
  "/api/get/friends/requests",
  verify,
  async (req: AuthenticatedRequest, res) => {
    const userID = req.user.id;
    const queryToRetrieveRequests = `SELECT requestsFrom.senderID as senderID, username from users JOIN (SELECT senderID from pendings WHERE receiverID=?) as requestsFrom
    ON users.id = senderID ORDER BY senderID DESC;`;

    try {
      database
        .query(queryToRetrieveRequests, [userID])
        .then((users) => {
          res.send(users);
        })
        .catch(() => {
          res.sendStatus(500);
        });
    } catch (err) {
      console.log(err);
    }
  }
);

app.delete(
  "/api/account/friends/removeRequest/:userIDToRemove",
  verify,
  async (req: AuthenticatedRequest, res) => {
    const userReceiver = req.user.id;
    const userSender = req.params.userIDToRemove;

    const removeRequestQuery = `DELETE FROM pendings where receiverID=? AND senderID=?;`;
    try {
      database
        .query(removeRequestQuery, [userReceiver, userSender])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    } catch (err) {
      console.log(err);
    }
  }
);

app.get(
  "/api/get/friend/sentRequests",
  verify,
  async (req: AuthenticatedRequest, res) => {
    const userID = req.user.id;
    const dbQueryToGetSentRequests = `SELECT receiverID from pendings where senderID=?;`;
    try {
      database
        .query(dbQueryToGetSentRequests, [userID])
        .then((sentToIDs) => res.send(sentToIDs))
        .catch(() => {
          res.sendStatus(500);
        });
    } catch (err) {
      console.log(err);
    }
  }
);

app.post(
  "/api/account/friend/add",
  verify,
  async (req: AuthenticatedRequest, res) => {
    const senderID = req.user.id;
    const receiverID = req.body.receiverID;
    const queryToAddToPendings =
      "INSERT INTO pendings (senderID, receiverID) VALUES(?,?);";
    try {
      database
        .query(queryToAddToPendings, [senderID, receiverID])
        .then((result) => {
          console.log(result);
          res.sendStatus(200);
        })
        .catch(() => {
          res.sendStatus(500);
        });
    } catch (err) {
      console.log(err);
    }
  }
);

app.get(
  "/api/account/search/friends/:username",
  verify,
  (req: AuthenticatedRequest, res) => {
    const username = req.params.username;
    const query = `SELECT id, username from (SELECT DISTINCT id, username from users WHERE
      users.id NOT IN (SELECT friendID from ((SELECT contactID as friendID from contacts where userID=?) UNION (SELECT userID from contacts where contactID=?) 
      UNION (SELECT receiverID from pendings where senderID=?)) as potentialFriends where friendID = id) AND users.id != ?) as availableForSearch
      WHERE username LIKE ?`;
    try {
      database
        .query(query, [
          req.user.id,
          req.user.id,
          req.user.id,
          req.user.id,
          username.concat("%"),
        ])
        .then((result) => {
          res.send(result);
        });
    } catch (err) {
      console.log(err);
    }
  }
);

app.get(
  "/api/account/rooms",
  verify,
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user.id;
    const query = `SELECT userId as friendId, roomId from ((SELECT userId, roomId from Contacts where contactId=?)
  UNION 
  (SELECT contactId, roomId from Contacts where userId = ?)) as merged`;

    try {
      database
        .query(query, [userId, userId])
        .then((rooms) => {
          res.send(rooms);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
);

app.get(
  "/api/account/friends",
  verify,
  async (req: AuthenticatedRequest, res) => {
    const userID = req.user.id;
    const query = `
    SELECT id, username, status from users JOIN ((SELECT contactID as friendID from contacts where userID=?) UNION (SELECT userID from contacts where contactID = ?)) as friends
    ON users.id = friends.friendID;

    `;
    try {
      database
        .query(query, [userID, userID])
        .then((friends) => {
          res.send(friends);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
);

app.post("/api/account/login", async (req, res) => {
  const query =
    "SELECT id, username FROM users WHERE username=? AND password=?";
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    database.query(query, [username, password]).then((result) => {
      if (result.length !== 0) {
        const { id, username } = result[0];
        const token = generateAccessToken(id, username);
        res.send(token);
      } else {
        res.sendStatus(404);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get(
  "/api/account/status",
  verify,
  async (req: AuthenticatedRequest, res) => {
    const statusFetchQuery = "SELECT status FROM users where ID=?";
    database
      .query(statusFetchQuery, [req.user.id])
      .then((data) => res.send(data[0]))
      .catch((err) => {
        console.log(err);
      });
  }
);

app.put(
  "/api/account/status",
  verify,
  async (req: AuthenticatedRequest, res) => {
    const statusToSet = req.body.status;
    const statusUpdateQuery = "UPDATE users SET status=? WHERE ID=?";
    database
      .query(statusUpdateQuery, [!statusToSet, req.user.id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
);

app.post("/api/account/register", async (req, res) => {
  const query =
    "INSERT INTO users (username, password, status) VALUES(?, ?, ?)";

  try {
    const username = req.body.username;
    const password = req.body.password;

    database
      .query(query, [username, password, 1])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(400);
      });
  } catch (err) {
    console.log(err);
  } finally {
  }
});

app.listen(3001, () => {
  console.log("Listening for stuff on port 3001");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (connectedSocket) => {
  console.log(connectedSocket.id);

  connectedSocket.on("error", (error) => {
    console.error("Socket Error:", error.message);
  });
  connectedSocket.on("sendUserFriendRoomsInformation", (data) => [
    console.log(data)
  ])
  connectedSocket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(3002, () => {
  console.log("listening for connections on port 3002");
});
