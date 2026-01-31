import { escapeHtml } from "./utils.js";
const out=document.querySelector("#formOutput");
const params=new URLSearchParams(window.location.search);

if(!out){
  // no-op
}else if(Array.from(params.keys()).length===0){
  out.innerHTML="<p>No form data found. Please return to the application page and submit the form.</p>";
}else{
  const rows=[];
  for(const [k,v] of params.entries()){
    rows.push(`<tr><th scope="row">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`);
  }
  out.innerHTML=`
    <p><strong>Success!</strong> Your application data was received.</p>
    <div class="panel" style="margin-top:.75rem">
      <table style="width:100%;border-collapse:collapse">${rows.join("")}</table>
    </div>`;
}
