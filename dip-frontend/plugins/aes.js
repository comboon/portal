import CryptoJS from 'crypto-js'
const keyStr='12345678abcdefgh'
export default {
  //加密
  encrypt(word){
    // 当未输入秘钥时，以下代码设置默认的秘钥
    let key  = CryptoJS.enc.Utf8.parse(keyStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode:CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();

  },
  //解密
  decrypt(word){
    let key  = CryptoJS.enc.Utf8.parse(keyStr);
    let decrypt = CryptoJS.AES.decrypt(word, key, {
      mode:CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypt.toString(CryptoJS.enc.Utf8).toString();
  },
  getKey(){
    let len = 16;
    let chars ='ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890';
    let maxPos = chars.length;
    let character = '';
    for (let i = 0; i < len; i++) {
      character += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return character;
  }
}
