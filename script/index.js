
let bagItems;
onLoad();


function onLoad(){
  let bagItemsStr = localStorage.getItem('bagItems') ;
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
}


function addToBag(itemId){
  let button = document.getElementById('myButton');
  button.addEventListener('click', () => {
    button.classList.add('clicked'); // Add the "clicked" class
    setTimeout(() => {
      button.classList.remove('clicked'); // Remove the "clicked" class after 2 seconds
    }, 2000); // Change this value to 3000 for 3 seconds
  });
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon(){
  let bagItemCount = document.querySelector('.bag-item-count');
  if (bagItems.length > 0) {
    bagItemCount.style.visibility = 'visible';
    bagItemCount.textContent = bagItems.length;
  } else {
    bagItemCount.style.visibility = 'hidden';
  }
  
}

function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) {
    return;
  }
  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `
      <div class="item-conatiner">
       <img src="${item.image}" alt="item image" class="item-image" />
        <div class="rating">${item.rating.stars}⭐ | ${item.rating.count}</div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>          <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="previous-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% off)</span>
        </div>
        <button class="add-to-bag" onClick = addToBag(${item.id}) id="myButton">Add to Bag</button>
      </div>`;
  });
  itemsContainerElement.innerHTML = innerHTML;
}
