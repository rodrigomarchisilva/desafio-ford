const encryptVinCode = (vinCode, secret) => {
  const SECRET_LENGTH = secret.length;
  const regex = new RegExp(`.{1,${SECRET_LENGTH}}`, 'g');
  const substrings = vinCode.match(regex) || [];

  const encryptedSubstrings = substrings.map((substring) => {
    let encryptedSubstring = '';

    for (let i = 0; i < substring.length; i++) {
      const charCode = substring[i].charCodeAt(0) + secret[i].charCodeAt(0);
      if (charCode > 126) encryptedSubstring += String.fromCharCode(32 + (charCode - 126));
      else encryptedSubstring += String.fromCharCode(charCode);
    };

    return encryptedSubstring;
  });

  return encryptedSubstrings.join('');
};

const decryptVinCode = (encryptedVinCode, secret) => {
  const SECRET_LENGTH = secret.length;
  const regex = new RegExp(`.{1,${SECRET_LENGTH}}`, 'g');
  const encryptedSubstrings = encryptedVinCode.match(regex) || [];

  const decryptedSubstrings = encryptedSubstrings.map((substring) => {
    let decryptedSubstring = '';

    for (let i = 0; i < substring.length; i++) {
      const charCode = substring[i].charCodeAt(0) - secret[i].charCodeAt(0);
      if (charCode < 33) decryptedSubstring += String.fromCharCode(127 - (33 - charCode));
      else decryptedSubstring += String.fromCharCode(charCode);
    }

    return decryptedSubstring;
  });

  return decryptedSubstrings.join('');
};