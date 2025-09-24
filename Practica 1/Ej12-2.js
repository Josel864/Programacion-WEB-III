// Con async/await

const tarea1Async = () => new Promise(resolve => {
  setTimeout(() => {
    console.log("Tarea 1 completada");
    resolve();
  }, 1000);
});

const tarea2Async = () => new Promise(resolve => {
  setTimeout(() => {
    console.log("Tarea 2 completada");
    resolve();
  }, 1000);
});

const ejecutar = async () => {
  await tarea1Async();
  await tarea2Async();
  console.log("Todas las tareas listas");
};

ejecutar();
