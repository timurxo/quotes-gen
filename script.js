// assign html elements (id) to variables
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote 
function newQuote() {
    loading();
    // piack a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // if author is blank
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // reduce font size for long quotes
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}


// --- get quote from API ---
// asynce - promise based code as if it were synchronous, but without blocking the execution thread
async function getQuotes() {

    loading();

    const apiUrl = 'https://type.fit/api/quotes';

    try {

        // here const's won't be set until data is fetched
        // --> decalare var only when we have actual data
        const response = await fetch(apiUrl);
        // turn response into json
        apiQuotes = await response.json();

        // console.log(apiQuotes[12]); // get 1 quote
        newQuote();
       
    } catch(error) {
        // get new quote
        // getQuotes();
        
    }
}

// tweet quote
function tweetQuote() {
    // add query with ?
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // open new tab (_blank)
    window.open(twitterUrl, '_blank');
}

// event listeners - run functions anytime they're clicked    
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();