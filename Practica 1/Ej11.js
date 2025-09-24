new Promise((resolve) => {
  resolve(2);
})
.then(num => {
  console.log(num);
  return num * 2;
})
.then(num => {
  console.log(num);
  return num * 2;
})
.then(num => {
  console.log(num);
});
