const facilities=[
 {name:"CityCare Multispeciality Hospital",type:"Hospital",speciality:"Cardiology",distance:1.2,status:"24/7",rating:4.8,address:"Central Avenue, Healthcare District",phone:"+911234567890",emergency:"Available",services:["Emergency Care","ICU","Cardiology","Orthopedics"]},
 {name:"Wellness Family Clinic",type:"Clinic",speciality:"General Medicine",distance:2.4,status:"Open Now",rating:4.6,address:"Green Park, Main Road",phone:"+911234567891",emergency:"Limited",services:["General Medicine","Pediatrics","Checkups"]},
 {name:"Prime Diagnostics",type:"Diagnostic Center",speciality:"General Medicine",distance:3.1,status:"Open Now",rating:4.7,address:"Medical Square, Ring Road",phone:"+911234567892",emergency:"No",services:["Pathology","MRI","CT Scan","Blood Tests"]},
 {name:"LifeLine Blood Bank",type:"Blood Bank",speciality:"General Medicine",distance:4.2,status:"24/7",rating:4.9,address:"Near Civil Hospital",phone:"+911234567893",emergency:"Available",services:["Blood Donation","Blood Storage","Plasma"]},
 {name:"MedPlus Pharmacy",type:"Pharmacy",speciality:"General Medicine",distance:1.8,status:"Open Now",rating:4.5,address:"Station Road, City Center",phone:"+911234567894",emergency:"No",services:["Medicines","Health Products","Wellness"]},
 {name:"NeuroCare Specialist Clinic",type:"Clinic",speciality:"Neurology",distance:5.7,status:"Open Now",rating:4.8,address:"Knowledge Park, Sector 4",phone:"+911234567895",emergency:"Limited",services:["Neurology","Migraine Care","Consultation"]},
 {name:"Bone & Joint Center",type:"Clinic",speciality:"Orthopedics",distance:7.4,status:"Open Now",rating:4.7,address:"Lake View Road",phone:"+911234567896",emergency:"Limited",services:["Orthopedics","Physiotherapy","Joint Care"]},
 {name:"Sunrise Women & Child Hospital",type:"Hospital",speciality:"Gynecology",distance:9.3,status:"24/7",rating:4.9,address:"Family Care Avenue",phone:"+911234567897",emergency:"Available",services:["Gynecology","Pediatrics","Maternity","Emergency Care"]},
 {name:"VisionPlus Eye Clinic",type:"Clinic",speciality:"Ophthalmology",distance:3.8,status:"Open Now",rating:4.6,address:"Market Road, West Zone",phone:"+911234567898",emergency:"No",services:["Eye Exams","Cataract Care","Vision"]},
 {name:"Rapid Response Ambulance",type:"Ambulance",speciality:"Emergency",distance:.9,status:"24/7",rating:4.9,address:"City Emergency Hub",phone:"+911234567899",emergency:"Available",services:["Ambulance","Emergency Transport","First Response"]}
];

const results=document.getElementById("results");
const count=document.getElementById("resultCount");
const searchInput=document.getElementById("searchInput");
const typeFilter=document.getElementById("typeFilter");
const specialityFilter=document.getElementById("specialityFilter");
const distanceFilter=document.getElementById("distanceFilter");
const availabilityFilter=document.getElementById("availabilityFilter");

