const ejecutarCallback = (callback) => {
  setTimeout(() => {
    callback();
  }, 2000);
};

ejecutarCallback(() => {
  console.log("Callback despues de 2 segundos");
});
