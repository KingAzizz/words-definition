const containerSection = document.getElementById('slider')
const wordRequested = document.getElementById('word-requested')
const containerhide = document.querySelector('.container')
const submitBtnEmail = document.getElementById('btn-submit')
const nextBtn = document.getElementById('next')
const span = document.getElementById('msg-success')
containerhide.style.display = 'none'


submitBtnEmail.addEventListener('click', (e) => {
    e.preventDefault()
    sendMail()
})

    
    const input = () => {
        
    let input = document.getElementById('input-word').value
        containerSection.innerHTML = " "
        
        getResult(input)
        
  
}


const getResult = (word) =>{
        
    fetch(`http://localhost:5000/info?word=${word}`)
.then(response => {
	response.json()
    .then((data) => {
        try{
            const result = data.entries['0'].lexemes['0']
            
            containerhide.style.display = 'flex'
            containerSection.innerHTML = '<div class="carousel-item active"></div>'
            result.senses.map(arr => {
                nextBtn.click()
                const div = document.createElement('div')
                div.classList.add('carousel-item')
                    div.classList.remove('active')
                    div.innerHTML = `<p class="definition">${arr.definition}</p>`;
                    containerSection.appendChild(div)
                
                
                
        });
        wordRequested.innerHTML = result.lemma
    }catch(error){wordRequested.innerHTML = "Sorry, No Results Has Been Found " , containerhide.style.display = 'none'}
       });
    }).catch(err => {console.error(err);});
}



const sendMail =async () =>{
    let emailInput =   document.getElementById('email').value
        let  msgInput =  document.getElementById('msg-input').value
     if(emailInput === "" && msgInput === ""){
        span.innerText = "Fields Required"
    }
    else{

        
        
        const emailinfo ={
            "email": emailInput,
            "text": msgInput
        }
        span.innerText = " "  
        await fetch('http://localhost:5000/send',{
            "method":"POST",
            "mode":'cors',
            "headers":{
                "content-type": "application/json",
            },
            
            body: JSON.stringify(emailinfo)
            
        }).then(res => res.json()).then(data => data).then(span.innerText = "message sucssesfly sent").catch(err  => console.error(err) )
    }
}
    
    