function renderResults(){
 const q=searchInput.value.trim().toLowerCase();
 const type=typeFilter.value,spec=specialityFilter.value,dist=Number(distanceFilter.value),avail=availabilityFilter.value;
 const filtered=facilities.filter(f=>{
   const text=(f.name+" "+f.type+" "+f.speciality+" "+f.services.join(" ")).toLowerCase();
   return (!q||text.includes(q))&&(type==="All"||f.type===type)&&(spec==="All"||f.speciality===spec)&&(f.distance<=dist)&&(avail==="All"||f.status===avail);
 });
 count.textContent=`${filtered.length} result${filtered.length!==1?"s":""} found`;
 results.innerHTML=filtered.length?filtered.map((f,i)=>cardHTML(f,i)).join(""):`<div class="result-card" style="grid-column:1/-1;text-align:center;padding:45px"><div class="icon" style="margin:auto auto 15px"><i class="fa-solid fa-magnifying-glass"></i></div><h3>No matching services found</h3><p class="small">Try another service, speciality or distance.</p></div>`;
}
function iconFor(type){
 return {Hospital:"fa-hospital",Clinic:"fa-stethoscope","Diagnostic Center":"fa-vial","Blood Bank":"fa-droplet",Pharmacy:"fa-pills",Emergency:"fa-truck-medical",Doctor:"fa-user-doctor",Ambulance:"fa-ambulance"}[type]||"fa-heart-pulse";
}
function cardHTML(f,i){
 return `<article class="result-card reveal show">
  <div class="result-top"><div class="result-icon"><i class="fa-solid ${iconFor(f.type)}"></i></div><div class="type">${f.type}</div></div>
  <h3>${f.name}</h3><div class="rating">★★★★★ <span style="color:#64748b">${f.rating}</span></div>
  <div class="result-meta"><span><i class="fa-solid fa-location-dot"></i> ${f.distance} km away • ${f.address}</span><span class="status"><i class="fa-solid fa-circle-check"></i> ${f.status}</span></div>
  <div class="tags">${f.services.map(s=>`<span class="tag">${s}</span>`).join("")}</div>
  <div class="result-actions"><button class="btn btn-primary" onclick="openModal(${facilities.indexOf(f)})">Details</button><a class="btn btn-light" href="tel:${f.phone}"><i class="fa-solid fa-phone"></i></a><a class="btn btn-light" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.name+" "+f.address)}"><i class="fa-solid fa-diamond-turn-right"></i></a></div>
 </article>`;
}
function filterType(type){typeFilter.value=type;distanceFilter.value="25";availabilityFilter.value="All";renderResults();document.getElementById("find").scrollIntoView({behavior:"smooth"});}
document.getElementById("applyBtn").addEventListener("click",renderResults);
searchInput.addEventListener("input",renderResults);
[typeFilter,specialityFilter,distanceFilter,availabilityFilter].forEach(el=>el.addEventListener("change",renderResults));

document.querySelectorAll(".service-card .explore").forEach(btn=>btn.addEventListener("click",e=>filterType(e.target.closest(".service-card").dataset.filter)));
document.querySelectorAll(".disease-card").forEach(card=>card.addEventListener("click",()=>{
 specialityFilter.value=card.dataset.speciality;
 distanceFilter.value="25";
 renderResults();
 document.getElementById("find").scrollIntoView({behavior:"smooth"});
 showToast("Showing services for "+card.querySelector("h3").innerText.replace(/[^\w &]+/g,"").trim());
}));



