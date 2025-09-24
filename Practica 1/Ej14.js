const promesa = () => Promise.resolve("Mensaje desde promesa");

const usarComoCallback = (callback) => {
  promesa().then(resultado => callback(resultado));
};

usarComoCallback((msg) => console.log(msg));
