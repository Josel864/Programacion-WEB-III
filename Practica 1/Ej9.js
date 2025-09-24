const promesaExito = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Exito despues de 3 segundos");
  }, 3000);
});

promesaExito.then(mensaje => console.log(mensaje));