const hfTranslations={hi:["होम","डॉक्टर","अपॉइंटमेंट","ब्लड बैंक सेवाएं","राष्ट्रीय राजमार्ग आपातकालीन सेवाएं","अक्सर पूछे जाने वाले प्रश्न"],te:["హోమ్","వైద్యులు","అపాయింట్‌మెంట్","బ్లడ్ బ్యాంక్ సేవలు","జాతీయ రహదారి అత్యవసర సేవలు","తరచుగా అడిగే ప్రశ్నలు"],ta:["முகப்பு","மருத்துவர்கள்","சந்திப்பு பதிவு","இரத்த வங்கி சேவைகள்","தேசிய நெடுஞ்சாலை அவசர சேவைகள்","அடிக்கடி கேட்கப்படும் கேள்விகள்"],kn:["ಮುಖಪುಟ","ವೈದ್ಯರು","ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್","ರಕ್ತ ಬ್ಯಾಂಕ್ ಸೇವೆಗಳು","ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ ತುರ್ತು ಸೇವೆಗಳು","ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು"],ml:["ഹോം","ഡോക്ടർമാർ","അപ്പോയിന്റ്മെന്റ്","ബ്ലഡ് ബാങ്ക് സേവനങ്ങൾ","ദേശീയ പാത അടിയന്തര സേവനങ്ങൾ","പതിവുചോദ്യങ്ങൾ"],mr:["मुख्यपृष्ठ","डॉक्टर","अपॉइंटमेंट","रक्तपेढी सेवा","राष्ट्रीय महामार्ग आपत्कालीन सेवा","वारंवार विचारले जाणारे प्रश्न"],bn:["হোম","ডাক্তার","অ্যাপয়েন্টমেন্ট","ব্লাড ব্যাংক পরিষেবা","জাতীয় মহাসড়ক জরুরি পরিষেবা","সচরাচর জিজ্ঞাসা"],gu:["હોમ","ડોક્ટરો","એપોઇન્ટમેન્ટ","બ્લડ બેંક સેવા","નેશનલ હાઇવે ઇમરજન્સી સેવાઓ","વારંવાર પૂછાતા પ્રશ્નો"],pa:["ਹੋਮ","ਡਾਕਟਰ","ਅਪਾਇੰਟਮੈਂਟ","ਬਲੱਡ ਬੈਂਕ ਸੇਵਾਵਾਂ","ਰਾਸ਼ਟਰੀ ਹਾਈਵੇ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ","ਅਕਸਰ ਪੁੱਛੇ ਸਵਾਲ"],or:["ହୋମ","ଡାକ୍ତର","ଆପଏଣ୍ଟମେଣ୍ଟ","ବ୍ଲଡ୍ ବ୍ୟାଙ୍କ ସେବା","ଜାତୀୟ ରାଜପଥ ଜରୁରୀ ସେବା","ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ"],ur:["ہوم","ڈاکٹرز","اپائنٹمنٹ","بلڈ بینک سروسز","قومی شاہراہ ہنگامی خدمات","اکثر پوچھے گئے سوالات"]};
function setHFLanguage(code){document.documentElement.lang=code;document.documentElement.dir=code==="ur"?"rtl":"ltr";localStorage.setItem("hfLanguage",code);showToast(code==="en"?"English selected":"Language updated");}
document.getElementById("languageSelect")?.addEventListener("change",e=>setHFLanguage(e.target.value));
function openBloodSearch(){const g=document.getElementById("bloodGroup").value;window.open("https://eraktkosh.mohfw.gov.in/","_blank");showToast(g?`Opening official blood availability for ${g}`:"Opening official blood availability");}
function openHighwayChecklist(){document.getElementById("highwayModal").classList.add("open")}
function closeHighwayChecklist(){document.getElementById("highwayModal").classList.remove("open")}


async function refreshWecairData(){
  const status=document.getElementById("dbMapStatus"),text=document.getElementById("dbMapText"),count=document.getElementById("mapDataCount");
  try{
    const r=await fetch("/api/hospitals");
    if(!r.ok) throw new Error("Backend unavailable");
    const hospitals=await r.json();
    status.textContent="Database connected";
    text.textContent="Healthcare location records are available from the WECARE PLUS backend.";
    count.textContent=`${hospitals.length} healthcare locations`;
    if(typeof map!=="undefined" && map){
      if(typeof hospitalMarkers!=="undefined") hospitalMarkers.forEach(m=>map.removeLayer(m));
      window.hospitalMarkers=[];
      hospitals.forEach(h=>{
        const marker=L.marker([h.latitude,h.longitude]).addTo(map);
        marker.bindPopup(`<strong>${h.name}</strong><br>${h.type||"Healthcare Service"}<br>${h.address||""}<br><a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${h.latitude},${h.longitude}">Get Directions</a>`);
        window.hospitalMarkers.push(marker);
      });
    }
  }catch(e){
    status.textContent="Demo / offline mode";
    text.textContent="Start the Node.js backend to load database records and map locations.";
    count.textContent="Local sample locations";
  }
}
function showDatabaseInfo(){showToast("WECARE PLUS uses a Node.js API with JSON database storage for this academic project. It can be upgraded to MySQL/PostgreSQL/MongoDB.");}
document.addEventListener("DOMContentLoaded",()=>setTimeout(refreshWecairData,500));

