const esPalindromo = (cadena) => {
  let inicio = 0;
  let fin = cadena.length - 1;

  while (inicio < fin) {
    if (cadena[inicio] !== cadena[fin]) {
      return false;
    }
    inicio++;
    fin--;
  }

  return true;
};

console.log(esPalindromo("oruro"));
console.log(esPalindromo("hola"));
