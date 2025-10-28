let bagItems;
onLoad();
function onLoad() {
    let bagItemsStr=localStorage.getItem("bagItems");
    bagItems=bagItemsStr ? JSON.parse(bagItemsStr) : [];
// bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : []
// Ternary operator: Checks if bagItemsStr exists
// If exists: JSON.parse(bagItemsStr) converts string back to array [101, 205, 309]
// If doesn't exist: Creates empty array [] (first time user)
    displayitemOnHomePage();
    displayBagIcon();
}
function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    // JSON.stringify() 
    // converts the array to a string (localStorage only stores strings)
    displayBagIcon();
}
function displayBagIcon() {
    let bagItemsCountElement=document.querySelector(".bag-item-count");
    if(bagItems.length>0) {
        bagItemsCountElement.style.visibility="visible";
        bagItemsCountElement.innerHTML=bagItems.length;
    }
    else{
        bagItemsCountElement.style.visibility="hidden";
    }
}
function displayitemOnHomePage() {
    let itemsContainerElement=document.querySelector(".items-container");
    if(!itemsContainerElement) return;
    let innerHTML="";
    for(let i=0;i<items.length;i++){
        let item=items[i];
        innerHTML+=`<div class="item-container">
                <img src="${item.image}" alt="item image" class="item-image">
                <div class="rating">
                    ${item.rating.stars} 🌟| ${item.rating.count}
                </div>
                <div class="company-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <sapn class="current-price">Rs ${item.current_price}</sapn>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
            </div>`
    }
    itemsContainerElement.innerHTML=innerHTML;
}