function bookDoctor(name,speciality){
 document.getElementById("bookingDoctor").textContent=name;
 document.getElementById("bookingSpeciality").textContent=speciality+" specialist • Appointment slots available";
 document.getElementById("bookingModal").classList.add("open");
}
function closeBooking(){document.getElementById("bookingModal").classList.remove("open")}

let lastBooking = null;

document.getElementById("appointmentForm").addEventListener("submit", async e=>{
 e.preventDefault();
 const form=e.target;
 const payload={
   hospital:document.getElementById("appointmentHospital").value,
   doctor:document.getElementById("appointmentDoctor").value,
   date:form.querySelector('input[type="date"]').value,
   time:form.querySelectorAll('select')[2]?.value || "05:30 PM",
   consultation:form.querySelectorAll('select')[3]?.value || "In-person Visit",
   patientName:document.getElementById("patientName").value.trim(),
   phone:document.getElementById("patientPhone").value.trim(),
   email:document.getElementById("patientEmail").value.trim()
 };
 if(!payload.date){showToast("Please select an appointment date");return}
 try{
   const res=await fetch("/api/appointments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
   if(!res.ok) throw new Error("Server unavailable");
   lastBooking=await res.json();
 }catch(err){
   // Standalone-file fallback keeps the UI usable when the Node server is not running.
   lastBooking={bookingId:"HF-DEMO-"+Date.now().toString().slice(-6),...payload,status:"Demo Confirmation",createdAt:new Date().toISOString()};
 }
 showReceipt(lastBooking);
 form.reset();
});

function showReceipt(b){
 document.getElementById("receiptContent").innerHTML=`
   <div class="receipt-row"><span>Booking ID</span><strong class="booking-id">${b.bookingId}</strong></div>
   <div class="receipt-row"><span>Patient</span><strong>${escapeHTML(b.patientName)}</strong></div>
   <div class="receipt-row"><span>Hospital</span><strong>${escapeHTML(b.hospital)}</strong></div>
   <div class="receipt-row"><span>Doctor</span><strong>${escapeHTML(b.doctor)}</strong></div>
   <div class="receipt-row"><span>Date</span><strong>${escapeHTML(b.date)}</strong></div>
   <div class="receipt-row"><span>Time</span><strong>${escapeHTML(b.time)}</strong></div>
   <div class="receipt-row"><span>Consultation</span><strong>${escapeHTML(b.consultation)}</strong></div>
   <div class="receipt-row"><span>Status</span><strong>${escapeHTML(b.status || "Confirmed")}</strong></div>`;
 document.getElementById("receiptModal").classList.add("open");
}
function closeReceipt(){document.getElementById("receiptModal").classList.remove("open")}
function printReceipt(){window.print()}
function downloadReceipt(){
 if(!lastBooking)return;
 const text=`WECARE PLUS APPOINTMENT RECEIPT\\n\\nBooking ID: ${lastBooking.bookingId}\\nPatient: ${lastBooking.patientName}\\nHospital: ${lastBooking.hospital}\\nDoctor: ${lastBooking.doctor}\\nDate: ${lastBooking.date}\\nTime: ${lastBooking.time}\\nConsultation: ${lastBooking.consultation}\\nStatus: ${lastBooking.status||"Confirmed"}\\n`;
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:"text/plain"}));a.download=`WECARE PLUS-${lastBooking.bookingId}.txt`;a.click();URL.revokeObjectURL(a.href);
}
function escapeHTML(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
document.getElementById("receiptModal").addEventListener("click",e=>{if(e.target.id==="receiptModal")closeReceipt()});

function findReport(){
 const id=document.getElementById("reportId").value.trim();
 const box=document.getElementById("reportResult");
 if(!id){showToast("Please enter a Report / Patient ID");return}
 box.classList.add("show");box.innerHTML=`<strong>Demo report found: ${id}</strong><br>Sample result portal opened. Connect this UI to your secure hospital records system for real reports.`;
}
function uploadReport(input){if(input.files[0]){document.getElementById("reportResult").classList.add("show");document.getElementById("reportResult").innerHTML=`Uploaded: <strong>${input.files[0].name}</strong> — demo upload complete.`}}
function openAssistant(){document.getElementById("assistantModal").classList.add("open");setTimeout(()=>document.getElementById("aiInput").focus(),100)}
function closeAssistant(){document.getElementById("assistantModal").classList.remove("open")}
function askAI(text){addChat(text,"user");setTimeout(()=>aiReply(text),400)}
function sendAI(e){e.preventDefault();const input=document.getElementById("aiInput");const text=input.value.trim();if(!text)return;input.value="";askAI(text)}
function addChat(text,type){const box=document.getElementById("chatMessages");const div=document.createElement("div");div.className="chat "+type;div.textContent=text;box.appendChild(div);box.scrollTop=box.scrollHeight}
function aiReply(text){
 const t=text.toLowerCase();let reply;
 if(t.includes("emergency")||t.includes("accident")||t.includes("urgent")) reply="For an immediate emergency, call your local emergency service now. In India, 112 is the national emergency number. You can also use our Emergency section to find hospitals and ambulances.";
 else if(t.includes("cardio")||t.includes("heart")) reply="I can help you find a Cardiology specialist. Try the Doctors section or choose Cardiology in the Find Services filter.";
 else if(t.includes("lab")||t.includes("test")||t.includes("diagnostic")) reply="For lab testing, open the Diagnostic Centers results. You can also use Online Lab Reports to access the prototype report portal.";
 else if(t.includes("blood")) reply="For blood requirements, open Blood Banks from Services or use the Emergency section. Always confirm blood group availability directly with the blood bank.";
 else if(t.includes("doctor")||t.includes("specialist")) reply="Tell me a speciality such as Cardiology, Neurology, Orthopedics, Gynecology or Pediatrics, and I'll point you to the relevant section.";
 else if(t.includes("bed")) reply="Open Available Beds to view the prototype hospital bed dashboard. Availability shown there is sample data, so verify directly with the hospital.";
 else reply="I can help navigate WECARE PLUS. Try asking about a doctor, hospital, emergency care, lab test, blood bank, appointment or available beds.";
 addChat(reply,"ai");
}
document.getElementById("assistantModal").addEventListener("click",e=>{if(e.target.id==="assistantModal")closeAssistant()});
document.getElementById("bookingModal").addEventListener("click",e=>{if(e.target.id==="bookingModal")closeBooking()});

function openModal(index){
 const f=facilities[index];
 document.getElementById("modalName").textContent=f.name;
 document.getElementById("modalType").textContent=f.type+" • "+f.speciality;
 document.getElementById("modalRating").textContent=`★★★★★ ${f.rating}`;
 document.getElementById("modalAddress").textContent=f.address;
 document.getElementById("modalDistance").textContent=f.distance+" km";
 document.getElementById("modalHours").textContent=f.status==="24/7"?"Open 24/7":"Open now";
 document.getElementById("modalEmergency").textContent=f.emergency;
 document.getElementById("modalTags").innerHTML=f.services.map(s=>`<span class="tag">${s}</span>`).join("");
 document.getElementById("modalCall").href="tel:"+f.phone;
 document.getElementById("modalDirections").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(f.name+" "+f.address);
 document.getElementById("modal").classList.add("open");
}
function closeModal(){document.getElementById("modal").classList.remove("open")}
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});


