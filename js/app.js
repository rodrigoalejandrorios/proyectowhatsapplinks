//VARIABLES DE LLAMADA AL D.O.M
let formMsj = document.getElementById("mensaje")
let submit = document.getElementById("submit")
let formNumber = document.getElementById("formNumber")
let boxLink = document.getElementById("boxLink")
let introLink = document.getElementById("linkadd")
let inputtext = document.getElementById("textin")
let copyBtn = document.getElementById("copybtn")
let emojiDropBtn = document.getElementById("emojiActive")
let emojiLabel = document.getElementById("formEmoji")
let chekedIn = document.getElementById("checked")

chekedIn.addEventListener("click",()=>{
  if(chekedIn.checked === true){
    emojiDropBtn.setAttribute("src", "images/lengua.svg")
  }else{
    emojiDropBtn.setAttribute("src", "images/ojos-cerrado.svg")
  }
})

//text
disText = document.getElementById("disText")
enText = document.getElementById("enText")

boxLink.style.display = "none"

//VARIABLES DINAMICAS

let esp = " ";
let textInput = "";
let textInclude= "";
let numberPhone = "";

//VARIABLES LINKS

const linkInicio = "https://api.whatsapp.com/send?phone="
const ancle = "&text="

writtenMsj =(n,q)=>{
  numberPhone = n.value
  textInput = q.value
  if(textInput.includes(esp)){
    textInclude = textInput.split(' ').join('%20');
  }else{
    textInclude = textInput
  }

  return(numberPhone+ancle+textInclude)
}


copiar=(text)=>{
  var aux = document.createElement("input");
  aux.setAttribute("value", text);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}



submit.addEventListener("click",(e)=>{
    e.preventDefault()
    let msj = writtenMsj(formNumber, formMsj)
    let link = linkInicio + msj
    boxLink.style.display = "grid"
    inputtext.setAttribute("value", link)
    
    copyBtn.addEventListener("click",(u)=>{
      u.preventDefault()
      copiar(link)

      //ESTILOS VARIABLES
      copyBtn.style.background= "#353535"
      disText.style.top = "-100px";
      enText.style.top = "-10px";

      //ESTILOS NORMALES
      setTimeout(()=>{
        disText.style.top = "11px";
        enText.style.top = "100px";
        copyBtn.style.background= "#0081C8"
      },2000)
    })
})


//----SECCION EMOJIS------//
//API EMOJI

const url = 'https://emoji-api.com/emojis'
const apikey = 'access_key=a6793c8493a8d42fad850e939240e30708c818d4';
const searchAncle = '?search='



let emojiSearch = document.getElementById("searchEmoji")

let valueInit = 0



let emojis = ()=>{
    let urlEmoji = `${url}?${apikey}`;
    
    fetch(urlEmoji)
    .then(response => response.json())
    .then(data =>{

        emojiBox.innerHTML = ""
        //BUSCADOR DE EMOJI

        for(i=0; i< data.length; i++){
            let listEmoji = document.createElement("li")
            listEmoji.innerHTML = data[i].character
            let emojiValue = data[i].character
            
            listEmoji.addEventListener("click",()=>{
                formMsj.value += emojiValue
            })
            emojiBox.appendChild(listEmoji)

        }


    }).catch((e)=>{
      console.log("Tienes un error: "+e)
    })
}

//VALIDACIÓN DE DATOS




let buscarEmojis = (e) =>{
  e.addEventListener("input", ()=>{
    let param = e.value
    let urlSearch = `${url}${searchAncle}${param}&${apikey}`;
    valueInit = e.value.length
    //console.log(urlSearch)
    fetch(urlSearch)
    .then(res => res.json())
    .then(data => {
    //console.log(data)

    emojiBox.innerHTML = ""

    for(i=0; i< data.length; i++){
      //console.log(data[i].character)
      let listEmoji = document.createElement("li")
      listEmoji.innerHTML = data[i].character
      let emojiValue = data[i].character
      listEmoji.addEventListener("click",()=>{
          formMsj.value += emojiValue
          emojiSearch.value = ""
          emojis()

      })
      emojiBox.appendChild(listEmoji)
  }

 


    }).catch(err => console.log("El error es: "+ err.message))
  })
  
}

if((valueInit)===0){
  emojis()
}


buscarEmojis(emojiSearch)




