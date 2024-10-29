const APIURL ="https://api.github.com/users/";
const main= document.querySelector("#main");
const sreachbox= document.querySelector("#search")
const getuser = async(username)=>{
    try{
 const responce = await fetch(APIURL + username);
 const data= await responce.json()
 renderUserCard(data);
 getRepos(username);
    }catch(error){
        console.error(error);
    }
};
const renderUserCard=(data)=>{
 const card= `
   <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="florin pop">
            </div>
            <div class="user-info">

                <h2>${data.name || "Unknown"}</h2>
                <p>${data.Bio ||"No Bio avalible"}</p>
                <ul class="info">
                    <li>${data.followers}<strong>followers</strong></li>
                    <li>${data.following}<strong>following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos">
                  
                </div>
            </div>
        </div>
 `;
 main.innerHTML=card;
 //getRepos(username);
}
//init call
 getuser("taylorotwell")

const getRepos= async (username)=>{
    try{
    const Repos= document.querySelector("#repos")
    const responce= await fetch(APIURL+username+"/repos")
    const data= await responce.json()
    data.forEach((item) => {
            const elem= document.createElement("a")
            elem.classList.add("repo")
            elem.href=item.html_url;
            elem.innerText=item.name;
            elem.target="_blank";
            Repos.appendChild(elem);
        }
    );
} catch(error){
    console.error(error);
}
};
const handlesubmit = (event)=>{
    event.preventDefault();
    const username=searchbox.value.trim();
    if(username){
        getuser(username);
        searchbox.value="";
    }else{
        console.error("please enter a username!");
    }
};
const forSubmit=()=>{
    if(sreachbox.value != ""){
        getuser(sreachbox.value);
        sreachbox.value="";
    }
    return false;
}

sreachbox.addEventListener(
    "focusout",
    handlesubmit
);
