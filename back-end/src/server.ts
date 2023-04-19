import express from "express";
import cors from "cors";
import database from "./db";
import generateAccessToken from "./utils/generateAccessToken";
import { AuthenticatedRequest, verify } from "./utils/verifyToken";

const app = express();
app.use(cors());
app.use(express.json());



app.post("/api/account/login", async (req, res) => {

  const query = "SELECT id, username FROM users WHERE username=? AND password=?"
  try{
    const username = req.body.username;
    const password = req.body.password;
   
    database.query(query, [username, password]).then((result) => {
     
      if(result.length !== 0){
        const {id, username} = result[0];
        const token = generateAccessToken(id, username);
        res.send(token)
      }else{
        res.sendStatus(404)
      }
    });
  

  }catch(err){
    console.log(err)
  }
})

app.get("/api/account/status", verify, async(req:AuthenticatedRequest, res) => {
    const statusFetchQuery = "SELECT status FROM users where ID=?"
      database.query(statusFetchQuery, [req.user.id]).then(
        (data) => res.send(data[0])
      ).catch(err => {
        console.log(err)
      })
  })

app.put("/api/account/status", verify, async (req:AuthenticatedRequest, res) => {
    const statusToSet = req.body.status;
    const statusUpdateQuery = "UPDATE users SET status=? WHERE ID=?"
    database.query(statusUpdateQuery, [!statusToSet, req.user.id]).then(
      () => {
        res.sendStatus(200)
      }
    ).catch(() =>{
      res.sendStatus(500)
    })

})

app.post("/api/account/register", async (req, res) => {
  const query = "INSERT INTO users (username, password, status) VALUES(?, ?, ?)";

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
