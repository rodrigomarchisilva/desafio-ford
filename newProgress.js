const encryptOrDecryptVinCode = (vinCode, secret, type) => {
  const regex = new RegExp(`.{1,${secret.length}}`, 'g');
  const substrings = vinCode.match(regex) || [];

  const newSubstrings = substrings.map((substring) => {
    let newSubstring = '';

    for (let i = 0; i < substring.length; i++) {
      const [substringCode, secretCode] = [substring.charCodeAt(i), secret.charCodeAt(i)];
      const code = type === 'encryption' ? substringCode + secretCode : substringCode - secretCode;
      const condition = type === 'encryption' ? code > 126 : code < 33;
      const adaptedCode = type === 'encryption' ? 32 + (code - 126) : 127 - (33 - code);
      newSubstring += condition ? String.fromCharCode(adaptedCode) : String.fromCharCode(code);
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

// console.log(`Código criptografado: ${encryptedCode}`);
// console.log(`Código descriptografado: ${decryptedCode}`);
// console.log(
//   `${decryptedCode === vinCode
//     ? 'Código descriptografado é igual ao original'
//     : 'Código descriptografado é diferente do original'
//   }`
// );