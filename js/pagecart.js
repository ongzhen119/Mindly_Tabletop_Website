if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready);
    }
    else{
    ready();
    }
    
function ready(){
  var addflayout = document.getElementsByClassName("addcart");
  for(i=0; i< addflayout.length; i++){
      addflayout[i].addEventListener('click', addFlayout);
  }
    }


function addFlayout(event){
  
    var addbtn = event.target;
    var text = document.getElementsByClassName("icontainer")[0];
    var shopItem = document.getElementsByClassName("summary")[0];
    
    var price = shopItem.getElementsByClassName("rprice")[0].innerText;

    price = price.replace("RM", "");

    var name = shopItem.getElementsByClassName("name")[0].innerText;
    var image = text.getElementsByClassName("image")[0].src;
    for(var i=0; i < localStorage.length; i++){
    var check = JSON.parse(localStorage.getItem(i));
        if(check.name == name){
            alert("The item is already added in the cart");
            return;
        }
    }
    var number = localStorage.length;
    var quantity = document.getElementById("result").innerText;
    let productInfo = {
        price, name, image, quantity
    };
    localStorage.setItem(number, JSON.stringify(productInfo));
}