let healthMap, healthMarkers=[], userMarker=null;
const defaultCenter=[17.3850,78.4867]; // Hyderabad demo center

window.initHealthMap=function initHealthMap(){
 if(typeof L==="undefined") return;
 healthMap=L.map("healthMap",{scrollWheelZoom:true,zoomControl:true}).setView(defaultCenter,13);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(healthMap);
 loadMapHospitals();
}
async function loadMapHospitals(){
 let data=[];
 try{const r=await fetch("/api/hospitals");if(r.ok)data=await r.json()}catch(e){}
 if(!data.length){
  data=[
   {name:"CityCare Multispeciality Hospital",type:"Hospital",lat:17.3900,lng:78.4800,address:"Central Avenue, Hyderabad",phone:"+91 40 6810 6585",status:"24/7"},
   {name:"Wellness Family Clinic",type:"Clinic",lat:17.3750,lng:78.4950,address:"Family Care Road, Hyderabad",phone:"+91 90000 11111",status:"Open Now"},
   {name:"Prime Diagnostics",type:"Diagnostic Center",lat:17.3650,lng:78.4750,address:"Health Street, Hyderabad",phone:"+91 90000 22222",status:"Open Now"},
   {name:"LifeLine Blood Bank",type:"Blood Bank",lat:17.4000,lng:78.5000,address:"Emergency Hub, Hyderabad",phone:"+91 90000 33333",status:"24/7"},
   {name:"MedPlus Pharmacy",type:"Pharmacy",lat:17.3820,lng:78.5050,address:"Main Road, Hyderabad",phone:"+91 90000 44444",status:"Open Now"}
  ];
 }
 const icons={Hospital:"hospital",Clinic:"stethoscope","Diagnostic Center":"vial","Blood Bank":"droplet",Pharmacy:"pills"};
 data.forEach(f=>{
  const marker=L.marker([f.lat,f.lng]).addTo(healthMap);
  marker.bindPopup(`<strong>${escapeHTML(f.name)}</strong><br>${escapeHTML(f.type)}<br>${escapeHTML(f.address)}<br><a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}">Google Maps Directions</a>`);
  marker.on("click",()=>selectPin(f.name,f.type,f.address,f.status||"Open"));
  healthMarkers.push(marker);
 });
 fitHealthMap();
}
window.fitHealthMap=function fitHealthMap(){
 if(healthMap && healthMarkers.length) healthMap.fitBounds(L.featureGroup(healthMarkers).getBounds().pad(.15));
}
function locateOnMap(){
 if(!navigator.geolocation){showToast("Geolocation is not supported.");return}
 showToast("Finding your location...");
 navigator.geolocation.getCurrentPosition(pos=>{
   const p=[pos.coords.latitude,pos.coords.longitude];
   if(userMarker)userMarker.remove();
   userMarker=L.circleMarker(p,{radius:9,weight:3,fillOpacity:.8}).addTo(healthMap).bindPopup("You are here").openPopup();
   healthMap.setView(p,14);
   document.getElementById("heroLocation").value="Current location detected";
   showToast("Your location is shown on the map.");
 },()=>showToast("Location permission was not available."),{enableHighAccuracy:true,timeout:10000});
}

