"use strict";
// Handling Menu Events
const menu = document.querySelector(".menu");
const toggleMenu = document.querySelector(".toggle-menu");
const closeMenu = document.querySelector(".cross-icon");

toggleMenu.addEventListener("click", () => {
  menu.hidden === false ? (menu.hidden = true) : (menu.hidden = false);
});
closeMenu.addEventListener("click", () => {
  menu.hidden = true;
});

// Handling cart events
const elCart = document.querySelector(".cart");
const elCartIcon = document.querySelector(".cart-icon");
const elCartEmpty = document.querySelector(".cartEmpty");
const elItemsInCart = document.querySelector(".itemsInCart");
const elTable = document.querySelector("table");
const elCartTotal = document.querySelector(".total__value");
const elItemsInCartTotal = document.querySelector(".itemsInCartTotal");
const elProductsCards = document.querySelector(".products__cards");

const dataProductsCart = [];

elCartIcon.addEventListener("click", () => {
  elCart.hidden = !elCart.hidden;
  if (elCart.hidden === false) {
    if (dataProductsCart.length !== 0) {
      elCartEmpty.hidden = true;
      elItemsInCart.hidden = false;
    } else {
      elCartEmpty.hidden = false;
      elItemsInCart.hidden = true;
      elTable.hidden = true;
    }
  }
});

if (elProductsCards) {
  elProductsCards.addEventListener("click", (event) => {
    if (event.target.closest(".addCard")) {
      let currElement = event.target;
      while (!currElement.classList.contains("card")) {
        currElement = currElement.parentElement;
      }

      elCartTotal.textContent = dataProductsCart.length;
      elCart.hidden = false;
      elTable.hidden = false;
      elCartEmpty.hidden = true;
      elItemsInCart.hidden = false;

      let name = currElement.querySelector(".subtittle").textContent;
      let price = currElement.querySelector(".total span").textContent;

      const product = {};
      if (dataProductsCart.length === 0) {
        product.name = name;
        product.sum = 1;
        product.price = +price;
        product.total = (product.sum * product.price).toFixed(2);
        dataProductsCart.push(product);
        elCartTotal.textContent = dataProductsCart.length;
      } else {
        if (dataProductsCart.find((item) => item.name === name)) {
          let prodFound = dataProductsCart.find((item) => item.name === name);
          prodFound.sum++;
          prodFound.total = (prodFound.sum * prodFound.price).toFixed(2);
        } else {
          product.name = name;
          product.sum = 1;
          product.price = +price;
          product.total = (product.sum * product.price).toFixed(2);
          dataProductsCart.push(product);
          elCartTotal.textContent = dataProductsCart.length;
        }
      }

      const trProducts = document.querySelectorAll(".product");
      if (trProducts.length !== 0) {
        trProducts.forEach((el) => {
          el.remove();
        });
      }

      dataProductsCart.forEach((el) => {
        const tr = document.createElement("tr");
        tr.classList.add("product");
        const tdName = document.createElement("td");
        const tdSum = document.createElement("td");
        const tdPrice = document.createElement("td");
        const tdTotal = document.createElement("td");

        tdName.textContent = el.name;
        tdSum.textContent = el.sum;
        tdPrice.textContent = el.price;
        tdTotal.textContent = el.total;

        tr.appendChild(tdName);
        tr.appendChild(tdSum);
        tr.appendChild(tdPrice);
        tr.appendChild(tdTotal);
        elTable.appendChild(tr);
      });

      let cartTotal = 0;
      dataProductsCart.forEach((el) => {
        cartTotal = cartTotal + +el.total;
      });
      elItemsInCartTotal.textContent = cartTotal.toFixed(2);
    }
  });
}
