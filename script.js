const games={
crossfire:{name:"CrossFire",items:[["10,000 ZP",210],["20,000 ZP",405],["50,000 ZP",975]]},
pubg:{name:"PUBG Mobile",items:[]},
freefire:{name:"Free Fire",items:[]},
valorant:{name:"Valorant",items:[]},
steam:{name:"Steam Wallet",items:[]},
ml:{name:"Mobile Legends",items:[]},
lol:{name:"League of Legends",items:[]},
coc:{name:"Clash of Clans",items:[]}
};
let cart=JSON.parse(localStorage.getItem("bugCart")||"[]");

function save(){localStorage.setItem("bugCart",JSON.stringify(cart));document.getElementById("count").textContent=cart.length}
function addToCart(name,price){cart.push({name,price:Number(price)});save();openCart()}
function showGame(id){
 const g=games[id];
 document.getElementById("gameTitle").textContent=g.name;
 document.getElementById("gameDesc").textContent="شحن "+g.name+" بأفضل الأسعار";
 const box=document.getElementById("prices");
 if(!g.items.length){box.innerHTML='<div class="empty">أسعار هذه اللعبة سيتم إضافتها قريباً.</div>';return}
 box.innerHTML=g.items.map(x=>`<article class="price"><h3>${x[0]}</h3><em>عرض خاص</em><div class="coins">🪙</div><div class="price-row"><b>${x[1]} جنيه</b><button onclick="addToCart(${JSON.stringify(g.name+" - "+x[0])},${x[1]})">اطلب الآن 🛒</button></div></article>`).join("");
}
function openCart(){document.getElementById("modal").classList.add("show");render()}
function closeCart(){document.getElementById("modal").classList.remove("show")}
function render(){
 let total=0;
 document.getElementById("items").innerHTML=cart.length?cart.map((x,i)=>{total+=x.price;return `<div class="row"><span>${x.name}</span><span>${x.price} جنيه <button onclick="cart.splice(${i},1);save();render()">حذف</button></span></div>`}).join(""):"<p>السلة فارغة.</p>";
 document.getElementById("total").textContent=total;
}
function checkout(){
 if(!cart.length)return;
 let total=0,msg="مرحباً BUG STORE، أريد طلب:\n";
 cart.forEach(x=>{total+=x.price;msg+=`- ${x.name}: ${x.price} جنيه\n`});
 msg+=`\nالإجمالي: ${total} جنيه`;
 window.open("https://wa.me/?text="+encodeURIComponent(msg),"_blank");
}
save();
showGame("crossfire");