
/*fetch('http://localhost:3000/weather?address=!').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        console.log(data.Place)
        console.log(data.Weather)
    })
})*/

const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    const messageOne= document.querySelector('#message-1')
    const messageTwo= document.querySelector('#message-2')
    messageOne.textContent= 'Loading'
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent= data.error
        }
        else{
            
            console.log(data.Weather)
            messageOne.textContent= data.Place
            messageTwo.textContent= data.Weather

        }
      
    })
})
    
})