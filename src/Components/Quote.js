import React, { Component } from 'react'
import axios from 'axios'

class Quote extends Component {
    state = {
         quote: '',
         author: ''
      }

   componentDidMount() {
    let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    axios.get(url)
    .then(res => {
       let data = res.data.quotes
       let quoteNum = Math.floor(Math.random() * data.length)
       let randomQuote = data[quoteNum]

       this.setState({
          quote: randomQuote['quote'],
          author: randomQuote['author']
       })
    })
   }

   render() {
      const { quote, author } = this.state 
      return (
         <div>
               <div><p>{quote}</p></div>
               <div><h5>{author}</h5></div>
         </div>
      )
   }
}

export default Quote;