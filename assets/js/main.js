//Cart Items Object
let cartItems = [
  {
    itemName: "Pasta",
    itemSku: "21456",
    itemUnitPrice: 10,
    itemImage: "./assets/images/food/pasta.png",
  },
  {
    itemName: "Caesars",
    itemSku: "20983",
    itemUnitPrice: 16,
    itemImage: "./assets/images/food/caesars.png",
  },
  {
    itemName: "Imperial",
    itemSku: "35981",
    itemUnitPrice: 24,
    itemImage: "./assets/images/food/imperial.png",
  },
];
let subtotalValue = 0;
//make table scrollable if cart Items > 3
if (cartItems.length > 3) {
  document.querySelector(".shopping--cart tbody").style.display = "block";
}

cartItems.forEach((cartItem) => {
  let cartItemHtml = `<tr class="shopping--cart--item">
    <td class="shopping--cart--like">
      <i class="far fa-heart outlined"
        ><i class="fas fa-heart filled"></i
      ></i>
    </td>
    <td class="shopping--cart--img">
      <img
        src="${cartItem.itemImage}"
        alt=""
      />
    </td>
    <td class="shopping--cart--name">
      <h4>${cartItem.itemName}</h4>
      <span class="sopping--cart--sku">#${cartItem.itemSku}</span>
    </td>
    <td class="shopping--cart--quantity">
      <div class="shopping--cart--quantity--input">
        <div class="shopping--cart--quantity--minus">
          <i class="fas fa-minus"></i>
        </div>
        <input
          type="number"
          name="item-${cartItem.itemSku}-quantity"
          id="item-${cartItem.itemSku}-quantity"
          value="1"
        />
        <div class="shopping--cart--quantity--plus">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </td>
    <td class="shopping--cart--item--price" data-unitprice="${cartItem.itemUnitPrice}" data-itemtotal="${cartItem.itemUnitPrice}">
      <p>${cartItem.itemUnitPrice}</p>
    </td>
    <td class="shopping--cart--remove">
      <i class="fas fa-times"></i>
    </td>
  </tr>`;
  document.querySelector(".shopping--cart tbody").innerHTML += cartItemHtml;
  subtotalValue += cartItem.itemUnitPrice;
});
document.querySelector(
  ".shopping--cart--subtotal--value"
).innerHTML = `${subtotalValue} $`;

//Quantity update

let inputContainer = document.querySelectorAll(
  ".shopping--cart--quantity--input"
);
window.onload = () => {
  //add event listener to prevent the default behavior
  let myInputType = document.querySelector(
    ".shopping--cart--quantity--input input"
  );
  myInputType.addEventListener("keypress", (event) => {
    event.preventDefault();
  });
};

inputContainer.forEach((input) => {
  //Input Variables
  let quantityMinus = input.children[0];
  let quantityPlus = input.children[2];
  let quantityInput = input.children[1];
  //Price Variables
  let unitPriceValue =
    input.parentElement.parentElement.children[4].dataset.unitprice;
  let itemTotal = input.parentElement.parentElement.children[4].children[0];
  let itemTotalValue = unitPriceValue;
  //Item Price Element
  let itemPriceElement = input.parentElement.parentElement.children[4];
  //Incrementing Function
  quantityPlus.addEventListener("click", function () {
    let inputValue = quantityInput.getAttribute("value");
    if (inputValue < 20) {
      //Updating Quantity Value
      quantityInput.stepUp();
      inputValue++;
      quantityInput.setAttribute("value", inputValue);
      //Updating Item Total
      itemTotalValue = unitPriceValue * inputValue;
      itemTotal.innerHTML = itemTotalValue;
      itemPriceElement.setAttribute("data-itemtotal", itemTotalValue);
      updateSubtotals();
    }
  });
  //Decrementing Function
  quantityMinus.addEventListener("click", function () {
    let inputValue = quantityInput.getAttribute("value");
    if (inputValue > 1) {
      //Updating Quantity Value
      quantityInput.stepDown();
      inputValue--;
      quantityInput.setAttribute("value", inputValue);
      //Updating Item Total
      itemTotalValue = unitPriceValue * inputValue;
      itemTotal.innerHTML = itemTotalValue;
      itemPriceElement.setAttribute("data-itemtotal", itemTotalValue);
      updateSubtotals();
    }
  });
});

//------ By updating the quantity we update the *item price, *the subtotal.
//Updating Subtotals Function

function updateSubtotals() {
  subtotalArray = [];
  let dataItemTotals = document.querySelectorAll("[data-itemtotal]");
  dataItemTotals.forEach((dataItemTotal) => {
    subtotalArray.push(parseInt(dataItemTotal.dataset.itemtotal));
  });

  subtotalValue = subtotalArray.reduce((a, b) => a + b);
  console.log(`sub = ${subtotalValue}`);
  document.querySelector(
    ".shopping--cart--subtotal--value"
  ).innerHTML = `${subtotalValue} $`;
}

//remove Item
document.querySelectorAll(".shopping--cart--remove i").forEach((remove) => {
  remove.addEventListener("click", () => {
    cartItemEl = remove.parentElement.parentElement;
    cartItemEl.remove();
    updateSubtotals();
  });
});

//The Like Button
//------ When Clicked the heart turns to red
likeOutlined = document.querySelectorAll(".shopping--cart--like .outlined");
likeFilled = document.querySelectorAll(".shopping--cart--like .filled");

likeOutlined.forEach((outlined) => {
  var i = 0;
  outlined.addEventListener("click", (e) => {
    if (i % 2 === 0) {
      i++;
      outlined.children[0].style.opacity = "1";
    } else {
      i++;
      outlined.children[0].style.opacity = "0";
    }
  });
});
