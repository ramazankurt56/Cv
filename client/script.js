get();
let day="01";
let month="01";
let year="2023";
let myData={};
function get() {
    document.getElementById("blog").style.display="none";
    document.getElementById("blogloading").style.display="block";
    document.getElementById("error").style.display="none";
    setTimeout(()=>{
   

    axios.get("http://localhost:5000/api/get")
        .then(res => {
         myData = res.data;
            setMyInformation(myData.person);
            setMySkills(myData.skills)
            setMySocialMedias(myData.socialMedias)
            setMyWorkExpiriences(myData.workExpiriences)
            setMyEducations(myData.educations)  
            setMyCertificate(myData.certificate)
            setMyReference(myData.reference)
            setMyLanguage(myData.language)
            document.getElementById("blog").style.display="block";
            document.getElementById("blogloading").style.display="none";
            document.getElementById("spinner").style.display="none";

        })
        .catch(err=>
            {
                document.getElementById("blogloading").style.display="none";
                document.getElementById("spinner").style.display="none";
                document.getElementById("error").style.display="flex";
            })
    },0)
}
function tryAgain(){
    document.location.reload();
}
function setMyInformation(person) {
    //HTML çıktı elementleri
    document.getElementById("name").innerText = person.name;
    document.getElementById("title").innerText = person.title;
    document.getElementById("phone").innerText = person.phone;
    document.getElementById("avatar").src = person.avatar;
    document.getElementById("mail").innerText = person.mail;
    document.getElementById("address").innerText = person.address;
    document.getElementById("aboutMe").innerHTML = person.aboutMe;
    document.getElementById("dateOfBirth").innerText = setAndConvertDate(person.dateOfBirth);
    //HTML Input vb. elementleri
    document.getElementById("nameInput").value = person.name;  
    document.getElementById("subTitleInput").value = person.title;
    document.getElementById("dateOfBirthInput").value = `${year}-${month}-${day}`;
    document.getElementById("phoneInput").value = person.phone;
    document.getElementById("mailInput").value = person.mail;
    document.getElementById("addressInput").value = person.address;
    document.getElementById("aboutInput").value = person.aboutMe;
}
function showEditForm(){
    const blog = document.getElementById("main");
    blog.classList.add("main");

    const editForm = document.getElementById("edit-form");
    editForm.style.display = "block";
}
function hideEditForm(){
    const result = confirm("Are you sure cancel this changing?");
    if(!result) return;

    
    Cancel();
    
}
function Cancel(){
   
    const blog = document.getElementById("main");
    blog.classList.remove("main");
    
    const editForm = document.getElementById("edit-form");
    editForm.style.display = "none"; 
   
    get();
}
function save(){
    axios.post("http://localhost:5000/api/set",myData)
        .then(res=> {
            Cancel();
    });
}
function keyInputAndSetValue(id,event){
    document.getElementById(id).innerHTML = event.target.value;
    myData.person[id] = event.target.value;
}
function changeBirthDateAndSetValue(event){    

    document.getElementById("dateOfBirth").innerText = setAndConvertDate(event.target.value);
    myData.person["dateOfBirth"] = event.target.value;


}
function setAndConvertDate(data){
    const date= new Date(data)
    day=date.getDate();
    day = day.toString().length === 1 ? "0" + day.toString() : day;

    month =  date.getMonth() + 1;
    month = month.toString().length === 1 ? "0" + month.toString() : month;

    year=date.getFullYear();
   const dateString=`${day}/${month}/${year}`   
   return dateString;
}
//---------------Skills**************************************************
function createSkillElementForShowField(skills){
    let text = "";
    for (let skill of skills) {
        text += `
            <div class="div-skills">
     <li>
       <p>${skill.title}</p>
       <progress id="progress" value="${skill.rate}" max="100">${skill.rate}%</progress>
      </li>
     </div>
            `
    }
    document.getElementById("skills").innerHTML = text;

}
let skillEditId=0;
function setMySkills(skills) {
    createSkillElementForShowField(skills);
  
    let editText="";
    
    for(let skill of skills)
    {
        skillEditId++;
        editText+=getSkillEditFormDivField(skill);
       
        document.getElementById("skill-div").innerHTML = editText;
    }
    
}
function getSkillEditFormDivField(skill){
    return `
    <div id="skillEditDiv${skillEditId}" data-id="${skill.id}" class="form-group">
   
    <label for="titleInput">Title</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'title','skills')" type="text" id="titleInput${skillEditId}" data-id="${skill.id}" value="${skill.title}">
    <label for="skillRateInput">Rate</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'rate','skills')" type="number" id="skillRateInput${skillEditId}" data-id="${skill.id}" max="100" min="0" value="${skill.rate}"> 
    
    <button class="btn" onclick="removeSkillForEditForm('skillEditDiv${skillEditId}')">Clear</button>
    
</div>  
    `
}
function createSkillEditFormDivField(){
    //bu kısımdaki Id kısmına database aldığımızda değişiklik yapılacak
    skillEditId++;
    const skill = {id:skillEditId,title:"",rate:0};

    myData.skills.push(skill)
    const text = getSkillEditFormDivField(skill);
    //console.log(text);
    document.getElementById("skill-div").innerHTML += text;
    console.log(document.getElementById("skill-div").innerHTML);

    createSkillElementForShowField(myData.skills);
}
function removeSkillForEditForm(elementId){ 
const element= document.getElementById(elementId);    
const id=element.dataset["id"];
const index = myData.skills.findIndex(p=> p.id == id);

myData.skills.splice(index,1);
element.remove();       
createSkillElementForShowField(myData.skills);
}
//--------------------------------------------------Language****************************
function createLanguageElementForShowField(language){
    let text = "<h1><span><i class='fa fa-language'></i></span>LANGUAGE</h1>";
    for (let lan of language) {
        text += ` 
    <div class="Language-div" >
     <p>-${lan.title}</p>
     </div>
            `
    }
    document.getElementById("language").innerHTML = text;

}
let languageEditId=0;
function  setMyLanguage(language)
{
    createLanguageElementForShowField(language);
    let editText="";
    
    for(let lan of language)
    {
        languageEditId++;
        editText+=getLanguageEditFormDivField(lan);
       
        document.getElementById("Language-div").innerHTML = editText;
    }
}
function getLanguageEditFormDivField(language){
    return `
    <div id="languageEditDiv${languageEditId}" data-id="${language.id}" class="form-group">
    <label for="languageInput">Title</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'title','language')" type="text" id="languageInput${languageEditId}" data-id="${language.id}" value="${language.title}"> 
    
    <button class="btn" onclick="removeLanguageForEditForm('languageEditDiv${languageEditId}')">Clear</button>
</div>  
    `
}
function createLanguageEditFormDivField(){
    languageEditId++;
    const language = {id:languageEditId,title:""};
    myData.language.push(language)
    const text = getLanguageEditFormDivField(language);
    document.getElementById("Language-div").innerHTML += text;
    createLanguageElementForShowField(myData.language);
}
function removeLanguageForEditForm(elementId){ 
const element= document.getElementById(elementId);    
const id=element.dataset["id"];
const index = myData.language.findIndex(p=> p.id == id);

myData.language.splice(index,1);
element.remove();       
createLanguageElementForShowField(myData.language);
}
//----------------------Reference********************************************************
let referenceEditId=0;
function createReferenceElementForShowField(reference){
    let text = "<h1>REFERENCES</h1>";
    for (let ref of reference) {
        text += `
        <div class="reference">
                        <h3>${ref.name}</h3>
                        <p>${ref.position}</p>
                        <p>${ref.number}</p>
                    </div>
            `
    }
    document.getElementById("reference").innerHTML = text;
}
function setMyReference(reference)
{
    createReferenceElementForShowField(reference);
    let editText="";
    for(let ref of reference)
    {
        referenceEditId++;
        editText+=getReferenceEditFormDivField(ref);
       
        document.getElementById("reference-div").innerHTML = editText;
    }
}
function getReferenceEditFormDivField(reference){
    
    return `
    <div id="referenceEditDiv${referenceEditId}" data-id="${reference.id}" class="form-group">
    <label for="referenceInput">Name</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'name','reference')" type="text" id="referenceInput${referenceEditId}" data-id="${reference.id}" value="${reference.name}"> 
    <label for="referenceInput">Position</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'position','reference')" type="text" id="referenceInput${referenceEditId}" data-id="${reference.id}" value="${reference.position}"> 
    <label for="referenceInput">Number</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'number','reference')" type="text" id="referenceInput${referenceEditId}" data-id="${reference.id}" value="${reference.number}"> 
    <button class="btn" onclick="removeReferenceForEditForm('referenceEditDiv${referenceEditId}')">Clear</button>
</div>  
    `

}
function createReferenceEditFormDivField(){
    referenceEditId++;
    const reference = {id:referenceEditId,name:"",position:"",number:""};
    myData.reference.push(reference)
    const text = getReferenceEditFormDivField(reference);
    document.getElementById("reference-div").innerHTML += text;
    createReferenceElementForShowField(myData.reference);
}
function removeReferenceForEditForm(elementId){ 
const element= document.getElementById(elementId);    
const id=element.dataset["id"];
const index = myData.reference.findIndex(p=> p.id == id);
myData.reference.splice(index,1);
element.remove();       
createReferenceElementForShowField(myData.reference);
}
//---------------------------------Certificate************************************************

