"use strict";

let form = document.forms.form;

let bill = form.bill;
let people = form.people;
let custom = form.custom;
let reset = document.querySelector('#reset');
let tip;
let tipValue;

bill.oninput = function() {
  calculate();
}
people.oninput = function() {
  let error = document.querySelector('#error');
  if(parseInt(people.value) === 0){
    error.style.display = 'inline';
    people.classList.add('error');
  }else{
    error.style.display = '';
    people.classList.remove('error');
  }
  calculate();
}
custom.oninput =  function() {
  tipValue = null;
  calculate();
}


let tipWrapper = document.querySelector('.percentage-values');
tipWrapper.onclick = function(event) {
  let target = event.target;
  if(tip) {
    tip.style.backgroundColor = '';
    tip =null;
    tipValue=null;
  }
  if(target.tagName === 'P'){
    custom.value = '';
    target.style.backgroundColor = 'hsl(172, 67%, 45%)';
    tip = target;
    tipValue = target.dataset.value;
    calculate();
  }
}


function calculate() {
  let price = bill.value;
  if(!price) return;

  let person = people.value;
  if(!person) return;
  if(person === '0') return;

  if(!tipValue) tipValue=custom.value;
  if(!tipValue) return;

  let result = price*(tipValue*0.01)/person;

  let amount = document.querySelector('.amount-value');
  amount.innerHTML = '$'+result.toFixed(2);

  let total = document.querySelector('.total-value');
  total.innerHTML = '$' + (price/person + result).toFixed(2);

  reset.classList.add('color');
}



reset.onclick = function() {
  let amount = document.querySelector('.amount-value');
  let total = document.querySelector('.total-value');
  if(parseFloat(amount.innerHTML.slice(1))) {
    form.reset();
    tip.style.backgroundColor = '';
    amount.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
    reset.classList.remove('color');
    error.style.display = '';
    people.classList.remove('error');
  }
}

document.addEventListener('DOMContentLoaded',function (){
  form.reset();
})

