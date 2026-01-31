export function setFooterDates(){
  const year=document.querySelector("#currentYear");
  const modified=document.querySelector("#lastModified");
  if(year) year.textContent=new Date().getFullYear();
  if(modified) modified.textContent=document.lastModified;
}
export function escapeHtml(str=""){
  return str.replace(/[&<>"']/g,(m)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
