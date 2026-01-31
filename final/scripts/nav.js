export function initNav(){
  const btn=document.querySelector("#menu");
  const nav=document.querySelector("#primaryNav");
  if(!btn||!nav) return;
  btn.addEventListener("click",()=>{
    btn.classList.toggle("open");
    nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", nav.classList.contains("open"));
  });
}
