import React from 'react';
import ReactDOM from 'react-dom';
import Speech from 'speak-tts';
import './index.css';

class Square extends React.Component {
  
  numberList = [0,1,2,3,4,5,6,7,8,9,10];
  lowercaseLetterList = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  nameList = ["Anoushka", "Viraj", "Mummy", "Daddy", "Amit", "Krupa", "Baba", "Dadi", "Anjali", "Arjan", "Chacha", "Chachi", "Nana", "Mama", "Mami", "Kitty"]
  speech = new Speech()

  constructor(props) {
    super(props);
    
    this.state = { Letter: "A" };
    this.handleClick = this.handleClick.bind(this);
    this.speech.init();
  }

  handleClick()
  {
    var letter = "";
    var modifier = "";

    switch(Math.floor(Math.random() * 4))
    {
      case 0:
        letter = this.numberList[Math.floor(Math.random() * this.numberList.length)].toString()
        break;
      case 1:
        letter = this.lowercaseLetterList[Math.floor(Math.random() * this.lowercaseLetterList.length)].toString()
        modifier = "small ";
        break;
      case 2:
        letter = this.lowercaseLetterList[Math.floor(Math.random() * this.lowercaseLetterList.length)].toUpperCase().toString()
        modifier = "big ";
        break;
      case 3:
        letter = this.nameList[Math.floor(Math.random() * this.nameList.length)].toString()
        break;
      default:

    }

    this.setState(state => ({
      Letter : letter
    }));

    this.speech.speak({text:"Find " + modifier + letter})
  }
  
  render() {
      return (
        <div>
          <button className="square" onClick={this.handleClick}>
            {this.state.Letter}
          </button>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Square />,
    document.getElementById('root')
  );
  