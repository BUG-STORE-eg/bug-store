const tools=[
{id:1,n:"Bug",g:"CrossFire West",p:650,d:"Bug Limit & Card",i:"🃏"},
{id:2,n:"Boot Farm",g:"CrossFire West",p:500,d:"XP Farm",i:"🤖"}];
const codes=[
{id:101,n:"CrossFire 10,000 ZP",g:"CrossFire West",p:210,d:"كود شحن 10,000 ZP",i:"🟢"},
{id:102,n:"CrossFire 20,000 ZP",g:"CrossFire West",p:405,d:"كود شحن 20,000 ZP",i:"🔵"},
{id:103,n:"CrossFire 50,000 ZP",g:"CrossFire West",p:975,d:"كود شحن 50,000 ZP",i:"🟡"},
{id:104,n:"PUBG Mobile 60 UC",g:"PUBG Mobile",p:0,d:"السعر يضاف عند تحديد سعر البيع",i:"🎯"},
{id:105,n:"PUBG Mobile 300 + 25 UC",g:"PUBG Mobile",p:0,d:"السعر يضاف عند تحديد سعر البيع",i:"🎯"},
{id:106,n:"PUBG Mobile 600 + 60 UC",g:"PUBG Mobile",p:0,d:"السعر يضاف عند تحديد سعر البيع",i:"🎯"},
{id:107,n:"PUBG Mobile 1500 + 300 UC",g:"PUBG Mobile",p:0,d:"السعر يضاف عند تحديد سعر البيع",i:"🎯"},
{id:108,n:"PUBG Mobile 3000 + 850 UC",g:"PUBG Mobile",p:0,d:"السعر يضاف عند تحديد سعر البيع",i:"🎯"},
{id:109,n:"PUBG Mobile 6000 + 2100 UC",g:"PUBG Mobile",p:0,d:"السعر يضاف عند تحديد سعر البيع",i:"🎯"},
{id:110,n:"PUBG Mobile 12000 + 4200 UC",g:"PUBG Mobile",p:0,d:"السعر يضاف عند تحديد سعر البيع",i:"🎯"},
{id:111,n:"Free Fire",g:"Free Fire",p:0,d:"باقات الشحن",i:"🔥"},
{id:112,n:"Mobile Legends",g:"Mobile Legends",p:0,d:"باقات Diamonds",i:"💎"},
{id:113,n:"Steam Egypt",g:"Steam",p:0,d:"بطاقات شحن",i:"🎮"},
{id:114,n:"PlayStation USA",g:"PlayStation",p:0,d:"بطاقات شحن",i:"🎮"},
{id:115,n:"Xbox USA",g:"Xbox",p:0,d:"بطاقات شحن",i:"🎮"},
{id:116,n:"Google Play",g:"Google Play",p:0,d:"بطاقات شحن",i:"▶️"},
{id:117,n:"Apple US",g:"Apple",p:0,d:"بطاقات شحن",i:"🍎"},
{id:118,n:"Roblox",g:"Roblox",p:0,d:"بطاقات شحن",i:"🧱"},
{id:119,n:"Valorant Egypt/MENA",g:"Valorant",p:0,d:"شحن",i:"🎯"},
{id:120,n:"Razer Gold",g:"Razer Gold",p:0,d:"بطاقات شحن",i:"🟩"},
{id:121,n:"Nintendo eShop USA",g:"Nintendo",p:0,d:"بطاقات شحن",i:"🎮"}];
const products=[...tools,...codes];let cart=JSON.parse(localStorage.getItem("bugCart")||"[]");
function card(p){return `<article class="card"><div class="pic">${p.i}</div><div class="body"><span class="tag">${p.g}</span><h3>${p.n}</h3><div class="desc">${p.d}</div><div class="price">${p.p?p.p+" جنيه":"السعر يضاف قريباً"}</div>${p.p?`<button class="order" onclick="add(${p.id})">🛒 اطلب الآن</button>`:`<button class="order" onclick="ask('${p.n}')">💬 اطلب السعر</button>`}</div></article>`}
function render(){document.getElementById("tools").innerHTML=tools.map(card).join("");document.getElementById("codes").innerHTML=codes.map(card).join("")}
function save(){localStorage.setItem("bugCart",JSON.stringify(cart));document.getElementById("count").textContent=cart.length}
function add(id){cart.push(id);save();openCart()}
function ask(n){open("https://wa.me/201101403738?text="+encodeURIComponent("مرحباً Bug Store، أريد معرفة سعر: "+n),"_blank")}
function openCart(){document.getElementById("modal").classList.add("show");renderCart()}
function closeCart(){document.getElementById("modal").classList.remove("show")}
function renderCart(){let total=0;document.getElementById("items").innerHTML=cart.length?cart.map((id,i)=>{let p=products.find(x=>x.id===id);total+=p.p;return `<div class="row"><span>${p.n}</span><span>${p.p} جنيه <button class="remove" onclick="cart.splice(${i},1);save();renderCart()">حذف</button></span></div>`}).join(""):"<p>السلة فارغة.</p>";document.getElementById("total").textContent=total}
function checkout(){if(!cart.length)return;let total=0,msg="مرحباً Bug Store، أريد طلب:\n";cart.forEach(id=>{let p=products.find(x=>x.id===id);total+=p.p;msg+=`- ${p.n}: ${p.p} جنيه\n`});msg+=`\nالإجمالي: ${total} جنيه`;open("https://wa.me/201101403738?text="+encodeURIComponent(msg),"_blank")}
render();save();