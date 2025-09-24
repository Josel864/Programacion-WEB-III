// Con promesas

const obtenerDatos = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve("Datos obtenidos"), 1000);
  });
};

obtenerDatos().then(data => console.log(data));

//Con async/await

const obtenerDatosAsync = async () => {
  const data = await obtenerDatos();
  console.log(data);
};

obtenerDatosAsync();
