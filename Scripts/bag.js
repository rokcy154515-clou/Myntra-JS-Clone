let CONVENIENCE_FEES=Math.floor((Math.random()*52)+49);
let bagItemObjects;
onload();
function onload(){
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}
function displayBagSummary(){
    let bagSummaryElement=document.querySelector(".bag-summary");
    let totalItem=bagItemObjects.length;
    let totalMRP=0;
    let totalDiscount=0;
    for(let i=0;i<bagItemObjects.length;i++){
        totalMRP+=bagItemObjects[i].original_price;
        totalDiscount+=bagItemObjects[i].original_price-bagItemObjects[i].current_price;
    }
    let finalPayment=totalMRP-totalDiscount+CONVENIENCE_FEES;
    bagSummaryElement.innerHTML=`                <div class="bag-details-container">
                    <div class="price-header">PRICE DETAILS(${totalItem} Items)</div>
                    <div class="price-item"> 
                        <span class="price-item-tag">Total MRP</span>
                        <span class="price-item-value">₹${totalMRP}</span>
                    </div>
                    <div class="price-item"> 
                        <span class="price-item-tag">Discount on MRP</span>
                        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
                    </div>
                    <div class="price-item"> 
                        <span class="price-item-tag">Convenience Fee</span>
                        <span class="price-item-value">₹${CONVENIENCE_FEES}</span>
                    </div>
                    <hr>
                    <div class="price-footer">
                        <span class="price-item-tag">Total Amount</span>
                        <span class="price-item-value">₹${finalPayment}</span>
                    </div>
                </div>
                <button class="btn-place-order">Place Order</button>`
}
function loadBagItemObjects(){
    let bagItemsStr = localStorage.getItem("bagItems");
    let bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    bagItemObjects = bagItems.map((itemId) => {
        for(let i=0;i<items.length;i++){
            if(items[i].id==itemId){
                return items[i];
            }
        }
    });
}
function displayBagItems(){
    let conateinerElement=document.querySelector(".bag-items-container");
    let innerHTML="";
    for(let i=0;i<bagItemObjects.length;i++){
        innerHTML+=generateItemHTML(bagItemObjects[i]); 
    }
    conateinerElement.innerHTML=innerHTML;
}
function removeFromBag(itemId){
    bagItems=bagItems.filter(bagItemId=>bagItemId!=itemId);
    localStorage.setItem("bagItems",JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}
function generateItemHTML(item){
    return `                <div class="bag-item-container">
                    <div class="item-left-part">
                        <img src="../${item.image}" class="bag-item-img">
                    </div>
                    <div class="item-right-part">
                        <div class="company">${item.company}</div>
                        <div class="item-name">${item.item_name}</div>
                        <div class="price-container">
                            <span class="current-price">₹${item.current_price}</span>
                            <span class="original-price">₹${item.original_price}</span>
                            <span class="discount-price">(${item.discount_percentage}% OFF)</span>
                        </div>
                        <div class="return-period">
                            <span class="return-period-days">${item.return_period} days</span> return available
                        </div>
                        <div class="delivery-details">
                            Delivery by
                            <span class="delivery-details-days">${item.delivery_date}</span>
                        </div>
                    </div>
                    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
                </div>`;
}