let certificateEditId=0;
function createCertificateElementForShowField(certificate){
    let text = "<h1>CERTIFICATES</h1>";
    for (let cer of certificate) {
        text += `
        <div class="certificate">
        <p>${cer.date} -  ${cer.title}</p>
        
    </div>
            `
    }
    document.getElementById("certificate").innerHTML = text;
}
function setMyCertificate(certificate)
{
    createCertificateElementForShowField(certificate);
    let editText="";
    for(let cer of certificate)
    {
        certificateEditId++;
        editText+=getCertificateEditFormDivField(cer);
       
        document.getElementById("certificate-div").innerHTML = editText;
    }
}
function getCertificateEditFormDivField(certificate){
    
    return `
    <div id="certificateEditDiv${certificateEditId}" data-id="${certificate.id}" class="form-group">
    <label for="certificateInput">Title</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'title','certificate')" type="text" id="certificateInput${certificateEditId}" data-id="${certificate.id}" value="${certificate.title}"> 
    <label for="certificateInput">Date</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'date','certificate')" type="text" id="certificateInput${certificateEditId}" data-id="${certificate.id}" value="${certificate.date}"> 
<button class="btn" onclick="removeCertificateForEditForm('certificateEditDiv${certificateEditId}')">Clear</button>
</div>  
    `

}
function createCertificateEditFormDivField(){
    certificateEditId++;
    const certificate = {id:certificateEditId,title:"",date:""};
    myData.certificate.push(certificate)
    const text = getCertificateEditFormDivField(certificate);
    document.getElementById("certificate-div").innerHTML += text;
    createCertificateElementForShowField(myData.certificate);
}
function removeCertificateForEditForm(elementId){ 
const element= document.getElementById(elementId);    
const id=element.dataset["id"];
const index = myData.certificate.findIndex(p=> p.id == id);
myData.certificate.splice(index,1);
element.remove();       
createCertificateElementForShowField(myData.certificate);
}
//-----------------------------Edications************************************
let educationsEditId=0;
function createEducationsElementForShowField(educations){
    let text = "<h1>EDUCATIONS</h1>";
    for (let edu of educations) {
        text += `
        <div class="education" >
                        <h4>${edu.title}</h4>
                        <p>${edu.section}</p>
                        <p>${edu.date}</p>
                    </div>
            `
    }
    document.getElementById("educations").innerHTML = text;
}
function setMyEducations(educations)
{
    createEducationsElementForShowField(educations);
    let editText="";
    for(let ref of educations)
    {
        educationsEditId++;
        editText+=getEducationsEditFormDivField(ref);
       
        document.getElementById("educations-div").innerHTML = editText;
    }
}
function getEducationsEditFormDivField(educations){
    
    return `
    <div id="educationsEditDiv${educationsEditId}" data-id="${educations.id}" class="form-group">
    <label for="educationsInput">Name</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'title','educations')" type="text" id="educationsInput${educationsEditId}" data-id="${educations.id}" value="${educations.title}"> 
    <label for="educationsInput">Position</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'section','educations')" type="text" id="educationsInput${educationsEditId}" data-id="${educations.id}" value="${educations.section}"> 
    <label for="educationsInput">Number</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'date','educations')" type="text" id="educationsInput${educationsEditId}" data-id="${educations.id}" value="${educations.date}"> 
    <button class="btn" onclick="removeEducationsForEditForm('educationsEditDiv${educationsEditId}')">Clear</button>
</div>  
    `

}
function createEducationsEditFormDivField(){
    educationsEditId++;
    const educations = {id:educationsEditId,title:"",section:"",date:""};
    myData.educations.push(educations)
    const text = getEducationsEditFormDivField(educations);
    document.getElementById("educations-div").innerHTML += text;
    createEducationsElementForShowField(myData.educations);
}
function removeEducationsForEditForm(elementId){ 
const element= document.getElementById(elementId);    
const id=element.dataset["id"];
const index = myData.educations.findIndex(p=> p.id == id);
myData.educations.splice(index,1);
element.remove();       
createEducationsElementForShowField(myData.educations);
}
//---------------------------------
let workExpiriencesEditId=0;
function createWorkExpiriencesElementForShowField(workExpiriences){
    let text = "<h1>WORK EXPIRIENCES</h1>";
    for (let work of workExpiriences) {
        text += `
        <div class="workexperience">
        <h4>${work.title}</h4>
        <h4>${work.company}</h4>
        <h5>${work.date}</h5>
        <p class="workexperience-text">${work.description}</p>
    </div>
            `
    }
    document.getElementById("workexperience").innerHTML = text;
}
function setMyWorkExpiriences(workExpiriences)
{
    createWorkExpiriencesElementForShowField(workExpiriences);
    let editText="";
    for(let work of workExpiriences)
    {
        workExpiriencesEditId++;
        editText+=getWorkExpiriencesEditFormDivField(work);
       
        document.getElementById("workExpiriences-div").innerHTML = editText;
    }
}
function getWorkExpiriencesEditFormDivField(workExpiriences){
    
    return `
    <div id="workExpiriencesEditDiv${workExpiriencesEditId}" data-id="${workExpiriences.id}" class="form-group">
    <label for="workExpiriencesInput">Title</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'title','workExpiriences')" type="text" id="workExpiriencesInput${workExpiriencesEditId}" data-id="${workExpiriences.id}" value="${workExpiriences.title}"> 
    <label for="workExpiriencesInput">Company</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'company','workExpiriences')" type="text" id="workExpiriencesInput${workExpiriencesEditId}" data-id="${workExpiriences.id}" value="${workExpiriences.company}"> 
    <label for="workExpiriencesInput">Date</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'date','workExpiriences')" type="text" id="workExpiriencesInput${workExpiriencesEditId}" data-id="${workExpiriences.id}" value="${workExpiriences.date}"> 
    <label for="workExpiriencesInput">Description</label>
    <textarea style="resize: none; onkeyup="keyupGetAndSetInputValue(event,'description','workExpiriences')" type="text" id="workExpiriencesInput${workExpiriencesEditId}" data-id="${workExpiriences.id}" value="${workExpiriences.description}"></textarea>
    <button class="btn" onclick="removeWorkExpiriencesForEditForm('workExpiriencesEditDiv${workExpiriencesEditId}')">Clear</button>
</div>  
    `

}
function createWorkExpiriencesEditFormDivField(){
    workExpiriencesEditId++;
    const workExpiriences = {id:workExpiriencesEditId,title:"",company:"",date:"",description:""};
    myData.workExpiriences.push(workExpiriences)
    const text = getWorkExpiriencesEditFormDivField(workExpiriences);
    document.getElementById("workExpiriences-div").innerHTML += text;
    createWorkExpiriencesElementForShowField(myData.workExpiriences);
}
function removeWorkExpiriencesForEditForm(elementId){ 
const element= document.getElementById(elementId);    
const id=element.dataset["id"];
const index = myData.workExpiriences.findIndex(p=> p.id == id);
myData.workExpiriences.splice(index,1);
element.remove();       
createWorkExpiriencesElementForShowField(myData.workExpiriences);
}

