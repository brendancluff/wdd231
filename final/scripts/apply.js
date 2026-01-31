import { load, save } from "./storage.js";
const form=document.querySelector("#applicationForm");
const preview=document.querySelector("#savedPreview");

function updatePreview(){
  const last=load("lastApplication",null);
  if(!preview) return;
  preview.innerHTML = last
    ? `<p><strong>Last saved:</strong> ${last.fullName} • ${last.track} • prefers ${last.element}</p>`
    : `<p>No saved application yet.</p>`;
}
if(form){
  form.addEventListener("change",()=>{
    const snapshot=Object.fromEntries(new FormData(form).entries());
    save("lastApplication",snapshot);
    updatePreview();
  });
}
updatePreview();