function selectPin(name,type,distance,status){
 document.getElementById("mapInfo").innerHTML=`<div class="icon"><i class="fa-solid ${iconFor(type)}"></i></div><div class="type">${type}</div><h3>${name}</h3><p>Selected healthcare service on the project map.</p><div class="info-list"><div class="info-line"><i class="fa-solid fa-location-dot"></i>${distance}</div><div class="info-line"><i class="fa-solid fa-clock"></i><span class="status">${status}</span></div></div><button class="btn btn-primary" style="margin-top:20px" onclick="showToast('Facility selected')">Select Facility</button>`;
}

document.getElementById("headerSearch").addEventListener("submit",e=>{
 e.preventDefault();
 const q=document.getElementById("headerQuery").value.trim();
 searchInput.value=q; renderResults();
 document.getElementById("find").scrollIntoView({behavior:"smooth"});
 if(q) showToast("Searching for: "+q);
});

document.getElementById("heroSearch").addEventListener("submit",e=>{
 e.preventDefault();
 searchInput.value=document.getElementById("heroQuery").value;
 renderResults();
 document.getElementById("find").scrollIntoView({behavior:"smooth"});
});
document.getElementById("locationBtn").addEventListener("click",()=>{
 if(!navigator.geolocation){showToast("Geolocation is not supported by this browser.");return}
 showToast("Requesting your location...");
 navigator.geolocation.getCurrentPosition(
  pos=>{document.getElementById("heroLocation").value="Location detected";showToast(`Location detected: ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`)},
  ()=>showToast("Location access was not available. You can search by city or area instead."),
  {enableHighAccuracy:true,timeout:8000}
 );

});
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),3000)}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const topBtn=document.getElementById("topBtn");
window.addEventListener("scroll",()=>topBtn.classList.toggle("show",scrollY>500));
topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

