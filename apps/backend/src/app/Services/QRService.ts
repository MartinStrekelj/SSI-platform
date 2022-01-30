import * as qrcode from 'qrcode';

export const generateQRfromString = async (
  value: string,
  options: qrcode.QRCodeToDataURLOptions = {}
) => {
  try {
    const url = await qrcode.toDataURL(value, options);
    return url;
  } catch (e) {
    console.error(e);
  }
};
