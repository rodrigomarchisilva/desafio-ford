const VIN = '1HGCM82633A004352';
const secret = 'mySecret';

const encryptVinCode = (VIN, secret) => {
  const SECRET_LENGTH = secret.length;
  const regex = new RegExp(`/.{1,${SECRET_LENGTH}}/g`);
  const vinSubstrings = VIN.match(regex) || [];

  vinSubstrings.map((substring) => {
    let newSubstring = '';
    substring.forEach((character, index) => {
      const charCode = character.charCodeAt(0) + secret[index].charCodeAt(0);
      if (charCode > 126 && (32 + charCode - 126) > 126) {
        newSubstring += String.fromCharCode(32 + charCode - 252);
      } else if (charCode > 126) {
        newSubstring += String.fromCharCode(32 + charCode - 126);
      } else {
        newSubstring += String.fromCharCode(charCode);
      }
    });
  });
};