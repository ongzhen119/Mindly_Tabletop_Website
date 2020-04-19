    if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready);
    }
    else{
    ready();
    }
    
       

    function ready(){
    addItem();
    updateTotal();
    var remove = document.getElementsByClassName("remove");
    for(var i=0; i< remove.length;i++){
        var button = remove[i];
        button.addEventListener('click', removeProduct);
    }

    var quantity = document.getElementsByClassName("quantity-field");
    for(i=0; i< quantity.length; i++){
        var number = quantity[i];
        number.addEventListener('change', priceChange);
    }


    var option = document.getElementsByClassName("summary-delivery-selection");
    for(i=0; i< option.length; i++){
        var select = option[i];
        select.addEventListener('change', optionChange);
    }
 
    var addflayout = document.getElementsByClassName("cart");
    for(i=0; i< addflayout.length; i++){
        addflayout[i].addEventListener('click', addFlayout);
    }


 
    }

    function removeProduct(event){
        var buttonClicked = event.target;
        var item = buttonClicked.parentElement.parentElement;
        var name = item.getElementsByClassName("item-quantity")[0].innerHTML;
        item.remove();
        updateTotal();
        for(var i = 0; i < 50; i++){
            if (localStorage.getItem(i) == null){
                continue;
            }
            var list = JSON.parse(localStorage.getItem(i));
            if(name == list.name){
                localStorage.removeItem(i);
                return;
            }
        }
       
        
    }

    function priceChange(event){
        var numberChanged = event.target;

        if(numberChanged.value == ""){
            numberChanged.value = 1;
        }
        updateTotal();
        var item = numberChanged.parentElement.parentElement;
        var name = item.getElementsByClassName("item-quantity")[0].innerHTML;
        for(var i = 0; i < 50; i++){
            if (localStorage.getItem(i) == null){
                continue;
            }
            var list = JSON.parse(localStorage.getItem(i));
            
            if(name == list.name){
                var price = list.price;
                var quantity = numberChanged.value;
                var image = list.image;
                let productInfo = {
                    price, name, image, quantity
                };
                localStorage.setItem(i, JSON.stringify(productInfo));
            }
        }
        

    }

    function optionChange(event){
        updateTotal();

    }


    function addFlayout(event){
        var addbtn = event.target;
        var shopItem = addbtn.parentElement.parentElement.parentElement;
        var price = shopItem.getElementsByClassName("price")[0].innerHTML;
        var name = shopItem.getElementsByClassName("name")[0].innerHTML;
        var image = shopItem.getElementsByClassName("image")[0].src;
        updateTotal();
    }

    function addItem(){
        var basket = document.getElementsByClassName("basket")[0];
        for(var i = 0; i < 50; i++){
        if (localStorage.getItem(i) == null){
            continue;
        }
        var list = JSON.parse(localStorage.getItem(i));
        var image = list.image;
        var name = list.name;
        var price = list.price;
        var quantity = list.quantity;
        var newContent = `<div class="basket-product"> <div class="item"> <div class="product-image"> <img src="${image}" alt="Placholder Image 2" class="product-frame"> </div> <div class="product-details"> <h1><strong><span class="item-quantity">${name}</span></strong></h1> <p><strong>⭐⭐⭐⭐⭐</strong></p> </div> </div> <div class="price">${price}</div> <div class="quantity"> <input type="number" value="${quantity}" min="1" class="quantity-field"> </div> <div class="subtotal">31.10</div> <div class="remove"> <button>Remove</button> </div> `;
        basket.innerHTML += newContent;
    }
        var remove = document.getElementsByClassName("remove");
        for(var i=0; i< remove.length;i++){
        var button = remove[i];
        button.addEventListener('click', removeProduct);
        }

        var quantity = document.getElementsByClassName("quantity-field");
        for(i=0; i< quantity.length; i++){
            var number = quantity[i];
            number.addEventListener('change', priceChange);
        }
}

    function updateTotal(){
        var basket = document.getElementsByClassName("basket")[0];
        var products = basket.getElementsByClassName("basket-product");
        var post = document.getElementsByClassName("post-total")[0];
        var total = 0;
        var postCharge = 0;
        for(var i=0; i< products.length; i++){
        var product = products[i];
        var price = parseFloat(product.getElementsByClassName("price")[0].innerHTML);
        var quantity = product.getElementsByClassName("quantity-field")[0].value;
        product.getElementsByClassName("subtotal")[0].innerHTML = (price * quantity).toFixed(2);
        total += price * quantity;
        postCharge += quantity * 2;
        }
        document.getElementsByClassName("final-value")[0].innerHTML = total.toFixed(2);
        console.log(document.getElementsByClassName("summary-delivery-selection")[0].value);
        if(document.getElementsByClassName("summary-delivery-selection")[0].value == 0){
            post.style.display = "block";
        if(total > 300){
            document.getElementsByClassName("post-value")[0].innerHTML = "Free of Charges (Over RM 300)";
            postCharge = 0;
        }
        else {
            document.getElementsByClassName("post-value")[0].innerHTML = "RM" + postCharge;
        }
        }
        else {
            post.style.display = "none";
            postCharge = 0;
        }
        document.getElementsByClassName("final-value")[1].innerHTML = (total + postCharge).toFixed(2); 
    }
