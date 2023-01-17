let page = document.body.id
let theliked = JSON.parse(localStorage.getItem('theLiked')) || []
let theLiked = []
for(let i=0; i<theliked.length;i++){
    if(theliked[i] !== null){
        theLiked.push(theliked[i])
    }
}
let thePages = ['home','nature', 'unesco','history']
window.addEventListener('DOMContentLoaded',()=>{
    switch(page){
        case 'favorite':
            setSrc()
            downloadImg()
            removeImg()
            sharePic()
        case 'login':
            signup()
            signUpPage()
            
        default:
            getSrc()
            downloadImg()    
            dblClkLike()
            sharePic()
            
    }
    
})
function login(){
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    if(email.value && password.value){
        //window.location.href = "src/home.html"
        window.open("src/home.html", "_self")
        alert("wel come")
    }else{
        alert('enter credential')
    }
    
}

function signup(){

    let theSignUp = document.createElement("div")
        theSignUp.classList = "recievers done"
        theSignUp.innerHTML = `
            <div class="recieve-block">
                <form>
                <div class="form-container">
                    <div>
                    <label for="fname">First Name: </label>
                    <input id="fname" type="text" />
                    </div>
                    <div>
                    <label for="lname">Last Name: </label>
                    <input id="lname" type="text" />
                    </div>
                    <div>
                    <label for="email2">email: </label>
                    <input id="email2" type="email" />
                    </div>
                    <div>
                    <label for="password2" >password: </label>
                    <input id="password2" type="password" />
                    </div>
                    <div>
                    <label for="conf-password" class="conf-pass" >confirm password: </label>
                    <input id="conf-password" type="password" />
                    </div>
                    </div>
                </form>
                <div class="but-cont">
                <button class="only-create" onclick="onlyCreate()">Create user</button>
                <button class="create-login" onclick="createLogin()">Create and login</button>
                </div>
            </div>
        `
      
        document.body.append(theSignUp)
    
}
function signUpPage(){
    let sign = document.querySelector(".sign-btn")
   
    sign.addEventListener("click", (e)=>{
        e.preventDefault()
        let thetarget = document.querySelector(".recievers")
        thetarget.classList.remove("done")
        thetarget.style.display = "block"
        
    })
}

function onlyCreate(){
    let thetarget = document.querySelector(".recievers")
    thetarget.classList.add("done")
    thetarget.style.display = "none"
    alert("succesfully created")
}

function createLogin(){
    let thetarget = document.querySelector(".recievers")
    thetarget.classList.add("done")
    //window.location.href = "src/home.html"
    window.open("src/home.html", "_self")
}

function getSrc(){
    let likeBtn = document.querySelectorAll(".like-btn")
       
    likeBtn.forEach(btn=>{
        let theImgSrc = ''
        btn.addEventListener('click',()=>{
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                btn.parentElement.style.opacity = 1
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
                btn.parentElement.style.opacity = 1
            }
            if(!theLiked.includes(theImgSrc)){
                theLiked.push(theImgSrc) 
            }
            
            localStorage.setItem('theLiked', JSON.stringify(theLiked))
            if (document.body.id !== 'favorite'){
                btn.classList.toggle('liked')
            }
            
        })
    })
}

const downloadImg = ()=>{
    let downBtn = document.querySelectorAll('.save-btn')
    downBtn.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            let theImgSrc = ''
            e.preventDefault()
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
            }
            fetchUrl(theImgSrc)
        })
    })

    
}
function fetchUrl(url){
    fetch(url).then(res=> res.blob()).then(picture=>{
        let tempUrl = URL.createObjectURL(picture)
        let thelink = document.createElement('a')
        thelink.href = tempUrl
        thelink.download = `filename${url}`
       document.body.appendChild(thelink)
        thelink.click()
        thelink.remove()
    })
}

