
// 完成網址https://www.google.com
// 短網址：https://urlShortener.herokuapp.com/6y7UP <後五碼隨機>

function generateShortCode() {
  const letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let shortCode = ''
  for (let i = 0; i < 5; i++) {
    const randomLetter = Math.floor(Math.random() * letter.length);
    shortCode += letter[randomLetter];
  }
  return shortCode;
}

module.exports = generateShortCode;










