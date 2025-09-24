const separarParesImpares = (numeros) => {
  const resultado = { pares: [], impares: [] };

  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
      resultado.pares.push(numeros[i]);
    } else {
      resultado.impares.push(numeros[i]);
    }
  }

  return resultado;
};

console.log(separarParesImpares([1,2,3,4,5]));
