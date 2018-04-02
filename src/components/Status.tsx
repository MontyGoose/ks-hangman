import * as React from "react";

interface IStatus {
  lives: number;
  status?: string;
  err?: string;
}


export interface StatusProps { status : IStatus, word: string}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Status extends React.Component<StatusProps, {}> {

    livesLeft() {
      return  <h2>Lives : {this.props.status.lives}</h2>;
    }

    gameOver() {
      return <div><h2>GAME OVER</h2><h3>The word was : {this.props.word}</h3></div>;
    }
    render() {
        return <div className="wrapper">
        {this.props.status.lives > 0 ? (
          this.livesLeft()
        ) : (
          this.gameOver()
        )}
          </div>;
    }
}
