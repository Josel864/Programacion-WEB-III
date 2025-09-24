const funcionConCallback = (callback) => {
  setTimeout(() => {
    callback("Resultado desde callback");
  }, 1000);
};

const callbackAPromesa = () => {
  return new Promise((resolve) => {
    funcionConCallback(resolve);
  });
};

callbackAPromesa().then(resultado => console.log(resultado));
