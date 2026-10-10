const STORE = "https://nobulltallow.com";
// Prices and links are illustrative references; verify current variants/prices on the official store.
const products = [
 {id:"butter2",name:"2oz Whipped Tallow Body Butter",subtitle:"60 ml · Everyday moisture",price:35,category:"moisturize",label:"Everyday essential",image:"assets/ai-products/set1-body-butter-front.jpg",url:STORE+"/",desc:"Whipped tallow body butter concept image. Check the official store for current blends and ingredients."},
 {id:"lip",name:"Tallow Lip Balm",subtitle:"6 g · Everyday lip care",price:6,category:"targeted",label:"Lip care",image:"assets/ai-products/set1-lip-balm-set.jpg",url:STORE+"/",desc:"Lip balm concept image. Check the official store for ingredients and current availability."},
 {id:"soapset",name:"Tallow Soap Set",subtitle:"A simple cleansing ritual",price:26,category:"sets",label:"Set",image:"assets/ai-products/set1-soap-set-flatlay.jpg",url:STORE+"/",desc:"Soap set concept image. Confirm included bars and ingredients on the official store."},
 {id:"relief",name:"Raw Hide Relief",subtitle:"Targeted tallow care",price:35,category:"targeted",label:"Targeted care",image:"assets/ai-products/set2-body-butter-open.jpg",url:STORE+"/products/raw-hide-relief",desc:"Concept image used for layout only. See the official listing for exact product details."},
 {id:"soapbar",name:"Tallow Soap Bar",subtitle:"4 oz / 120 g",price:14,category:"targeted",label:"Daily cleansing",image:"assets/ai-products/set2-soap-set-front.jpg",url:STORE+"/",desc:"Soap bar concept image. Confirm current price and ingredients with the official store."},
 {id:"bundle",name:"Full Tallow Bundle",subtitle:"A curated skincare collection",price:62,category:"sets",label:"Bundle",image:"assets/ai-products/set2-soap-set-flatlay.jpg",url:STORE+"/",desc:"Bundle concept image. Verify exact included products and price on the official store."},
 {id:"gift",name:"No Bull Gift Card",subtitle:"A thoughtful gift",price:10,category:"sets",label:"Gift card",image:"assets/product-placeholder.svg",url:STORE+"/",desc:"Gift card availability and denominations must be confirmed on the official store."}
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
  <a class="product-image" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${p.name} on official store">
   <img src="${p.image}" alt="${p.name} — illustrative product image" loading="lazy" onerror="this.onerror=null;this.src='assets/product-placeholder.svg'">
   <span class="product-tag">${p.label}</span>
  </a>
  <div class="product-info"><div class="product-category">${p.category==="moisturize"?"Moisturize":p.category==="targeted"?"Targeted care":"Sets & bundles"}</div>
   <div class="product-title-row"><h3>${p.name}</h3><div class="price">${money(p.price)}</div></div>
   <p class="product-description">${p.subtitle}</p>
   <div class="product-bottom"><a href="${p.url}" target="_blank" rel="noopener noreferrer">Official store ↗</a><button class="add-button" data-add="${p.id}">Add to bag +</button></div>
  </div>
 </article>`).join("") : `<p class="no-results">No products match that search. Try another term.</p>`;
 grid.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(btn.dataset.add)));
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});renderCart();showToast("Added to your bag");}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<1)cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), subtotal=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;document.getElementById("cartSubtotal").textContent=money(subtotal)+" CAD";
 const wrap=document.getElementById("cartItems");
 if(!cart.length){wrap.innerHTML='<div class="empty-cart">Your bag is waiting for something good.<br>Explore the collection and add an essential.</div>';return;}
 wrap.innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-line"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><small>${money(p.price)} each</small><div class="line-actions"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button><button class="remove" data-remove="${p.id}">Remove</button></div></div><strong>${money(p.price*x.qty)}</strong></div>`}).join("");
 wrap.querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.qty,Number(b.dataset.delta))));
 wrap.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart=cart.filter(x=>x.id!==b.dataset.remove);renderCart()}));
}
function openCart(){document.body.classList.add("cart-open");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");document.getElementById("cartClose").focus();}
function closeCart(){document.body.classList.remove("cart-open");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");}
let toastTimer;function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2100)}
document.getElementById("productSearch").addEventListener("input",renderProducts);
document.getElementById("categoryFilter").addEventListener("change",renderProducts);
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("cartBackdrop").addEventListener("click",closeCart);
document.getElementById("keepShopping").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
document.getElementById("secureCheckout").addEventListener("click",()=>{
 if(!cart.length){showToast("Add a product before continuing");return;}
 window.open(STORE,"_blank","noopener,noreferrer");
 showToast("Official store opened. Rebuild your bag there to pay securely.");
});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
