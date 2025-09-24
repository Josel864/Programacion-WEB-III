const contarVocales = (texto) => {
  const resultado = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  texto = texto.toLowerCase();

  for (let i = 0; i < texto.length; i++) {
    let letra = texto[i];
    if (resultado[letra] !== undefined) {
      resultado[letra]++;
    }
  }

  return resultado;
};

console.log(contarVocales("euforia"));