//-------------------------------------------------
let socialMediasEditId=0;
function createSocialMediasElementForShowField(socialMedias){
    let text = "";
    for (let social of socialMedias) {
        text += `
     <li title="${social.title}">
     <a href="${social.link}" target="_blank"> <i class="${social.icon} social-media"></i></a>
      </li>
            `
    }
    document.getElementById("social-medias").innerHTML = text;
}
function setMySocialMedias(socialMedias)
{
    createSocialMediasElementForShowField(socialMedias);
    let editText="";
    for(let social of socialMedias)
    {
        socialMediasEditId++;
        editText+=getSocialMediasEditFormDivField(social);
       
        document.getElementById("socialMedias-div").innerHTML = editText;
    }
}
function getSocialMediasEditFormDivField(socialMedias){
    
    return `
    <div id="socialMediasEditDiv${socialMediasEditId}" data-id="${socialMedias.id}" class="form-group">
    <label for="socialMediasInput">Title</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'title','socialMedias')" type="text" id="socialMediasInput${socialMediasEditId}" data-id="${socialMedias.id}" value="${socialMedias.title}"> 
    <label for="socialMediasInput">Link</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'link','socialMedias')" type="text" id="socialMediasInput${socialMediasEditId}" data-id="${socialMedias.id}" value="${socialMedias.link}"> 
    <label for="socialMediasInput">Icon</label>
    <input onkeyup="keyupGetAndSetInputValue(event,'icon','socialMedias')" type="text" id="socialMediasInput${socialMediasEditId}" data-id="${socialMedias.id}" value="${socialMedias.icon}"> 
    <button class="btn" onclick="removeSocialMediasForEditForm('socialMediasEditDiv${socialMediasEditId}')">Clear</button>
</div>  
    `

}
function createSocialMediasEditFormDivField(){
    socialMediasEditId++;
    const socialMedias = {id:socialMediasEditId,title:"",link:"",icon:""};
    myData.socialMedias.push(socialMedias)
    const text = getSocialMediasEditFormDivField(socialMedias);
    document.getElementById("socialMedias-div").innerHTML += text;
    createSocialMediasElementForShowField(myData.socialMedias);
}
function removeSocialMediasForEditForm(elementId){ 
const element= document.getElementById(elementId);    
const id=element.dataset["id"];
const index = myData.socialMedias.findIndex(p=> p.id == id);
myData.socialMedias.splice(index,1);
element.remove();       
createSocialMediasElementForShowField(myData.socialMedias);
}




