function setSrc(){
    let theImages = document.getElementsByTagName("img")
    theImages = Array.from(theImages)
    let theliked = JSON.parse(localStorage.getItem('theLiked')) || []
    let theLiked = []
    for(let i=0; i<theliked.length;i++){
    if(theliked[i] !== null){
        theLiked.push(theliked[i])
    }
    }

    console.log("the length " + theLiked.length)
    let trackList = theLiked.length - 1
    for (let itBe = 2; itBe<theImages.length; itBe++){
        console.log(theLiked[trackList])
        theImages[itBe].src = (theLiked[trackList] !== null ? theLiked[trackList]:"./images/nature3.jpg")
       
        if(trackList == 0){
            trackList = theLiked.length - 1
        }else{
            trackList--;
        }
       
    }

    theContent = ``
    for(let remain = trackList; trackList >= 0; trackList--){
        theContent = theContent + `
        <div class="third-pic-btn ">
        <img src="${theLiked[remain] !== null ? theLiked[remain] : "./image/int-2.jpg"}" alt="favorite-pic-6">
        <div class="third-btn-cont">
          <button class="save-btn"><i class="fa fa-download"></i></button>
            <button class="share-btn"><i class="fa fa-share"></i></button>
            <button class="like-btn"><i class="fa fa-remove"></i></button>
        </div>
      </div>
        `
    }
    let theBodyContent = document.querySelector(".fav-sec-pic").innerHTML
    theBodyContent = theBodyContent + theContent  
}

const removeImg = () =>{
    let remvBtn = document.querySelectorAll('.like-btn')
    theLiked = JSON.parse(localStorage.getItem("theLiked")) || []
    remvBtn.forEach(btn=>{
        let theImgSrc = ''
        btn.addEventListener('click',()=>{
            
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                btn.parentElement.style.opacity = 0
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
                
            }
            
            // const theliked = theLiked.filter(ele=>{
            //     return ele !== theImgSrc
            // })
            const thelikeds = []
            for(let i=0; i< theLiked.length;i++){
                if (theLiked[i] !== theImgSrc && theLiked !== null){
                    thelikeds.push(theLiked[i])
                }
            }
            
            localStorage.setItem('theLiked', JSON.stringify(thelikeds))
            setSrc()
           
        })
    })

}
const showSideMenu = ()=>{
    const theDiv = document.querySelector('.side-menus')
    theDiv.style.display = "block"
}
const hideMenus = () =>{
    const theDiv = document.querySelector('.side-menus')
    theDiv.style.display = "none"
}

const dblClkLike = () =>{
    let theImages = document.getElementsByTagName("img")
    let theLiked = JSON.parse(localStorage.getItem("theLiked")) || [] 
    theImages = Array.from(theImages)
    theImages.forEach(imag=>{
        imag.ondblclick = function(){
            theLiked.push(imag.getAttribute('src'))
            console.log(imag.getAttribute('src'))
            imag.nextElementSibling.classList.value =  "third-btn-cont liked"
            localStorage.setItem('theLiked', JSON.stringify(theLiked))
        }
        
    })
    
}

function sharePic(){
    let shareBtn = document.querySelectorAll(".share-btn")
    shareBtn.forEach(btn=>{
        let theImgSrc = ''
        btn.addEventListener('click',()=>{
            
            if(btn.parentElement.previousElementSibling){
                theImgSrc = btn.parentElement.previousElementSibling.getAttribute("src")
                
            }else{
                theImgSrc = btn.parentElement.firstElementChild.getAttribute("src")
                
            }
            let theRecieve = document.createElement('div')
            theRecieve.classList = "recievers"
            theRecieve.innerHTML = `
            <div class="recieve-block">
                <ul>
                    <li>
                    <img src="./image/pp.png"/>
                    somebody@gmail.com
                    <input type="checkbox"/>
                    </li>
                    <li>
                    <img src="./image/pp.png"/>
                    yourfriend@gmail.com
                    <input type="checkbox"/>
                    </li>
                    <li>
                    <img src="./image/pp.png"/>
                    somebody@gmail.com
                    <input type="checkbox"/>
                    </li>
                    <li>
                    <img src="./image/pp.png"/>
                    somebody@gmail.com
                    <input type="checkbox"/>
                    </li>
                </ul>
                <div>
                <button id="sent" onclick="hidereciver()" class="sent">send</button>
                <button class="cancelled" onclick="hidereciver()">cancel</button>
                </div>
                </div>
            `
           
            document.body.appendChild(theRecieve)
           
        })
    })
    
   
}function hidereciver(){
    let sentBox = document.querySelector(".recievers")
    sentBox.classList.add("done")
    hidereciverblock()
}
 
function hidereciverblock(){
    let theRecive = document.querySelector(".reciever-block")
    theRecive.classList.add("add")
    
}

function sendFeed(){
    let theFeed = document.getElementById('feedback')
    let theSendBtn = document.getElementById('send-feed')
    let theSuccess = document.querySelector('.the-success')
    theSendBtn.addEventListener('click',()=>{
        
        if(theFeed.value){
            theSuccess.style.display = 'block'
            
        }else{
            theFeed.placeholder = 'please write your thought'
            
        }
    })
}

