function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText;
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

var cake = {
  div: document.getElementById('cake'),
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!";
    updateFunction(status);
    var that = this;
    setTimeout(function() {
      updateFunction(serve.apply(that, ["Happy Eating!", that.customer]))
    }, 2000)
  }
}

var pie = {
  div: document.getElementById('pie'),
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(this);
  mix.call(cake, updateCakeStatus);
}

function makePie() {
  var updatePieStatus = updateStatus.bind(this);
  pie.decorate = cake.decorate.bind(pie);
  mix.call(pie, updatePieStatus);
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  var item = this;
  setTimeout(function() {
    item.decorate(updateFunction)
  }, 2000)
  updateFunction.call(item.div, status);
}

function bake(updateFunction) {
  var item = this
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(function() {
    cool.call(item, updateFunction)
  }, 2000)
  updateFunction.call(item.div, status);
}

function mix(updateFunction) {
  var item = this;
  var status = "Mixing " + this.ingredients.join(", ");
  setTimeout(function() {
    bake.call(item, updateFunction)
  }, 2000);
  updateFunction.call(item.div, status);
  // updateFunction(status);
}


function makeDessert() {
  let whatToBake = this;

  if (whatToBake.innerHTML === "Make Cake"){
    makeCake.call(this.parentElement);
  } else if (whatToBake.innerHTML === "Make Pie") {
    makePie.call(this.parentElement);
  } else {
    alert("Don't have a recipe for that yet!!");
  }
}


document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