//-----------------Keyup
function keyupGetAndSetInputValue(event,name,objectName){
    const element = event.target;
    const id = element.dataset["id"];
    const index = myData[objectName].findIndex(item => item.id == id);

    if (index !== -1) {
        myData[objectName][index][name] = element.value;
        if (objectName === "skills") {
            createSkillElementForShowField(myData.skills);
        } else if (objectName === "language") {
            createLanguageElementForShowField(myData.language);
        } else if (objectName === "reference") {
            createReferenceElementForShowField(myData.reference);
        } else if (objectName === "certificate") {
            createCertificateElementForShowField(myData.certificate);
        } else if (objectName === "educations") {
            createEducationsElementForShowField(myData.educations);
        }else if (objectName === "workExpiriences") {
            createWorkExpiriencesElementForShowField(myData.workExpiriences);
        }else if (objectName === "socialMedias") {
            createSocialMediasElementForShowField(myData.socialMedias);
            
        }
        
    }
    
}





// let skillsElementId=1;

// function addSkill() {
//     skillsElementId++
//     const value = `
//     <div class="div-skills">
//      <li id="liSkill-${skillsElementId}">
//        <p>C# <button onclick="removeSkill('liSkill-${skillsElementId}')">-</button></p>

//       </li>
//      </div>
//     `
//     document.getElementById("skills").innerHTML += value;
// }

function printPage() {
    window.print();
}

function removeSkill(id) {
    document.getElementById(id).remove();
}