// 載入 express 並建構應用程式伺服器
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const exphbs = require("express-handlebars");


// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get("/", (req, res) => {
  res.render("index");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// 設定 port 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
