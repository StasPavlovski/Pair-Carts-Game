// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  let arrCarts = [];
  for (let i = 1; i <= count; ++i) {
    arrCarts.push(i);
    arrCarts.push(i);
  }
  return arrCarts;
  // console.log(arrCarts);
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
  // console.log(arr);
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
let success = false;
let countWidth = 1;

function startGame(count) {
  const arrCartsShuffled = shuffle(createNumbersArray(count));
  let cartsList = document.createElement('ul');
  cartsList.classList.add('list-group', 'list-group-horizontal');
  cartsList.style.maxWidth = 96*countWidth + 'px';

  for (cart of arrCartsShuffled) {
    let cartsListElement = document.createElement('li');
    cartsListElement.classList.add('list-group-item')
    cartsListElement.textContent = cart;
    cartsListElement.setAttribute('id', cart);
    cartsList.append(cartsListElement);
  }

  document.body.append(cartsList);

  let selectedCart = document.getElementsByClassName('list-group-item');

  let firstCart = null;
  let secondCart = null;
  let thirdCart = null;
  let scores = 0;

  for (let i = 0; i < selectedCart.length; i++) {
    selectedCart[i].addEventListener('click', () => {
      // if (firstCart == null || secondCart == null) {
      //   selectedCart[i].classList.add('selected-cart');
      // }
      // else { }

      if (firstCart == null && !selectedCart[i].classList.contains('match')) {
        firstCart = selectedCart[i];
        firstCart.classList.add('selected-cart');
        console.log('perva karta', firstCart);
      }
      else if (secondCart == null && firstCart !== selectedCart[i] && !selectedCart[i].classList.contains('match')) {
        secondCart = selectedCart[i];
        secondCart.classList.add('selected-cart');
        console.log('vtora karta', secondCart);
      }
      else if (thirdCart == null && firstCart !== selectedCart[i] && secondCart !== selectedCart[i] && !selectedCart[i].classList.contains('match')) {
        thirdCart = selectedCart[i];
        thirdCart.classList.add('selected-cart');
        console.log('tretja karta', secondCart);
        firstCart.classList.remove('selected-cart-wrong');
        secondCart.classList.remove('selected-cart-wrong');
        secondCart = null;
        firstCart = thirdCart;
        thirdCart = null;
      }
      else { }

      if (firstCart !== null && secondCart !== null) {
        if (firstCart.textContent == secondCart.textContent) {
          console.log('MATCH!');
          firstCart.classList.add('match');
          secondCart.classList.add('match');
          scores++;
          // document.getElementById(firstCart.textContent).remove();
          // document.getElementById(firstCart.textContent).remove();
          firstCart = null;
          secondCart = null;
          console.log(selectedCart);
        }
        else {
          console.log('DIFFERENT CARTS ARE SELECTED');
          firstCart.classList.remove('selected-cart');
          secondCart.classList.remove('selected-cart');
          firstCart.classList.add('selected-cart-wrong');
          secondCart.classList.add('selected-cart-wrong');
          // setTimeout(() => {
          //   firstCart.classList.remove('selected-cart-wrong');
          //   secondCart.classList.remove('selected-cart-wrong');
          //   firstCart.classList.add('selected-cart');
          //   secondCart.classList.add('selected-cart');
          //   firstCart = null;
          //   secondCart = null;
          // }, 1000);
        }

        // if (firstCart !== null && secondCart !== null && thirdCart == null) {
        //   thirdCart = selectedCart[i];
        //   firstCart = null;
        //   secondCart = null;
        //   firstCart = thirdCart;
        //   thirdCart = null;
        //   console.log('trtja carta vybrana');
        // }

        // else { }

      }
      else { }

      if (scores == count) {
        console.log('FINISH');
        console.log(scores);
        success = true;
        let restartButton = document.createElement('button');
        restartButton.textContent = 'Начать заново';
        restartButton.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');
        document.body.append(restartButton);
        restartButton.addEventListener('click', () => {
          window.location.reload();
        })
      }
      else { }

    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  count = prompt('Введите четное количество карточек по вертикали/горизонтали от 2 до 10', 4);

  if (count < 2 || count > 10 || count % 2 !== 0) {
    count = 4;
    alert('Сгенерированы 4 карточки по вертикали/горизонтали')
  }
  else { };

  countWidth = parseInt(count) + 1;
  count = (count * count) / 2;

  startGame(count);
  let time = 60;

  let timer = setInterval(() => {
    time--;
    document.getElementById('timer').textContent = time + ' секунд';
    if (success == true) {
      time = time;
      clearInterval(timer);
    }
    if (time == 0) {
      clearInterval(timer);
      let reload = confirm("Время вышло, хотите начать новую игру?");
      if (reload) {
        window.location.reload();
      }
      else { }
    }
    else { };
  }, 1000);


})
