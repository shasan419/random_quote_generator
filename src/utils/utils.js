var stringSimilarity = require("string-similarity");

function getSimilarQuote(singleQuote, allQuotes) {
  const newAllQuotes = allQuotes.map((x) => {
    return x.text;
  });
  let quoteIndex = newAllQuotes.indexOf(singleQuote);
  newAllQuotes.splice(quoteIndex, 1);
  let matches = stringSimilarity.findBestMatch(singleQuote, newAllQuotes);
  // console.log(matches);
  let matchingQuoteString = matches.bestMatch.target;
  const matchingQuote = allQuotes.filter((x) => x.text === matchingQuoteString);
  return matchingQuote;
}

function getDifferentQuote(singleQuote, allQuotes) {
  const newAllQuotes = allQuotes.map((x) => {
    return x.text;
  });
  let quoteIndex = newAllQuotes.indexOf(singleQuote);
  newAllQuotes.splice(quoteIndex, 1);
  let matches = stringSimilarity.findBestMatch(singleQuote, newAllQuotes);
  // console.log(matches);
  let mostUnmatchedQuote = matches.ratings.sort((a, b) => {
    return a.rating - b.rating;
  })[0].target;
  const totalDiffQuote = allQuotes.filter((x) => x.text === mostUnmatchedQuote);
  return totalDiffQuote;
}

export { getSimilarQuote, getDifferentQuote };
