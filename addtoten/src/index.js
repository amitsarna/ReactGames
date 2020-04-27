import React from 'react';
import ReactDOM from 'react-dom';
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
    
    constructor(props)
    {
      super(props);

      // var squares = Array(25).fill(null);

      // for (var i = 0; i < 25; ++i)
      // {
      //   var newword = ""; 
      //   while(true)
      // {
      //   const rand = Math.floor(Math.random() * this.originalWordList.length);
      //   const word = this.originalWordList[rand];
      //   if (!squares.includes(word))
      //   {
      //     newword = word;
      //     break;
      //   }
      // }

      // squares[i] = newword;
      // }

      this.state = {
        started: false,
        currentScore : 0,
        numbers : []
      };

      this.toggleStartStop = this.toggleStartStop.bind(this);
    }

    handleClick(i) 
    {
      const numbers = this.state.numbers.slice()

      if (numbers.length === 0)
        return

      var head = numbers[0]
      
      if (i === (10 - head) )
      {
        numbers.shift()
        this.setState({
          numbers: numbers,
          currentScore: this.state.currentScore + 1
        })
      }
    }
    

    renderSquare(i) {
      //return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
      return <Square value={i} onClick={() => this.handleClick(i)} />;
    }

    toggleStartStop()
    {
      if (this.state.started)
      {
        this.setState({
          started: false,
          numbers : []
        })

      }
      else
      {
        // const squares = this.state.squares.slice();
        // var word = squares[Math.floor(Math.random() * 25)]
        // var endTime = Date.now() + 60000

        var firstNumber = [Math.ceil(Math.random() * 9)]

        this.setState({
          started: true,
          currentScore : 0,
          startTime : Date.now(),
          numbers : firstNumber
        })

        var interval = 1000;

        var update = () => {
          var numbers = this.state.numbers.slice()

          if (!this.state.started)
            return

          if (numbers.length > 9)
          {
            this.toggleStartStop()
          }
          else
          {
            numbers.push(Math.ceil(Math.random() * 9))
            this.setState({
              numbers : numbers
            })
            interval = Math.max(10, 2000 - (this.state.currentScore * 2))
            setTimeout(update, interval)
          }
        }

        setTimeout(update, interval)
      }
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }
  
    render() {
  
      var buttonText = this.state.started ? "Stop" : "Start";

      var numbers = this.state.numbers.slice()

      var numberString = this.state.started ? numbers.join(",") : "Press Start .."

      return (
        <div align="center">
          <h1 align="center">AddToTen</h1>
          <div align="right">
            {numberString}
            <br/><br/>
          </div>
          <div className="board-row">
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
          <div align="center">
            <br/>
            <button height="200px" onClick={this.toggleStartStop}>{buttonText}</button>
            <br/><br/>
            Score : {this.state.currentScore}
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
  