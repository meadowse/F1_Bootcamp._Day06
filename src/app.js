// const Sequelize = require("sequelize");
const express = require("express");
const db = require("./models"); 

const app = express();
const urlencodedParser = express.urlencoded({extended: false});
 
// определяем объект Sequelize
// const sequelize = new Sequelize("usersdb", "root", "123456", {
//   dialect: "mysql",
//   host: "localhost",
//   define: {
//     timestamps: false
//   }
// });
 
// определяем модель User
// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   age: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   }
// });
 
app.set("view engine", "hbs");
 
// синхронизация с бд, после успшной синхронизации запускаем сервер
db.sequelize.sync().then(()=>{
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });
}).catch(err=>console.log(err));

const user = db.User
// получение данных
app.get("/", function(req, res){
  user.findAll({order: ['winRate' , 'gamesPlayed'] }).then(data=>{
      res.render("menu/prof/table.hbs", {
        users: data
      });
    }).catch(err=>console.log(err));
});
 
app.get("/prof", function(req, res){
  user.findOne({where: {login: "bahti"}}).then(data=>{
      res.render("menu/prof/prof.hbs", {
        users: data
      });
    }).catch(err=>console.log(err));
});

app.get("/create", function(req, res){
    res.render("menu/login-register-master/login_register_modal.hbs");
});
 
// app.get("/menu", function(req, res){
//   res.render("/menu/menu.hbs");
// });

// добавление данных
app.post("/create", urlencodedParser, function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
         
    const login = req.body.regLogin;
    const password = req.body.regPassword;
  
    user.create({ login: login, password: password}).then(()=>{
      res.redirect("/");
    }).catch(err=>console.log(err));
});
 
// получаем объект по id для редактирования
// app.get("/edit/:id", function(req, res){
//   const userid = req.params.id;
//   user.findAll({where:{id: userid}, raw: true })
//   .then(data=>{
//     res.render("edit.hbs", {
//       user: data[0]
//     });
//   })
//   .catch(err=>console.log(err));
// });
 
// обновление данных в БД
// app.post("/edit", urlencodedParser, function (req, res) {
         
//   if(!req.body) return res.sendStatus(400);
 
//   const login = req.body.login;
//   const gamesPlayed = req.body.gamesPlayed;
//   const userid = req.body.id;
//   user.update({login:login, gamesPlayed: gamesPlayed}, {where: {id: userid} }).then(() => {
//     res.redirect("/");
//   })
//   .catch(err=>console.log(err));
// });
 
// удаление данных
app.post("/delete/:id", function(req, res){  
  const userid = req.params.id;
  user.destroy({where: {id: userid} }).then(() => {
    res.redirect("/");
  }).catch(err=>console.log(err));
});