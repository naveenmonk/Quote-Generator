const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const copyBtn = document.getElementById('copy')
const loader = document.getElementById('loader');
let apiResponse = []



const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const loadingComplete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const newQuote = () => {
    const singleQuote = apiResponse [Math.floor(Math.random() * apiResponse.length)];
    loading();
    console.log(singleQuote);
    if(!singleQuote.author){
        authorText.textContent = 'Yaruku theriyum'
    }else{
         authorText.textContent = ` - ${singleQuote.author} `
    }
    if(singleQuote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = singleQuote.text;
    loadingComplete();
}

const getquote = async () => {
    try {
        loading();
        const apiUrl = 'https://type.fit/api/quotes'
        const response = await fetch(apiUrl);
        apiResponse = await response.json();
        console.log(response);
        newQuote();
    } 
    catch(error){
        console.log(error);        
    }
}


const tweet = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}&hashtags=NaveenMonk`;
    window.open(twitterUrl,'_blank');
} 

copyBtn.addEventListener('click',()=>{
    const textArea = document.createElement('textarea')
    const quote = quoteText.textContent;

    textArea.value = quote
    document.body.appendChild(textArea)
    textArea.select();
    document.execCommand('copy')
    textArea.remove();
    alert('Quote copied successfully')


})
twitterBtn.addEventListener('click',tweet)
newQuoteBtn.addEventListener('click',newQuote)

getquote();