document.querySelectorAll('a[href^="#"]:not([data-page])').forEach(a=>a.addEventListener("click",e=>{
 const target=document.querySelector(a.getAttribute("href"));
 if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"})}
}));
renderResults();

window.addEventListener("load",()=>setTimeout(()=>{if(typeof L!=="undefined") initHealthMap();},120));

(function(){
  const pageNames=["home","services","hospitals","doctors","booking","beds","labs","blood","faq"];
  const titles={
    home:"Healthcare Service Finder",services:"Healthcare Services",
    hospitals:"Hospitals & Map",doctors:"Doctors",booking:"Book Appointment",
    beds:"Hospital Beds",labs:"Lab Reports",blood:"Blood & Emergency",faq:"FAQ"
  };
  function showWecairPage(page, updateHash=true){
    if(!pageNames.includes(page)) page="home";
    document.querySelectorAll("[data-page-view]").forEach(el=>{
      el.classList.toggle("active-page", el.getAttribute("data-page-view")===page);
    });
    document.querySelectorAll("[data-page]").forEach(el=>{
      el.classList.toggle("page-nav-active", el.getAttribute("data-page")===page);
    });
    const select=document.getElementById("mobilePageSelect");
    if(select) select.value=page;
    if(updateHash) history.replaceState(null,"","#"+page);
    window.scrollTo(0,0);
    document.title="WECARE PLUS — "+titles[page];
    const nav=document.getElementById("navLinks");
    if(nav) nav.classList.remove("open");
    if(page==="hospitals"){
      setTimeout(()=>{
        if(window.healthMap && window.healthMap.invalidateSize){
          window.healthMap.invalidateSize();
          if(window.fitHealthMap) window.fitHealthMap();
        } else if(window.initHealthMap){
          window.initHealthMap();
          setTimeout(()=>window.healthMap?.invalidateSize(),250);
        }
      },80);
    }
    document.querySelectorAll(".reveal").forEach(el=>{
      if(el.closest("[data-page-view]")?.getAttribute("data-page-view")===page) el.classList.add("show");
    });
  }
  window.showWecairPage=showWecairPage;
  document.addEventListener("click",e=>{
    const a=e.target.closest("[data-page]");
    if(!a)return;
    e.preventDefault();
    showWecairPage(a.getAttribute("data-page"));
  });
  document.getElementById("mobilePageSelect")?.addEventListener("change",e=>showWecairPage(e.target.value));
  window.addEventListener("hashchange",()=>showWecairPage(location.hash.slice(1),false));
  const initial=location.hash.slice(1);
  showWecairPage(pageNames.includes(initial)?initial:"home",false);
})();
