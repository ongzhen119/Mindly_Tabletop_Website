if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready);
    }
    else{
    ready();
    }
    
function ready(){
  var addflayout = document.getElementsByClassName("cart");
  for(i=0; i< addflayout.length; i++){
      addflayout[i].addEventListener('click', addFlayout);
  }
    }


function addFlayout(event){
    var addbtn = event.target;
    var shopItem = addbtn.parentElement.parentElement.parentElement;
    var price = shopItem.getElementsByClassName("price")[0].innerHTML;
    var name = shopItem.getElementsByClassName("name")[0].innerHTML;
    var image = shopItem.getElementsByClassName("image")[0].src;
    
    for(var i=0; i < localStorage.length; i++){
    var check = JSON.parse(localStorage.getItem(i));
        if(check.name == name){
            alert("The item is already added in the cart");
            return;
        }
    }
    var number = localStorage.length;
    var quantity = 1;
    let productInfo = {
        price, name, image, quantity
    };
    localStorage.setItem(number, JSON.stringify(productInfo));
}