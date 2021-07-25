'use strict';
let container=document.getElementById('tableplace');
let tableEl=document.createElement('table');
container.appendChild(tableEl);
let tableHeader=['Book Name','Book Page','Price'];
let allBooks=[];
function OrderBook (name,price){
  this.name=name;
  this.pages=getRandomPages(1,500);
  this.price=price;
  allBooks.push(this);
  saveTolocal();
}

function saveTolocal(){
  let data=JSON.stringify(allBooks);
  localStorage.setItem('books',data);
}
function readFromLocal (){
  let stringObj=localStorage.getItem('books');
  let normalObj=JSON.parse(stringObj);
  if(normalObj!==null){
    for (let i = 0; i < normalObj.length; i++) {
      let newItem= new OrderBook(normalObj[i].name,normalObj[i].price);
      newItem.render();

    }
  }
}

function getRandomPages(min, max) {
  return Math.random() * (max - min) + min;
}

function creatTableHeader(){
  let trEl=document.createElement('tr');
  tableEl.appendChild(trEl);
  for (let i = 0; i < tableHeader.length; i++) {
    let thEl=document.createElement('th');
    thEl.textContent=tableHeader[i];
    trEl.appendChild(thEl);
  }
}
creatTableHeader();

OrderBook.prototype.render= function(){
  let trEl=document.createElement('tr');
  tableEl.appendChild(trEl);
  for (let i = 0; i < allBooks.length; i++) {
    trEl.textContent='';
    let bookTd=document.createElement('td');
    bookTd.textContent=this.name;
    let pagesTd=document.createElement('td');
    pagesTd.textContent=parseInt(this.pages);
    let priceTd=document.createElement('td');
    priceTd.textContent=this.price;
    trEl.appendChild(bookTd);
    trEl.appendChild(pagesTd);
    trEl.appendChild(priceTd);
  }
};
readFromLocal();

let myform=document.getElementById('myform');
myform.addEventListener('submit',Addbook);

function Addbook (event){
  event.preventDefault();
  let name=event.target.bookname.value;
  let price=event.target.book.value;
  let item= new OrderBook (name,price);
  item.render();
}

