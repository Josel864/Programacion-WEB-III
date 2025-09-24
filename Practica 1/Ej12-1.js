//Con callbacks

function tarea1(callback) {
  setTimeout(() => {
    console.log("Tarea 1 completada");
    callback();
  }, 1000);
}

function tarea2(callback) {
  setTimeout(() => {
    console.log("Tarea 2 completada");
    callback();
  }, 1000);
}

tarea1(() => {
  tarea2(() => {
    console.log("Todas las tareas listas");
  });
});
