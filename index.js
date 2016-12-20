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

//the make pie function binds its scope to the updateStatus function. We do not want to
//evoke the update status function now. We just merely want to make sure the scope of this
//in the update function is now the pie node element that way it is easy for us to
//create an abtract updateStatus function when it comes to appending satus to the appropiate div. We call upon mix while passing in the pie constant and also pass in updateStatus with the newly created this. Rememeber the first argument in call and apply we set the this scope for the function being called with the call or apply method. Call and apply methods are just methods for function objects. We can pass other objects as the this for the called function and the scope would be the object passed in to the first arg of the call method. We also want to borrow the cake objects decorate method from the cake object. we set pie.decorate which is now a method for pie to the cake.decorate method but wait, the this for cake.decorate will still be the cake object and so we bind the pie object as the this scope only if pie is evoked.


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

// here in the mix function the this scope is the pie object scope. We create a status with the pie ingredients and then we set up the set Timeout method for objects. We evoke the bake function while setting its this scope to the pie and also giving it an argu of the the updateFunction which we had already set to the pie scope as its this. We first execute the updateFunction with the status and then after 2 seconds the bake function is evoked. 


function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout(()=> {
    this.decorate(updateFunction)
  }, 2000)
  updateFunction(status)
}

function makeDessert() {
  debugger;
  if(this.parentNode.id === "cake") {
    makeCake.call(this.parentNode)
  } else {
    makePie.call(this.parentNode)
  }
}

//when we check to see if the parentNode id is equal to each dessert type, we
//call the makeCake/makePie function which assigning the this scope of the function as the parentNode element. Rememeber we use call and not bind here because we want to evoke this function now not but create a new function.


function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});

// coolinks is a varaible set to all the elements in the dom with the classname of js-make
// we iterate over those elements and add an addeventlistener DOM method. With any click event we trigger the makeDessert function. Rememeber this is not a JQuery method it does not need the event annonymous function. The this scope for the make dessert function is the window. The window can provide that triggered this function meaning if you check the parentsNode which triggered the window event, you can tell which node triggered the clickevent.
