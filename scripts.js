//import { ENETDOWN } from "constants";

//const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
  
    // TODO láta hluti í _items virka
    for (let item of items.querySelectorAll('.item')) {
      const checkbox = item.querySelector('.item__checkbox')
      checkbox.addEventListener('change', finish)
      const button = item.querySelector('.item__button')
      button.addEventListener('click',deleteItem)
      const text = item.querySelector('.item__text')
      text.addEventListener('click',edit)
      //console.log(checkbox)
    }
  }

  function formHandler(e) {
    e.preventDefault();
    const words = e.target
    //console.log(words)
    const input = words.querySelector('input')
    //console.log(input.value)
    add(input.value)
  }

  // event handler fyrir það að klára færsluc
  function finish(e) {
    //console.log(e)
    const {target} = e;
    const {parentNode} = target
    parentNode.classList.toggle('item--done', !(parentNode.classList.contains('item--done')))
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const thing = e.target
    thing.removeEventListener('click', edit)
    const words = thing.childNodes[0].nodeValue
    //console.log(words)
    const putin = document.createElement('input')
    putin.setAttribute('class','form__input')
    putin.setAttribute('type','text')
    putin.setAttribute('value',words)
    putin.focus()
    thing.childNodes[0].nodeValue = ''
    //console.log(putin)
    thing.append(putin)
    putin.addEventListener('keydown',commit)
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (event.keyCode == 13){
      const thing = e.target
      const upper = thing.parentNode
      upper.childNodes[0].nodeValue = thing.value
      upper.removeChild(thing)
      upper.addEventListener('click', edit)
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const li = document.createElement('li')
    li.setAttribute('class','item')
    const input = document.createElement('input')
    input.setAttribute('class','item__checkbox')
    input.setAttribute('type','checkbox')
    input.addEventListener('change', finish)
    const span = document.createElement('span')
    span.setAttribute('class','item__text')
    span.append(document.createTextNode(value))
    span.addEventListener('click',edit)
    const button = document.createElement('button')
    button.setAttribute('class','item__button')
    button.append(document.createTextNode('eyða'))
    button.addEventListener('click',deleteItem)
    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)
    items.appendChild(li)
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    //console.log(e)
    const button = e.target
    const li = button.parentNode
    const ul = li.parentNode
    ul.removeChild(li)
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
  }

  return {
    init: init
  }
})();
