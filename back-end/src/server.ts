import express from "express";
import cors from "cors";
import database from "./db";
import generateAccessToken from "./utils/generateAccessToken";

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

app.post("/api/account/register", async (req, res) => {
  const query = "INSERT INTO users (username, password) VALUES(?, ?)";

  try {
    const username = req.body.username;
    const password = req.body.password;

    database
      .query(query, [username, password])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
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
