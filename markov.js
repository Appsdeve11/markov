class MarkovMachine {
    
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter((c) => c !== "");
      this.makeChains();
    }
  
    /** set markov chains */
    makeChains() {
      this.chains = {};
  
      for (let i = 0; i < this.words.length - 1; i++) {
        let word = this.words[i];
        let nextWord = this.words[i + 1];
  
        if (this.chains[word]) {
          this.chains[word].push(nextWord);
        } else {
          this.chains[word] = [nextWord];
        }
      }
  
      // Handle the last word in the text
      let lastWord = this.words[this.words.length - 1];
      if (this.chains[lastWord]) {
        this.chains[lastWord].push(null);
      } else {
        this.chains[lastWord] = [null];
      }
    }
  
    /** return random text from chains */
    makeText(numWords = 100) {
      let words = [];
      let word = this.words[Math.floor(Math.random() * this.words.length)];
  
      while (words.length < numWords && word !== null) {
        words.push(word);
        let nextWords = this.chains[word];
        word = nextWords[Math.floor(Math.random() * nextWords.length)];
      }
  
      return words.join(" ");
    }
  }