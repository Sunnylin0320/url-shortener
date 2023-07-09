const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 3000;
const SERVER = `http://localhost:${port}/`;
const Url = require("./models/url");
const shortCode = require("./generateShortUrl");

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
// 設置連接到 MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// 取得數據庫連接狀態
const db = mongoose.connection;
// 連接異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連接成功
db.once("open", () => {
  console.log("mongodb connected!");
});

// 首頁路由
app.get("/", (req, res) => {
  res.render("index");
});

// 產生短網址
app.post("/", (req, res) => {
  // 如果输入為空，重新倒回首頁
  if (!req.body.name) {
    return res.redirect("/");
  }
  const name = req.body.name;
  // 去 Url models 找尋
  Url.findOne({ name: name }).then((url) => {
    if (url) {
      // 若存在，直接返回資料庫的數據
      res.render("index", { url: url.short, name: url.name });
    } else {
      // 若不存在，生成新的短網址
      const short = shortCode();
      Url.create({ short, name }) // 存入資料庫
        .then(() => {
          res.render("index", { url: short, name: name });
        })
        .catch((error) => console.log(error));
    }
  });
});

// 短網址連回原網址
app.get("/:shortCode", (req, res) => {
  const shortCodeParam = req.params.shortCode;
  const shortURL = SERVER + shortCodeParam;
  Url.findOne({ short: shortCodeParam }).then((url) => {
    if (url) {
      res.redirect(url.name);
    } else {
      res.redirect("/");
    }
  });
});


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
