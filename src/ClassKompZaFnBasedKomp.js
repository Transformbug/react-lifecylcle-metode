import React, { Component } from 'react';

class ClassKompZaFnBasedKomp extends Component {
    
    //Postavljene metode su samo za mounting fazu tj. prvi render.Ovo komponetdu uvozimo unutar FnBasedKomp.js
    constructor(props) {
        super(props)
       
        console.log('ClassKompZaFnBasedKomp.js, Constructor')
      }
      
    state={
        bezveze: 'daNamNeIzbaciGlupoUpozornjeZaGetDerivedState'
    }

    static getDerivedStateFromProps(props, state) {
        console.log('ClassKompZaFnBasedKomp.js, getDerivedStateFromProps');
       
        return state;
      }


     componentDidMount(){
         console.log('ClassKompZaFnBasedKomp.js, componentDidMount');
     }

    render() {
        console.log('ClassKompZaFnBasedKomp.js,render metoda');
        return (
            <div>
                Ovo služi da testirramo što se događa kad se ova class based komponeta returna unutar FnBasedKomp.js
            </div>
        );
    }
}

export default ClassKompZaFnBasedKomp;