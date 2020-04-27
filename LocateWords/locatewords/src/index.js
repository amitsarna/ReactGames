import React from 'react';
import ReactDOM from 'react-dom';
import Speech from 'speak-tts';
import './index.css';

class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    
    speech = new Speech()

    originalWordList =  ["put", "will", "little", "out", "him", "could", "have", "with", "don't", "had", "what", "one", "there", "but", 
          "very", "just", "back", "about", "come", "went", "for", "some", "made", "the", "and", "a", "to", "said", "all",
        "you", "me", "she", "come", "go", "of", "where", "was", "far", "away", "am", "we", "her", "they", "as", "be",
      "at", "not", "then"];
    
      

    constructor(props)
    {
      super(props);

      var squares = Array(25).fill(null);

      for (var i = 0; i < 25; ++i)
      {
        var newword = ""; 
        while(true)
      {
        const rand = Math.floor(Math.random() * this.originalWordList.length);
        const word = this.originalWordList[rand];
        if (!squares.includes(word))
        {
          newword = word;
          break;
        }
      }

      squares[i] = newword;
      }

      this.state = {
        squares: squares,
        started: false,
        currentWord : "",
        currentScore : 0,
        endTime : Date.now(),
        remaining : "0"
      };

      this.toggleStartStop = this.toggleStartStop.bind(this);
      this.repeatCurrentWord = this.repeatCurrentWord.bind(this);
      this.speech.init();
    }

    handleClick(i) 
    {
      const squares = this.state.squares.slice();
      
      // check if the word is the word we're looking for
      if (squares[i] === this.state.currentWord)
      {
        var newword = ""; 

        while(true)
        {
          const rand = Math.floor(Math.random() * this.originalWordList.length);
          const word = this.originalWordList[rand];
          if (!squares.includes(word))
          {
            newword = word;
            break;
          }
        }

        squares[i] = newword;

        var word = squares[Math.floor(Math.random() * 25)]
        var wordToSay = word.length === 2 ? word : word.toUpperCase(); 
        this.speech.speak({text: "Find " + wordToSay})

        this.setState(
          {
            squares: squares,
            currentScore: this.state.currentScore + 1,
            currentWord: word
          }
        );

        
      }
    }
    

    renderSquare(i) {
      return <Square style={{
        backgroundColor: this.state.started ? '#000000' : '#cccccc',
      }}  value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    repeatCurrentWord()
    {
      var wordToSay = this.state.currentWord.length === 2 ? this.state.currentWord : this.state.currentWord.toUpperCase(); 
      this.speech.speak({text: "Find " + wordToSay})
    }

    toggleStartStop()
    {
      if (this.state.started)
      {
        this.setState({
          started: false,
          currentWord: "",
          endTime : Date.now(),
          remaining : "0"
        })

        clearInterval(this.timer);
      }
      else
      {
        const squares = this.state.squares.slice();
        var word = squares[Math.floor(Math.random() * 25)]
        var endTime = Date.now() + 60000
        this.speech.speak({text: "Find " + word.toUpperCase()})

        this.setState({
          started: true,
          currentScore: 0,
          currentWord: word,
          endTime : endTime
        })

        

        this.timer = setInterval(() => {
          
          var diff = Math.ceil((this.state.endTime - Date.now()) / 1000);
          
          if (diff < 0)
          {
            this.toggleStartStop()
          }
          else
          {
            this.setState({
              remaining : diff
            })
          }

          
        });
      }
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }
  
    render() {
  
      var buttonText = this.state.started ? "Stop" : "Start";

      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
          </div>
          <div className="board-row">
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
          <div className="board-row">
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
          </div>
          <div className="board-row">
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
          </div>
          <div className="board-row">
            {this.renderSquare(20)}
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
          </div>
          <div align="center">
            <br/>
            <button height="200px" onClick={this.toggleStartStop}>{buttonText}</button>
            &nbsp;
            <button height="200px" onClick={this.repeatCurrentWord} disabled={!this.state.started}>Repeat Word</button>
            <br/><br/>
            Score : {this.state.currentScore}
            <br/><br/>
            {this.state.remaining} seconds left
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  