import * as qrcode from 'qrcode';

export const LoginWithWallet = (req, res) => {
  let base64: string;
  qrcode.toDataURL('xxx', (err, data: string) => {
    if (err) throw err;
    return data;
  });
  res.send({ message: base64 });
};
