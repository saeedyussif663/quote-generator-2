const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newquote');
const loader = document.getElementById('loader');

let apiQuote = []

// Show Loader 
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader 
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuotes() {
    showLoadingSpinner();
    // Pick a random number from the quotes array
    const quote = apiQuote[Math.floor (Math.random() * apiQuote.length)]
    if (quoteText.length > 120) {
        quoteText.classList.add('long-quote')
    } else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    if(!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author
        removeLoadingSpinner();
    }
     
}


// Generate your quotes
async function getApiQuotes() {
    showLoadingSpinner() ;
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl)
        apiQuote = await response.json()
        newQuotes()
    } catch (error) {
        // Deal with prospective error here.
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl =  `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent};`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuotes)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getApiQuotes()
