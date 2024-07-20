const express = require ("express");

const app = express();

function userMiddleware(req, res, next){
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.query.kidneyId;
  
  if(username != "aniket" && password != "password"){
    res.status(403).json({
      msg: "Something's wrong!"
    })
  }else {
    next();
  }
}
function kidneyMiddleware(req, res, next){
  if(kidneyId != 1 && kidneyId != 2){
    res.status(403).json({
      msg: "Something's wrong!"
    })
  } else {
    next();
  }
}
app.use(userMiddleware);
app.use(kidneyMiddleware);

app.get("/health-checkup", userMiddleware, kidneyMiddleware, function(req, res){
  // do something
  res.send("Your heart is healthy!");
})

app.get("/kidney-check", userMiddleware, kidneyMiddleware, function(req, res){
  // do something
  res.send("Your kidney is healthy!");
})
app.listen(3000);
