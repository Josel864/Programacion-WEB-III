
const tarea1Async = () => new Promise((resolve) => {
  setTimeout(() => {
    console.log("Tarea 1 completada");
    resolve();
  }, 1000);
});

const tarea2Async = () => new Promise((resolve) => {
  setTimeout(() => {
    console.log("Tarea 2 completada");
    resolve();
  }, 1000);
});

// usando async/await
const ejecutar2 = async () => {
  await tarea1Async();
  await tarea2Async();
  console.log("Todas las tareas listas (async/await)");
};

ejecutar2();
