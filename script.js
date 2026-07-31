const products=[
{id:1,name:"Bug Card",game:"CrossFire West",price:650,desc:"Bug Limit & Card",icon:"🃏",className:"bug"},
{id:2,name:"كود شحن 50,000 ZP",game:"CrossFire",price:975,desc:"كود شحن 50 ألف ZP",icon:"🟡",className:"zp50"},
{id:3,name:"كود شحن 20,000 ZP",game:"CrossFire",price:405,desc:"كود شحن 20 ألف ZP",icon:"🔵",className:"zp20"},
{id:4,name:"كود شحن 10,000 ZP",game:"CrossFire",price:210,desc:"كود شحن 10 آلاف ZP",icon:"🟢",className:"zp10"}];
let cart=JSON.parse(localStorage.getItem("bugCart")||"[]");
function renderProducts(){
 document.getElementById("productsGrid").innerHTML=products.map(p=>`
 <article class="card">
  <div class="pic ${p.className}">${p.className==="bug"?"🃏":`<span class="zp">${p.icon} ${p.name.split(" ")[3]||""} ZP</span>`}</div>
  <div class="card-body"><span class="tag">${p.game}</span><h3>${p.name}</h3><div class="desc">${p.desc}</div><div class="price">${p.price} جنيه</div><button class="order" onclick="add(${p.id})">🛒 اطلب الآن</button></div>
 </article>`).join("");
}
function save(){localStorage.setItem("bugCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length}
function add(id){cart.push(id);save();openCart()}
function openCart(){renderCart();document.getElementById("cartModal").classList.remove("hidden")}
function closeCart(){document.getElementById("cartModal").classList.add("hidden")}
function removeItem(i){cart.splice(i,1);save();renderCart()}
function renderCart(){
 let box=document.getElementById("cartItems"),total=0;
 if(!cart.length){box.innerHTML="<p>السلة فارغة.</p>";document.getElementById("cartTotal").textContent=0;return}
 box.innerHTML=cart.map((id,i)=>{let p=products.find(x=>x.id===id);total+=p.price;return `<div class="cart-row"><span>${p.name}</span><span>${p.price} ج.م <button class="remove" onclick="removeItem(${i})">حذف</button></span></div>`}).join("");
 document.getElementById("cartTotal").textContent=total;
}
function checkout(){
 if(!cart.length)return alert("السلة فارغة.");
 let total=0,items=cart.map(id=>{let p=products.find(x=>x.id===id);total+=p.price;return `- ${p.name}: ${p.price} جنيه`}).join("\n");
 let msg=encodeURIComponent(`مرحباً Bug Store، أريد طلب:\n${items}\n\nالإجمالي: ${total} جنيه`);
 window.open("https://wa.me/201101403738?text="+msg,"_blank");
}
renderProducts();save();