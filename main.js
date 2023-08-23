// ------------------------------------variables-globales----------------------------------------

const consultas = [];
let resultadoInicial ='';
let resultadoFinal ='';
let resultadoFinalDecimal =''; 
let formulario = document.getElementById("formulario");
let consultar = document.getElementById('consultar');
let consultaNueva =document.getElementById('consultarNueva');
let borrar = document.getElementById('borrar');
let contenedor = document.getElementById('contenedor');

/* ------------------------------------Evento----------------------------------------*/

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
// Calculos sobre los valores ingresados por el usuario
  let valor = document.getElementById("monto").value;
  let plan = Number(document.querySelector('input[name="plan"]:checked').value);
  function interestsCalculator(valor, plan) {
    switch (plan) {
      case 12:
        return valor * 2.25;
        break;
      case 24:
        return valor * 2.5;
        break;
      case 36:
        return valor * 2.75;
        break;
    }
  }
resultadoInicial = interestsCalculator(valor, plan);
function amountCalculator(plan, resultadoInicial) {
       return resultadoInicial/plan
  }
resultadoFinal = amountCalculator(plan, resultadoInicial);
resultadoFinalDecimal = parseInt(resultadoFinal.toFixed(2)); //reducir a numero con 2 decimales
//   console.log(finalResultDecimal);

//mostrar la consulta relizada
contenedor.innerHTML="";
let div = document.createElement('div');
    div.innerHTML=`
    <p class="h5 mt-3">Resultado de su consulta:</p>
    <ul class="list-group list-group-flush list-inline-item" style="width:100%;">
    <li class="list-group-item list-inline-item">EL monto total es a pagar es $${resultadoInicial}</li>
    <li class="list-group-item list-inline-item">En un plan de ${plan} cuotas</li>
    <li class="list-group-item list-inline-item">Pagara $${resultadoFinalDecimal} por mes</li>
    </ul>`;
contenedor.append(div);

//almacenar consultas realizadas en el localStorage
consultas.push({ resultadoInicial, plan, resultadoFinalDecimal});
consultas.forEach(() => {
    localStorage.setItem('datos', JSON.stringify(consultas));
  });
});
console.log(consultas);


/* ------------------------------------Evento----------------------------------------*/

consultar.addEventListener('click',(e)=>{
    e.preventDefault();

let datosObtenidos =JSON.parse(localStorage.getItem('datos'));
contenedor.innerHTML="";
datosObtenidos.forEach((item)=>{
    let div = document.createElement('div');
    div.innerHTML=`
    <p class="h5 mt-3">Resultado de su consulta:</p>
    <ul class="list-group list-group-flush" style="width:100%;">
  <li class="list-group-item list-inline-item">EL monto total es $${item.resultadoInicial}.</li>
  <li class="list-group-item list-inline-item">En un plan de ${item.plan} cuotas.</li>
  <li class="list-group-item list-inline-item">Pagara $${item.resultadoFinalDecimal} por mes.</li>
</ul>
    `;
    contenedor.append(div);
});
});
/* ------------------------------------Evento----------------------------------------*/
consultaNueva.addEventListener('click',(e)=>{
  e.preventDefault();
  contenedor.innerHTML="";
  formulario.reset();
})


/* ------------------------------------Evento----------------------------------------*/
borrar.addEventListener('click',()=>{
localStorage.clear();
location. reload();
contenedor.innerHTML='';
})



