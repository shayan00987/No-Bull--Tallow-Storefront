const STORE = "https://nobulltallow.com";
const products = [
 {id:"cloud",name:"Cloud Cream",subtitle:"Lightweight Tallow Face Moisturizer",price:45,category:"moisturize",label:"Face care",image:"https://nobulltallow.com/cdn/shop/files/Cloud-cream-trio.jpg?v=1777483349&width=1000",url:STORE+"/products/cloud-cream-tallow-face-moisturizer",desc:"A lightweight daily face moisturizer made with tallow and carefully selected oils."},
 {id:"butter2",name:"2oz Whipped Tallow Body Butter",subtitle:"60 ml · Everyday moisture",price:35,category:"moisturize",label:"Best seller",image:"https://nobulltallow.com/cdn/shop/files/Original-Natura-Tallow-Body-Butter.jpg?v=1779902178&width=1000",url:STORE+"/products/whipped-tallow-body-butter-2oz-60ml",desc:"A rich whipped moisturizer available in Original, Ironhide, Lavender and Pure blends."},
 {id:"sun",name:"Tallow Sun Balm",subtitle:"Outdoor skincare balm",price:35,category:"targeted",label:"Outdoor care",image:"https://nobulltallow.com/cdn/shop/files/sun-balm-trio.jpg?v=1780803501&width=1000",url:STORE+"/products/tallow-sun-balm",desc:"A tallow-based outdoor balm with non-nano zinc oxide. Check the official listing for its current disclaimer and directions."},
 {id:"relief",name:"Raw Hide Relief",subtitle:"Tallow Barrier Cream",price:35,category:"targeted",label:"Targeted care",image:"https://nobulltallow.com/cdn/shop/files/Raw-Hide-Relief-Tallow-Balm.jpg?v=1779904835&width=1000",url:STORE+"/products/raw-hide-relief",desc:"A richer barrier cream for areas needing extra care. Review the ingredients and instructions on the official listing."},
 {id:"set",name:"Complete Tallow Skincare Set",subtitle:"A curated everyday collection",price:64,oldPrice:84,category:"sets",label:"Bundle · Save 24%",image:"https://nobulltallow.com/cdn/shop/files/Valentines-complete-tallow-body-bundle.jpg?v=1771556243&width=1000",url:STORE+"/products/complete-tallow-skincare-set",desc:"A multi-product set; exact included items and variants can change, so verify the official listing."},
 {id:"butter4",name:"4oz Whipped Tallow Body Butter",subtitle:"120 ml · Everyday moisture",price:55,category:"moisturize",label:"Larger size",image:"https://nobulltallow.com/cdn/shop/files/Original-Natura-Tallow-Body-Butter.jpg?v=1779902178&width=1000",url:STORE+"/products/whipped-tallow-body-butter-4oz-120ml",desc:"A larger jar of whipped body butter with several blend options on the original store."}
];
let cart = [];
const money = n => new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}).format(n);
const grid = document.getElementById("productGrid");
function renderProducts(){
 const query = document.getElementById("productSearch").value.trim().toLowerCase();
 const category = document.getElementById("categoryFilter").value;
 const shown = products.filter(p => (category==="all" || p.category===category) && (p.name+" "+p.subtitle+" "+p.label).toLowerCase().includes(query));
 grid.innerHTML = shown.length ? shown.map(p=>`
 <article class="product-card">
  <a class="product-image" href="${p.url}" target="_blank" rel="noopener" aria-label="View ${p.name} on official store">
   <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/product-placeholder.svg'">
   <span class="product-tag">${p.label}</span>
  </a>
  <div class="product-info"><div class="product-category">${p.category==="moisturize"?"Moisturize":p.category==="targeted"?"Targeted care":"Sets & bundles"}</div>
   <div class="product-title-row"><h3>${p.name}</h3><div class="price">${p.oldPrice?`<del>${money(p.oldPrice)}</del> `:""}${money(p.price)}</div></div>
   <div class="product-bottom"><a href="${p.url}" target="_blank" rel="noopener">View on official store ↗</a><button class="add-button" data-add="${p.id}">Add to bag +</button></div>
  </div>
 </article>`).join("") : `<p>No products match that search. Try another term.</p>`;
 grid.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(btn.dataset.add)));
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});renderCart();showToast("Added to your bag");}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<1)cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), subtotal=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;document.getElementById("cartSubtotal").textContent=money(subtotal);
 const wrap=document.getElementById("cartItems");
 if(!cart.length){wrap.innerHTML='<div class="empty-cart">Your bag is waiting for something good.<br>Explore the collection and add an essential.</div>';return;}
 wrap.innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-line"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><small>${money(p.price)} CAD each</small><div class="line-actions"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button><button class="remove" data-remove="${p.id}">Remove</button></div></div><strong>${money(p.price*x.qty)}</strong></div>`}).join("");
 wrap.querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.qty,Number(b.dataset.delta))));
 wrap.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart=cart.filter(x=>x.id!==b.dataset.remove);renderCart()}));
}
function openCart(){document.body.classList.add("cart-open");document.getElementById("cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){document.body.classList.remove("cart-open");document.getElementById("cartDrawer").setAttribute("aria-hidden","true")}
let toastTimer;function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2100)}
document.getElementById("productSearch").addEventListener("input",renderProducts);
document.getElementById("categoryFilter").addEventListener("change",renderProducts);
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("cartBackdrop").addEventListener("click",closeCart);
document.getElementById("keepShopping").addEventListener("click",closeCart);
document.getElementById("secureCheckout").addEventListener("click",()=>{
 if(!cart.length){showToast("Add a product before continuing");return;}
 // This storefront has no merchant authorization or payment backend. Never fake a payment.
 const first=products.find(p=>p.id===cart[0].id);
 window.open(first.url,"_blank","noopener");
 showToast("Opening the official store. Rebuild your bag there to pay securely.");
});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
