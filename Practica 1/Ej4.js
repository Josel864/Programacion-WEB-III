const mayorMenor = (numeros) => {
  let mayor = numeros[0];
  let menor = numeros[0];

  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > mayor) {
      mayor = numeros[i];
    }
    if (numeros[i] < menor) {
      menor = numeros[i];
    }
  }

  return { mayor, menor };
};

console.log(mayorMenor([3,1,5,4,2]));
