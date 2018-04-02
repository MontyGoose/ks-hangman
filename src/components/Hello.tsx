import * as React from "react";

export interface HelloProps { who: string}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <div className="wrapper">
          <h1>Welcome to Hangman!</h1>
          <h2>Hello {this.props.who}</h2>
          <p>Use the alphabet below to guess the word.</p>
          </div>;
    }
}
