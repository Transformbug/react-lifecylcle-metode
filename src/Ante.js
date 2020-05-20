import React, { Component } from 'react'

export class Ante extends Component {

  //VAŽNO: Ovdje se skorz doli nalazi componentWillUnmount.
  //VAŽNO: Creation lifecycle faza se još može zvati mounting faza, update je je upadate, dok kad mičemo neki element iz dom-a onda je to un-mounting.
  
   
    constructor(props) {
        super(props)
        console.log('Ante.js, Constructor')
      }

      componentDidMount() {
        console.log('Ante.js, componentDidMount'); 
        }


  static getDerivedStateFromProps(props, state) {
        console.log('Ante.js, getDerivedStateFromProps');
      
        return state;
      }

     state={
         key: 'Kada je cijeli ovaj state iskomeniran onda je nextState null i izbaci nam upozorenje za getDerivedState,gornju metodu'
     
     } 

    shouldComponentUpdate(nextProps, nextState) {
      console.log('Ante.js, shouldComponentUpadate');
        return true;
    }  



  getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Ante.js, getSnapShotBeforeUpadate')
        return null; 
    }

   componentDidUpdate() {
       console.log('Ante.js, componentDidUpadate metoda')
   } 

  
    
   render() {
     let style={color: 'red', border: 'solid red 1px'}

        console.log('Ante.js, render metoda')
        return (
            <div style={style} onClick={this.props.ukloniAntu}>
                 Klikini na ovo da se makne sa ekrena, btw. ovo je u Ante.js
            </div>
        )
    }

    componentWillUnmount() {
      //VAŽNO: kada se aktivira ovaj gori onClick koji makne ovu kompoonetu ante sa DOM-a samo će ova lifecycle metoda aktivirati unutar Ante.js
      //VAŽNO: biti se izvršena točno prije componentDidUpdate svoga parent element tj. komponete koje importa Ante.js i koristi Ante komponentu unutar jsx returna.
      console.log('Ante.js, componentWillUnmount');
    }
}

export default Ante
