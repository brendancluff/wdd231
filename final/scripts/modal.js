import { escapeHtml } from "./utils.js";
export function initModal(){
  const dialog=document.querySelector("#detailDialog");
  const closeBtn=document.querySelector("#closeDialog");
  if(!dialog||!closeBtn) return null;
  closeBtn.addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",(e)=>{if(e.target===dialog) dialog.close();});
  return dialog;
}
export function showDragon(dialog,dragon){
  if(!dialog) return;
  const title=dialog.querySelector("#detailTitle");
  const body=dialog.querySelector("#detailBody");
  if(!title||!body) return;
  title.textContent=`${dragon.name} (${dragon.id})`;
  body.innerHTML=`
    <img src="images/${escapeHtml(dragon.image)}" alt="${escapeHtml(dragon.name)} illustration" width="600" height="400" loading="eager" fetchpriority="high">
    <div class="meta">
      <span class="badge">Element: ${escapeHtml(dragon.element)}</span>
      <span class="badge">Rank: ${escapeHtml(dragon.rank)}</span>
      <span class="badge">Temperament: ${escapeHtml(dragon.temperament)}</span>
      <span class="badge">Track: ${escapeHtml(dragon.academyTrack)}</span>
    </div>
    <p><strong>Wingspan:</strong> ${dragon.wingSpanM} m</p>
    <p><strong>Bond difficulty:</strong> ${escapeHtml(dragon.bondDifficulty)}</p>
    <p>${escapeHtml(dragon.details)}</p>
  `;
  dialog.showModal();
}
