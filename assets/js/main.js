//The Like Button
//------ When Clicked the heart turns to red
//------ Popup says "This item has been added to wishlist"
//------ We can remove from wishlist by clicking on the red heart

//Quantity
//------ When click on minus or plus => update the quantity
let inputContainer = document.querySelectorAll(
  ".shopping--cart--quantity--input"
);

inputContainer.forEach((input) => {
  let quantityMinus = input.children[0];
  let quantityPlus = input.children[2];
  let quantityInput = input.children[1];

  quantityPlus.addEventListener("click", function () {
    let inputValue = quantityInput.getAttribute("value");
    if (inputValue < 100) {
      quantityInput.stepUp();
      inputValue++;
      quantityInput.setAttribute("value", inputValue);
      console.log(inputValue);
    }
  });
  quantityMinus.addEventListener("click", function () {
    let inputValue = quantityInput.getAttribute("value");
    if (inputValue > 1) {
      quantityInput.stepDown();
      inputValue--;
      quantityInput.setAttribute("value", inputValue);
      console.log(inputValue);
    }
  });
  quantityInput.addEventListener("input", function () {
    console.log(this);
    if (this.value > 100) {
      quantityInput.setAttribute("value", 100);
      quantityInput.innerHTML("100");
    }
    if (this.value < 1) {
      quantityInput.setAttribute("value", 1);
    } else {
      quantityInput.setAttribute("value", this.value);
    }
  });
});

//------ By updating the quantity we update the *item price, *the subtotal.
