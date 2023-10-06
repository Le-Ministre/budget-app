let spans = document.querySelector('#spans');
let spanse = document.querySelector('#spanse')
let budgetAmount = document.querySelector('#budgetAmount');
let addBudget = document.querySelector('#addBudget');
let expenseName = document.querySelector('#expenseName');
let expenseAmount = document.querySelector('#expenseAmount');
let lait = document.querySelector('.lait');
let prix = document.querySelector('.prix');
let expenseAdd = document.querySelector('#expenseAdd')
let divDepenses = document.querySelector('.divDepenses');
let tableau = [];
let idet =  0
let error = document.querySelector('.error');
let reset = document.querySelector('#reset');
const local = JSON.parse(localStorage.getItem('tableau'));
if (local) {
  tableau = local
  idet = local[local.length-1].id+1
}

let body = document.body;

const ctx = document.getElementById('myChart');
let myNewChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [{
      data: [], 
      backgroundColor: [], 
      borderWidth: 1
    }]
  },
});

function myRandomColor() {
  let couleur = '0123456789ABCDEF'
  let myChiffre = '#'
  for (let i = 0; i < 6; i++) {
    myChiffre += couleur[Math.floor(Math.random()*16)]
  }
  return myChiffre;
  
}


function budgets() {
  let save = parseInt(budgetAmount.value)
  error.innerHTML = ''
  localStorage.setItem('nomes', budgetAmount.value)
  if (save < 0) {

  } else{
    spans.textContent = save
    error.innerHTML += `<div class="alerts">
    <div class="alert1">Ajout de budget</div>
    <div class="alert2">Votre budget a été ajouté avec success</div>
    </div>`
  }
}
function balance() {
  let balanc = parseInt(budgetAmount.value)
  if (balanc < 0) {
    
  }else{
    spanse.textContent = balanc
  }
  
 }
if (localStorage.getItem('nomes') != null) {
  spans.textContent = `${localStorage.getItem('nomes')} `
  spanse.textContent = `${localStorage.getItem('nomes')} `
}

//localStorage un petit exemple de ce dernier
addBudget.addEventListener('click', (e) => {
  e.preventDefault()
   budgets()
   balance()
})





const afficheLesDepenses = (tableau) =>{
 divDepenses.innerHTML = ''
if (tableau.length > 0) {
  tableau.forEach(element => {
    divDepenses.innerHTML += `<div class="despen">
    <p class="lait">${element.nom}</p>
    <p class="prix">${element.prix}</p>
    <p> <i class="fa-solid fa-pen-to-square editRow" onclick="editDepense(${element.id})" style="color: #12dade;"></i></p>
    <p> <i class="fa-solid fa-trash-can deleteRow" onclick="deleteDepense(${element})"  style="color: #da1010;"></i></p>
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
const deleteDepense = () =>{
  tableau = JSON.parse(localStorage.getItem('tableau'));
  tableau.remove(element)
} 


const depense = ()=>{
  let objete = {
    nom : expenseName.value,
    id : idet,
    prix : expenseAmount.value
  }
  setInterval(() =>{
    error.innerHTML += `<div class="alerts">
  <div class="alert1">Ajout de budget</div>
  <div class="alert2">Votre budget a été ajouté avec success</div>
  </div>`
  },3000);

  tableau.push(objete)
  idet ++ 
  localStorage.setItem('tableau', JSON.stringify(tableau));
  tableau = JSON.parse(localStorage.getItem('tableau'));

  afficheLesDepenses(tableau)

  myNewChart.data.labels.push(objete.nom)
  myNewChart.data.datasets[0].data.push(objete.prix)
  myNewChart.data.datasets[0].backgroundColor.push(myRandomColor())
  myNewChart.update()
}


expenseAdd.addEventListener('click', (e) =>{
  e.preventDefault()
  depense();
 
})
afficheLesDepenses(tableau)

reset.onclick = () =>{
  localStorage.clear();
  document.location.reload()
}


