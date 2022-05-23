const encryptOrDecryptVinCode = (vinCode, secret, type) => {
  const regex = new RegExp(`.{1,${secret.length}}`, 'g');
  const substrings = vinCode.match(regex) || [];

  const newSubstrings = substrings.map((substring) => {
    let newSubstring = '';

    for (let i = 0; i < substring.length; i++) {
      const [substringCode, secretCode] = [substring.charCodeAt(i), secret.charCodeAt(i)];
      const charCode = type === 'encryption' ? substringCode + secretCode : substringCode - secretCode;
      const condition = type === 'encryption' ? charCode > 126 : charCode < 33;
      const calculatedCharCode = type === 'encryption' ? 32 + (charCode - 126) : 127 - (33 - charCode);
      newSubstring += condition ? String.fromCharCode(calculatedCharCode) : String.fromCharCode(charCode);
    }

    return newSubstring;
  });

  return newSubstrings.join('');
};

// Testing purposes:

// const vinCode = '1HGCM82633A004352';
// const secret = 'mySecret';

// const encryptedCode = encryptOrDecryptVinCode(vinCode, secret, 'encryption');
// const decryptedCode = encryptOrDecryptVinCode(encryptedCode, secret, 'decryption');

// console.log(encryptedCode);
// console.log(decryptedCode);