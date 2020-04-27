import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import './index.css';

class Square extends React.Component {
    
    render() {
      
      if (this.props.value === "*")
      {
        return (
          <button className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
          </button>
        );
      }
      else
      {
        /*
        return (
          <input className="square" type="image" id="image" alt="" height="80" width="80"
        src={require('./' + this.imageMap[this.props.value] + '.jpg')}></input>
        );
        */
        return ( 
          <input className="square" type="image" id="image" alt="" 
        src={require('./' + this.props.value + '.jpg')}></input>
        );
      }
      /*
      
      */
    }
  }
  
  class Board extends React.Component {

    baseArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10] //,11 ,11,12,12]

    

    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element. 
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }
    

    constructor(props)
    {
      super(props);

      var squares = this.shuffle(this.baseArray);
      var squareStates = Array(20).fill(false)

      this.state = {
        squares: squares,
        squareStates : squareStates,
        started: false,
        currentlySelectedIndex : null,
        currentNumTurns : 0,
        game: "peppa",
        allowClick : true
      };

      this.toggleStartStop = this.toggleStartStop.bind(this);
    }

    handleClick(i) 
    {
     // const squares = this.state.squares.slice();

      if (!this.state.started)
      {
        this.setState(
          {
            started : true
          }
        )
      }

      if (!this.state.allowClick)
      {  
        return
      }

      const squareStates = this.state.squareStates.slice();

      // if this square is already revaled, nothing doing
      if (squareStates[i])
        return;

      // have we selected a square?
      if (this.state.currentlySelectedIndex != null)
      {
          if (i === this.state.currentlySelectedIndex)
          {
            return;
          }

          squareStates[i] = true

          // need to show the card then turn them back over after a second .. and disable any update until then  .. 
          

          // ok does the value match or not?
          if (this.state.squares[i] !== this.state.squares[this.state.currentlySelectedIndex])
          {
            this.setState({
              squareStates : squareStates,
              allowClick : false
            })
            // leave both as revealed
            // and within 0.5 seconds hide them again
            var update = () => {
              squareStates[i] = false
              squareStates[this.state.currentlySelectedIndex] = false
              
              this.setState({
                currentNumTurns : this.state.currentNumTurns + 1,
                currentlySelectedIndex : null,
                squareStates : squareStates,
                allowClick : true
              })  
            }
    
            setTimeout(update, 300)
          }
          else{
            this.setState({
              squareStates : squareStates,
              currentlySelectedIndex : null,
              allowClick : true
            })
          }
          
          
      }
      else // only select if not already revelealed
      {
        squareStates[i] = true

        this.setState({
          currentlySelectedIndex : i,
          squareStates : squareStates
        })
        
      }

      return;
        
    }
    
    
    renderSquare(i) {

      var valueStr = this.state.squareStates[i] ? this.state.game + this.state.squares[i] : "*"


      return <Square style={{
        backgroundColor: this.state.started ? '#000000' : '#cccccc',
      }}  value={valueStr} onClick={() => this.handleClick(i)} />;
    }

    chooseGame(gameName)
    {
      if (gameName !== this.state.game)
      {
        this.setState({
          game : gameName
        })
      }

      this.toggleStartStop();
    }

    renderGameToggle(gameName) {
        var active = this.state.game === gameName
        return <Button variant="secondary" active={active} onClick={() => this.chooseGame(gameName)}>{gameName}</Button>
    }

    toggleStartStop()
    {
      var squares = this.shuffle(this.baseArray);
      var squareStates = Array(20).fill(false)

      this.setState ({
        squares: squares,
        squareStates : squareStates,
        started: false,
        currentlySelectedIndex : null,
        currentNumTurns : 0,
        allowClick : true
      });
    
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }
  
    render() {
  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
          </div>
          <div className="board-row">
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
          </div>
          <div className="board-row">
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            {this.renderSquare(15)}
          </div>
          <div className="board-row">
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
          </div>
          <div align="center">
            <br/>
            <button height="200px" onClick={this.toggleStartStop} disabled={!this.state.started}>Restart</button>
            &nbsp;
            <br/><br/>
            Number Of Turns : {this.state.currentNumTurns}
            <br/><br/>
            <ButtonGroup className="mr-2">
              {this.renderGameToggle("peppa")}
              {this.renderGameToggle("superwings")}
            </ButtonGroup>
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
  