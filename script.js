const games={"crossfire": {"name": "CrossFire West", "items": [["10,000 ZP", 210], ["20,000 ZP", 405], ["50,000 ZP", 975]]}, "pubg": {"name": "PUBG Mobile", "items": [["60 UC", 58], ["300 + 25 UC", 248], ["600 + 60 UC", 485], ["1500 + 300 UC", 1198], ["3000 + 850 UC", 2385], ["6000 + 2100 UC", 4760], ["12000 + 4200 UC", 9510]]}, "freefire": {"name": "Free Fire", "items": [["100 Diamonds", 60], ["210 Diamonds", 110], ["530 Diamonds", 260], ["1080 Diamonds", 510], ["2200 Diamonds", 1010]]}, "ml": {"name": "Mobile Legends", "items": [["10 + 1 Diamonds", 21], ["14 Diamonds", 27], ["42 Diamonds", 53], ["78 + 8 Diamonds", 77], ["156 + 16 Diamonds", 143], ["303 + 33 Diamonds", 264], ["504 + 66 Diamonds", 432]]}, "steam": {"name": "Steam", "items": [["بطاقة Steam", 319]]}, "playstation": {"name": "PlayStation", "items": [["بطاقة PlayStation", 64]]}, "xbox": {"name": "Xbox", "items": [["بطاقة Xbox", 256]]}, "google": {"name": "Google Play", "items": [["بطاقة Google Play", 278]]}, "apple": {"name": "Apple", "items": [["بطاقة Apple", 111]]}, "roblox": {"name": "Roblox", "items": [["بطاقة Roblox", 499]]}, "valorant": {"name": "Valorant", "items": [["شحن Valorant", 258]]}, "razer": {"name": "Razer Gold", "items": [["بطاقة Razer Gold", 61]]}, "nintendo": {"name": "Nintendo", "items": [["بطاقة Nintendo", 254]]}};
let cart=JSON.parse(localStorage.getItem('bugStoreCart')||'[]');

function saveCart(){
  localStorage.setItem('bugStoreCart',JSON.stringify(cart));
  document.getElementById('cartCount').textContent=cart.length;
}

function addToCart(name,price){
  cart.push({name:name,price:Number(price)});
  saveCart();
  openCart();
}

function showGame(id){
  const game=games[id];
  const box=document.getElementById('gamePrices');
  let rows=game.items.map(function(item){
    const safeName=(game.name+' - '+item[0]).replace(/'/g,"\\'");
    return '<div class="product"><div><small>'+game.name+'</small><h3>'+item[0]+'</h3></div><strong>'+item[1]+' جنيه</strong><button type="button" onclick="addToCart(\\''+safeName+'\\','+item[1]+')">🛒 اطلب الآن</button></div>';
  }).join('');
  box.innerHTML='<div class="prices-head"><h2>'+game.name+'</h2><button type="button" onclick="closePrices()">إغلاق</button></div><div class="products">'+rows+'</div>';
  box.classList.add('show');
  box.scrollIntoView({behavior:'smooth',block:'start'});
}

function closePrices(){
  document.getElementById('gamePrices').classList.remove('show');
}

function openCart(){
  document.getElementById('cartModal').classList.add('show');
  renderCart();
}

function closeCart(){
  document.getElementById('cartModal').classList.remove('show');
}

function renderCart(){
  let total=0;
  const box=document.getElementById('cartItems');
  if(!cart.length){
    box.innerHTML='<p>السلة فارغة.</p>';
  }else{
    box.innerHTML=cart.map(function(item,index){
      total+=item.price;
      return '<div class="row"><span>'+item.name+'</span><span>'+item.price+' جنيه <button type="button" onclick="removeItem('+index+')">حذف</button></span></div>';
    }).join('');
  }
  document.getElementById('cartTotal').textContent=total;
}

function removeItem(index){
  cart.splice(index,1);
  saveCart();
  renderCart();
}

function checkout(){
  if(!cart.length){alert('السلة فارغة');return;}
  let total=0;
  let message='مرحباً Bug Store، أريد طلب:\\n';
  cart.forEach(function(item){
    total+=item.price;
    message+='- '+item.name+': '+item.price+' جنيه\\n';
  });
  message+='\\nالإجمالي: '+total+' جنيه';
  window.open('https://wa.me/201101403738?text='+encodeURIComponent(message),'_blank');
}

saveCart();
