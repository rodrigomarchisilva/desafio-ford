const encryptVinCode = (VIN, secret) => {
  const SECRET_LENGTH = secret.length;
  const regex = new RegExp(`.{1,${SECRET_LENGTH}}`, 'g');
  const vinSubstrings = VIN.match(regex) || [];

  const newSubstrings = vinSubstrings.map((substring) => {
    let encryptedSubstring = '';

    for (let i = 0; i < substring.length; i++) {
      const charCode = substring[i].charCodeAt(0) + secret[i].charCodeAt(0);
      if (charCode > 126) {
        const extraCharacters = charCode - 126;
        encryptedSubstring += String.fromCharCode(32 + extraCharacters);
      } else {
        encryptedSubstring += String.fromCharCode(charCode);
      }
    };
    return encryptedSubstring;
  });

  return newSubstrings.join('');
};

const decryptVinCode = (encryptedVinCode, secret) => {
  const SECRET_LENGTH = secret.length;
  const regex = new RegExp(`.{1,${SECRET_LENGTH}}`, 'g');
  const encryptedVinSubstrings = encryptedVinCode.match(regex) || [];

  const newSubstrings = encryptedVinSubstrings.map((substring) => {
    let decryptedSubstring = '';

    for (let i = 0; i < substring.length; i++) {
      const charCode = substring[i].charCodeAt(0) - secret[i].charCodeAt(0);
      if (charCode < 33) {
        const extraCharacters = 33 - charCode;
        decryptedSubstring += String.fromCharCode(127 - extraCharacters);
      } else {
        decryptedSubstring += String.fromCharCode(charCode);
      }
    };
    return decryptedSubstring;
  });

  return newSubstrings.join('');
};