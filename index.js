var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    debugger;
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(()=> {
      updateFunction(serve.apply(this,["Happy Eating!", this.customer]))
    }, 2000)
  }
}


var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

  var name;



function makeCake(arg) {
  // debugger;
  // var updateCakeStatus;
  // cake.decorate()
  var update = updateStatus.bind(this)
  debugger;
  mix.call(cake, update)
  // bake.call(cake, updateStatus)
}

function makePie() {
  var updateDessertStatus = updateStatus.bind(this)
  debugger;
  mix.call(pie, updateDessertStatus)
  pie.decorate = cake.decorate.bind(pie)
}

function updateStatus(statusText) {
  debugger;
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateStatus) {
  debugger;
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  updateStatus(status)
  setTimeout(()=> {
    cool.call(this, updateStatus)
  }, 2000)

}

function mix(updateFunction) {
  debugger;
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(()=>{
    bake.call(this, updateFunction)
  }, 2000)
  updateFunction(status)
}


function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout(()=> {
    this.decorate(updateFunction)
  }, 2000)
  updateFunction(status)
}

function makeDessert(event) {
  var cake = document.getElementById('cake')
   var pie = document.getElementById('pie')
   document.querySelector('a#piediv').click(makePie.call(pie))
   document.querySelector('a#cakediv').click(makeCake.call(cake))
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", function(event){makeDessert(event)})
  }
});
