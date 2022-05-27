//main.js
document.querySelector('#shoot').addEventListener('click', makeReq)

async function makeReq(){

  const playerChoice = document.querySelector("#playerSelection").value;
  const res = await fetch(`/api?pick=${playerChoice}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#playerSelection").textContent = data.compRes
}