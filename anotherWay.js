const encryptOrDecryptVinCode = (input, secret, type) => {
  let output = '';
  let currentIndex = 0;
  const lastIndex = secret.length - 1;

  for (let character of input) {
    const [characterCode, secretCode] = [character.charCodeAt(0), secret.charCodeAt(currentIndex)];
    const code = type === 'encryption' ? characterCode + secretCode : characterCode - secretCode;
    const condition = type === 'encryption' ? code > 126 : code < 33;
    const adaptedCode = type === 'encryption' ? 32 + (code - 126) : 127 - (33 - code);
    output += condition ? String.fromCharCode(adaptedCode) : String.fromCharCode(code);
    currentIndex += currentIndex === lastIndex ? -lastIndex : 1;
  }

  return output;
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