let spans = document.querySelector('#spans');
let spanse = document.querySelector('#spanse')
let expen = document.querySelector('#expen');
let budgetAmount = document.querySelector('#budgetAmount');
let addBudget = document.querySelector('#addBudget');
let expenseName = document.querySelector('#expenseName');
let expenseAmount = document.querySelector('#expenseAmount');
let lait = document.querySelector('.lait');
let prix = document.querySelector('.prix');
let expenseAdd = document.querySelector('#expenseAdd')
let divDepenses = document.querySelector('.divDepenses');
let alerts = document.querySelector('.alerts');
let histori = document.getElementById('histori');
let displayHistori = document.querySelector('.displayHistori');
let tableau = [];
let idet =  0;
let myNewChart;
let error = document.querySelector('.error');
let reset = document.querySelector('#reset');
let local = JSON.parse(localStorage.getItem('tableau'));
if (local) {
  tableau = local
  // idet = local[local.length-1].id+1
}

let body = document.body;


  




function myRandomColor() {
  let couleur = ['red', 'blue', 'yellow', 'white', 'black', 'pink', 'green', 'purple']
  let myChiffre =couleur[Math.floor(Math.random() * couleur.length)] 
}



function budgets() {
  let save = parseInt(budgetAmount.value)
  

    spans.textContent = save
    alerts.style.display = 'block';
    localStorage.setItem('nomes', spans.textContent)
    setTimeout(() =>{
      alerts.style.display = 'none';
    },2000);
  
}

// function expense() {
//   let expene =  parseInt(expenseAmount.value);
//   localStorage.setItem('depns',parseInt(expen.textContent));
//   expen.textContent = someExpens()
// }



function balance() {
  let budgets = parseInt(spans.textContent); // Récupérer le budget depuis localStorage
  let expense = someExpens(); // Récupérer les dépenses depuis localStorage

  // Vérifier que les valeurs sont disponibles
    let balance = budgets - expense;
    spanse.textContent = balance; // Afficher le solde
    // Gérer le cas où budget ou expense n'est pas disponible (par exemple, afficher un message)
  localStorage.setItem('balance', spanse.textContent)
}
if (localStorage.getItem('nomes') != null) {
  spans.textContent = `${localStorage.getItem('nomes')} `
} 
if (localStorage.getItem('depns') != null) {
  expen.textContent = `${localStorage.getItem('depns')} `
}
if (localStorage.getItem('balance') != null) {
  spanse.textContent = `${localStorage.getItem('balance')} `
}



function someExpens() {
  tableau = JSON.parse(localStorage.getItem('tableau'));
  let filtreLocal =0;
  if (tableau.length > 0) {
    filtreLocal = tableau.reduce((a, b)=>{
      a += b.prix
      return a
    },0)
  }
  
  expen.textContent = filtreLocal;
  localStorage.setItem('depns',parseInt(expen.textContent));
  return parseInt(filtreLocal);
  
}

//localStorage un petit exemple de ce dernier
addBudget.addEventListener('click', (e) => {
  e.preventDefault()
   budgets();
   budgetAmount.value = "";
})





const afficheLesDepenses = (afficher) =>{
 divDepenses.innerHTML = ''
if (tableau.length > 0) {
  afficher.forEach(element => {
    divDepenses.innerHTML += `<div class="despen" id="${element.id}">
    <p class="lait">${element.nom}</p>
    <p class="prix">${element.prix}</p>
    <p> <i class="fa-solid fa-pen-to-square editRow" onclick="editDepense(${element.id})" style="color: #12dade;"></i></p>
    <p> <i class="fa-solid fa-trash-can deleteRow" onclick="deleteDepense(${element.id})"  style="color: #da1010;"></i></p>
   </div>`
  });
}
}


const editDepense = (id) =>{
  tableau = JSON.parse(localStorage.getItem('tableau'));
  const element = tableau.find((element) => element.id===id)
  expenseName.value = element.nom;
  expenseAmount.value = element.prix;
}
 
// Fonction pour supprimer une dépense
function deleteDepense(id) {
  let Id = parseInt(id);
  let deleteDiv = document.getElementById(id)

  deleteDiv.remove();

  let newTable = tableau.filter((tabs)=>{
    return tabs.id !==Id;
  })
  tableau = newTable
  localStorage.setItem('tableau', JSON.stringify(tableau))
  balance();
  chartNew() 
}


const depense = ()=>{
  let objete = {
    nom : expenseName.value,
    id : idet,
    prix : parseInt(expenseAmount.value)
  }
  tableau.push(objete)
  idet ++ 
  localStorage.setItem('tableau', JSON.stringify(tableau));
  afficheLesDepenses(tableau)
  balance()
  chartNew() 
}
function chartNew() {
  const nomLabel = tableau.map(en=>en.nom);
  const prixLabel = tableau.map(en=>en.prix);
  myNewChart.data.labels[0] = nomLabel;
  myNewChart.data.datasets[0].data = prixLabel;
  myNewChart.data.datasets[0].backgroundColor = myRandomColor();
  myNewChart.update();
}

expenseAdd.addEventListener('click', (e) =>{
  e.preventDefault()
  depense();
  someExpens()
  expenseName.value = "";
  expenseAmount.value ="";

})
afficheLesDepenses(tableau)

reset.onclick = () =>{
  localStorage.clear();
  document.location.reload()
}

window.onload = function regleChart() {
  const nomLabel = tableau.map(en=>en.nom);
const prixLabel = tableau.map(en=>en.prix);


  const ctx = document.getElementById('myChart');
  myNewChart = new Chart(ctx, {
   type: 'doughnut',
   data: {
     labels: nomLabel,
     datasets: [{
       data: prixLabel, 
       backgroundColor: myRandomColor(), 
       borderWidth: 1,
     }]
   },
 
 });
 myNewChart.update();
} 
histori.addEventListener('click', () =>{
  displayHistori.style.display = 'block'
})

 function myHistorie(afficher) {
  displayHistori.innerHTML =''
  afficher.forEach( element =>{
    displayHistori.innerHTML+= `<div class="dHistor1">
    <p>#</p>
    <p class="expense-title">Expense title</p>
    <p class="expense-value">Expense Value</p>
  </div>
  <div class="dHistor2">
    <p>${element.id}</p>
    <p class="lait">${element.nom}</p>
    <p class="prix">${element.prix}</p>
  </div>`
  })
 }

