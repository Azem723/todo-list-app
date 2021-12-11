import JSEncrypt from 'jsencrypt';
import { publicKey } from './res_public_key';

// 私钥
function rsaEncrypt(data) {
  const encode = new JSEncrypt();
  encode.setPrivateKey(publicKey);
  const encodeData = encode.encrypt(data);
  return encodeData;
}

export default rsaEncrypt;
