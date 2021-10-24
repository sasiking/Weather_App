console.log("Client SIde Java Script")

const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('.message1')
const message2 = document.querySelector('.message2')


form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value
    const url = "/weather?address=" + encodeURIComponent(location)
    message1.textContent = 'Loading..'
    message2.textContent = ''

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            message1.textContent = data.error
            else{
                message2.textContent = data.Weather_Forcast
                message1.textContent = "Location:" + data.location
            }
        })
    })
    console.log("Form Submitted with address",location)
})
