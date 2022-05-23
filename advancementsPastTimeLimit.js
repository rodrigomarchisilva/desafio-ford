const encryptOrDecryptVinCode = (vinCode, secret, type) => {
  const regex = new RegExp(`.{1,${secret.length}}`, 'g');
  const substrings = vinCode.match(regex) || [];

  const newSubstrings = substrings.map((substring) => {
    let newSubstring = '';

    for (let i = 0; i < substring.length; i++) {
      const charCode = substring[i].charCodeAt(0) - secret[i].charCodeAt(0);
      const condition = type === 'encryption' ? charCode > 126 : charCode < 33;
      const calculatedCharCode = type === 'encryption' ? 32 + (charCode - 126) : 127 - (33 - charCode);

      if (condition) newSubstring += String.fromCharCode(calculatedCharCode);
      else newSubstring += String.fromCharCode(charCode);
    }

    return decryptedSubstring;
  });

  return newSubstrings.join('');
};