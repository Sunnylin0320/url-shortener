# url-shortener

# 專案名稱

專案名稱是一個URL縮短服務，它可以將長URL轉換為短URL，並提供重定向功能。

## 功能特點

- 輸入長URL，生成對應的短URL
- 點擊短URL，重定向到原始的長URL
- 支援保存和查詢URL的資料庫

## 技術堆疊

- Node.js
- Express.js
- MongoDB
- Handlebars模板引擎

## 安裝與執行

1. git clone [https://github.com/Sunnylin0320/url-shortener]

2. 進入專案目錄：cd url-shortener

3. 安裝相依套件：npm install

4. 設定環境變數：

- 在根目錄建立一個 `.env` 檔案，並根據需要設定以下變數：MONGODB_URI=<your-mongodb-uri>

5. 啟動應用程式：npm start

6. 在瀏覽器中打開 `http://localhost:3000`

