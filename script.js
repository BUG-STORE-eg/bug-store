const games={
crossfire:{name:"CrossFire",code:"XF",desc:"شحن CrossFire بأفضل الأسعار",items:[["10,000 ZP",210],["20,000 ZP",405],["50,000 ZP",975]]},
pubg:{name:"PUBG Mobile",code:"PUBG",desc:"شحن PUBG Mobile",items:[["60 UC",68],["325 UC",304],["660 UC",598],["1800 UC",1482],["3850 UC",2954],["8100 UC",5899]]},
freefire:{name:"Free Fire",code:"FF",desc:"شحن Free Fire",items:[["110 Diamonds",65],["220 Diamonds",120],["341 Diamonds",150],["583 Diamonds",285],["1188 Diamonds",610],["2420 Diamonds",1110]]},
valorant:{name:"Valorant",code:"VP",desc:"شحن Valorant Points",items:[["475 VP",290],["1000 VP",560],["2050 VP",1070],["3650 VP",1710],["5350 VP",2410],["11000 VP",4860]]},
steam:{name:"Steam Wallet",code:"STEAM",desc:"Steam Wallet",items:[["100 EGP",110],["250 EGP",260],["500 EGP",510],["1000 EGP",1010],["2000 EGP",2010]]},
ml:{name:"Mobile Legends",code:"ML",desc:"شحن Mobile Legends",items:[["155 Diamonds",149],["311 Diamonds",287],["949 Diamonds",840],["1617 Diamonds",1394],["3331 Diamonds",2777],["4997 Diamonds",4161]]},
lol:{name:"League of Legends",code:"LOL",desc:"شحن League of Legends",items:[["575 RP",290],["1380 RP",690],["2800 RP",1390],["4500 RP",2190],["6500 RP",3090]]},
coc:{name:"Clash of Clans",code:"COC",desc:"شحن Clash of Clans",items:[["80 Gems",60],["500 Gems",160],["1200 Gems",360],["2500 Gems",700],["6500 Gems",1700],["14000 Gems",3500]]}
};

let cart=JSON.parse(localStorage.getItem("bugCart")||"[]");
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

function save(){localStorage.setItem("bugCart",JSON.stringify(cart));$("#count").textContent=cart.length}

function go(page){
 $$(".page").forEach(x=>x.classList.remove("active"));
 const target=$("#page-"+page);
 if(target)target.classList.add("active");
 $$("nav a[data-page]").forEach(a=>a.classList.toggle("active",a.dataset.page===page));
 if(page==="recharge")renderGame("crossfire");
 window.scrollTo(0,0);
 history.replaceState(null,"","#"+page);
}

$$("nav a[data-page]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.dataset.page)}));
$(".brand").addEventListener("click",e=>{e.preventDefault();go("home")});

function renderGame(id){
 const g=games[id];
 $("#gameTitle").textContent=g.name;
 $("#gameCode").textContent=g.code;
 $("#gameDesc").textContent=g.desc;
 $$(".game").forEach(b=>b.classList.toggle("active",b.dataset.game===id));
 $("#prices").innerHTML=g.items.map((x,i)=>`
 <article class="price"><h3>${x[0]}</h3><em>شحن سريع</em><div class="coins">🪙</div>
 <div class="price-row"><b>${x[1]} جنيه</b><button class="add" data-game="${id}" data-index="${i}">اطلب الآن 🛒</button></div></article>`).join("");
 $$(".add").forEach(b=>b.addEventListener("click",()=>{
   const g=games[b.dataset.game],x=g.items[Number(b.dataset.index)];
   add(g.name+" - "+x[0],x[1]);
 }));
}

$$(".game").forEach(b=>b.addEventListener("click",()=>renderGame(b.dataset.game)));
$$(".buy").forEach(b=>b.addEventListener("click",()=>add(b.dataset.name,Number(b.dataset.price))));

function add(name,price){cart.push({name,price});save();openCart()}
function openCart(){$("#modal").classList.add("show");renderCart()}
function closeCart(){$("#modal").classList.remove("show")}
function renderCart(){
 let total=0;
 $("#items").innerHTML=cart.length?cart.map((x,i)=>{total+=x.price;return `<div class="row"><span>${x.name}</span><span>${x.price} جنيه <button data-remove="${i}">حذف</button></span></div>`}).join(""):"<p>السلة فارغة.</p>";
 $("#total").textContent=total;
 $$("[data-remove]").forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.remove),1);save();renderCart()});
}
function checkout(){
 if(!cart.length)return;
 let total=0,msg="مرحباً BUG STORE، أريد طلب:\n";
 cart.forEach(x=>{total+=x.price;msg+=`- ${x.name}: ${x.price} جنيه\n`});
 msg+=`\nالإجمالي: ${total} جنيه`;
 window.open("https://wa.me/?text="+encodeURIComponent(msg),"_blank");
}
$("#cartBtn").onclick=openCart;$("#close").onclick=closeCart;$("#checkout").onclick=checkout;
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeCart()});
save();
go(location.hash.slice(1)||"home");