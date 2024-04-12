function validate() {
    var name = $('#name').val();
    var genderm = $('#genderm').prop("checked");
    var genderf = $('#genderf').prop("checked");
    
    var email = $('#email').val();
    var pwd1 = $('#password').val();
    var pwd2 = $('#repeat-password').val();
    var term = document.getElementById("term_service").checked;

    var errMsg = "";
    var result = true;
    // var pattern = /^[a-zA-Z ]+$/ 
    var pwdpattern1 = /^.{8,}$/;

    if (name == "") {
        errMsg += "Name cannot be empty.\n";
    }
    if (email == "") {
        errMsg += "Email cannot be empty.\n";
    }
    if (pwd1 == "") {
        errMsg += "Password cannot be empty.\n";
    }
    if (pwd2 == "") {
        errMsg += "Please retype the password.\n";
    }
    if (term == false) {
        errMsg += "Please read our terms of service and check the box.\n";
    }
    if ((genderm == "")&&(genderf == "")) {
		errMsg += "A gender must be selected.\n";
	}
    // if (gender == ""){
    //     errMsg += "A gender must be selected.\n";
    // }

    if (pwd1 != pwd2) {
		errMsg += "Passwords do not match.\n";
	}

    if (! pwd1.match (pwdpattern1)) {
		errMsg += "Password must contain at least 9 digits.\n";
	}

    if (errMsg != "") {
		alert (errMsg);
		result = false;
	} 
	return result;
}

function validatePay() {
    var postcode = $('#postcode').val();
    var payOn = $('#online').prop("checked");
    var payonPick = $('#whenpickup').prop("checked");


    var delivery = $('#delivery').prop("checked");
    var pickup = $('#pickup').prop("checked");

    var codepattern = /^\d{4}$/;

    var errMsg = "";
    var result = true;

    if ((delivery == "")&&(pickup == "")) {
		errMsg += "Please select your order method.\n";
	}

    if (postcode == "") {
        errMsg += "Please enter postcode.\n"
    }

    if (! postcode.match (codepattern)) {
		errMsg += "Postcode must contain at least 4 digits.\n";
	}

    if ((payOn == "")&&(payonPick == "")) {
		errMsg += "Please select your payment method.\n";
	}
    
    // fill billing address
    

    if (errMsg != "") {
		alert (errMsg);
		result = false;
	} 
	return result;
}

function fillBillingAddress() {
    var errMsg = "";
    var address = $('#address').val();
    var billingAddressField = document.getElementById('address2');
    var sameAsDelivery = document.getElementById('sameAsDelivery').checked;

    if (sameAsDelivery) {
      if (address === "") {
        errMsg += "Please enter your delivery address first.";
      } else {
        billingAddressField.value = address;
        
      }
    } else {
      billingAddressField.value = ''; // Clear billing address if checkbox is unchecked
    }

    if (errMsg !== "") {
      alert(errMsg);
      return false;
    }
    return true;
  }

  //trigger the function on checkbox change
  $(document).ready(function() {
    $('#sameAsDelivery').on('change', function() {
      fillBillingAddress();
    });
  });

// change limit number of each card
function handleCardType() {
    const visa = document.getElementById("visa");
    const MasterCard = document.getElementById("mastercard");
    const americanExpress = document.getElementById("american-express");
    const cardNumberInput = document.getElementById("cardNumber");

    visa.addEventListener("click", function () {
        cardNumberInput.setAttribute("maxlength", 16);
        cardNumberInput.setAttribute("minlength", 16);
    });

    MasterCard.addEventListener("click", function () {
        cardNumberInput.setAttribute("maxlength", 16);
        cardNumberInput.setAttribute("minlength", 16);
    });

    americanExpress.addEventListener("click", function () {
        cardNumberInput.setAttribute("maxlength", 15);
        cardNumberInput.setAttribute("minlength", 15);
    });

    cardNumberInput.addEventListener("input", function () {
        const cardType = document.querySelector('input[name="card-type"]:checked').value;
        const maxLength = cardType === "american-express" ? 15 : 16;

        if (cardNumberInput.value.length > maxLength) {
            cardNumberInput.value = cardNumberInput.value.slice(0, maxLength); // Truncate input value if it exceeds max length
        }
    });
}

// toggle payment method
function handlePaymentMethod() {
    var onlinePayment = document.getElementById("online");
    var pickupPayment = document.getElementById("whenpickup");
    var cardInformation = document.querySelector(".form-group2");

    onlinePayment.addEventListener("click", function () {
        if (onlinePayment.checked) {
            cardInformation.style.display = "block";
        } else {
            cardInformation.style.display = "none";
        }
    });

    pickupPayment.addEventListener("click", function () {
        if (pickupPayment.checked) {
            cardInformation.style.display = "none";
        } else {
            cardInformation.style.display = "block";
        }
    });
}

// count item in cart
function addCart () {
    const addToCartButtons = document.querySelectorAll('.card-body a.btn-success');
    const quantityElement = document.querySelector('.quantity');

    let quantity = 0;

    function handleAddToCartClick(event) {
        event.preventDefault();
        quantity++;
        quantityElement.textContent = quantity;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });
}
document.addEventListener('DOMContentLoaded', addCart);

// FILTER FOR MENU
function filterByCategory(category) {
    var allCards = document.querySelectorAll('.col-sm-3');

    function showCard(card) {
        card.style.display = 'block';
    }

    function hideCard(card) {
        card.style.display = 'none';
    }

    allCards.forEach(card => {
        var cardCategories = card.classList;

        if (category === 'all' || cardCategories.contains(category)) {
            showCard(card);
        } else {
            hideCard(card);
        }
    });
}

function initFilter() {
    var menuButtons = document.querySelectorAll('.menu-btn');

    function handleButtonClick() {
        var category = this.getAttribute('data-category');

        filterByCategory(category);

        menuButtons.forEach(btn => btn.classList.remove('active-btn'));
        this.classList.add('active-btn');
    }

    menuButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
}

document.addEventListener('DOMContentLoaded', initFilter);

function init () {
    handlePaymentMethod();
    handleCardType();
    $("#regform").submit(validate);
    $("#paymentForm").submit(validatePay);
    
}
document.addEventListener("DOMContentLoaded", init);
$(document).ready(init);