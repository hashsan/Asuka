var Asuka ={}
Asuka.data={}
Asuka.log=[]
Asuka.stock=(ask,key,value)=>{  
  //
  Asuka.data[key] = value
  const timestamp = Date.now()
  const d = {ask,key,value,timestamp}
  //console.log('log data >',d)
  Asuka.log.push(d)
  return Asuka.data
}
Asuka.input=(ask,key)=>{return new Promise(sol=>{
  Asuka._boot()
  
  Asuka._pointernone(true) ////
  
  const id =Asuka._rid()
  key = key||id
  ///
  const el = Asuka._make(ask,key,id)
  const input = document.getElementById(id)
  input.onkeydown = e =>{
    if(!(e.which === 13))return
    const value = input.value
    Asuka.stock(ask,key,value)
    el.remove()
    
    Asuka._pointernone(false) ////    
    
    sol(value)
  }
  ///
})}
Asuka._rid=()=>Math.random().toString(36).slice(2).padEnd(12,'x');
Asuka._make=(ask,key,id)=>{
  const temp=`
  <div id="Asuka">
   <p class="ask">${ask}</p>
   <input type="text" class="ans" id="${id}">
  </div>
  `.trim()
  const el = document.createElement('div')
  el.innerHTML=temp
  document.body.append(el)
  return el
}
Asuka._boot=()=>{
  const temp=`
#Asuka{
  min-width:200px;
  width:50vw;
  max-width:400px;  
  background:whitesmoke;
  display:flex;
  flex-direction:column;
  box-sizing:border-box;
  padding:0.5rem;

  position:fixed;
  top:16px;
  right:16px;
  
  pointer-events:all;
}
#Asuka *{
  width:auto;  
  box-sizing:border-box;  
} 
.pointer-none{
  pointer-events:none;
}
  `
  const boot ='.Asuka-booted'
  const el = document.querySelector(boot)
  //console.log(el)
  if(el) return
  document.body.classList.add(boot)
  //console.log('in')
  const style =document.createElement('style')
  style.innerHTML = temp
  document.head.append(style)
  return style;
}

Asuka._pointernone=(flg)=>{
  const cls ='pointer-none'
  if(flg){
    return document.body.classList.add(cls)
  }
  return document.body.classList.remove(cls)
}

window.Asuka = Asuka;
