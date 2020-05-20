import React, { Component } from 'react';
import Mate from './Mate'
import FnBasedKomp from './FnBasedKomp'




class App extends Component {
  // Napomena: Jedino je render obvezni lifecycle hook, pa ako se neke stvari ne odvijao baš po rasporedu u konzoli, stvar je vjerojatno u tome da
  // neka lifecylce hook uopće nije napisana.

  // VAŽNO: U App.js metode sam poredao kako se aktiviraju u creation lifecycle fazi, dok sam ih u Mate.js poredao kako se aktiviraju u update lifecyle fazi.
  // VAŽNO: Dodao sam i specifične metode za neku fazu u ova dvije komponete, ali te su lifycle hooks skroz na dnu
  // VAŽNO: naravno da ne moraju biti napisane po redu, da bi se izvršile po tom redoslijdu...
  // VAŽNO: Lifecycle hooks nemaju veze sa React hooks, te ih možemo zvati metode također...

constructor(props) {
  super(props)
  this.name='Ovo je početna vrijednost i služi da se testiramo što je nextProps i prveProps u metodama shouldComponetUpadate i getSnapShotbeforeUpadate'
  this.lastName='Ovo Je prvi PočetniValue Prop Objekta Koji Ide U FNbasedKomp.js '
  this.avionIme='ovo je drugi početni Value unuatr Prop objekta koje ide u FnbasedKomp'
  // Služi obično da se postavi state. Ovdje ne smijemo izazvati side-effecst. Znači slati http zahtjeve, spremnje nečega u local strage, slanje
  // nečega u google analytics.
  // To je prva metoda tj. lifecycle hook koja se aktivira u creation fazi lifecylce metoda.
  //Ne aktivira se kad se događa lifecylce update faza. 
  // btw. lifecycle hooks neamaju veze sa React hooks
  // Postoje samo u class based komponentama
  
  console.log('App.js, Constructor')
}


static getDerivedStateFromProps(props, state) {
  console.log('App.js, getDerivedStateFromProps');
  // console.log('getDerivetdState , ovo je props parametar',props)
  // console.log('getDerivetdState , ovo je state paramtera', state)
  // VAŽNO: Nema pristup keyword this, this je undefined. Druge metode imaju pristup i this bude ime komponente
  // console.log(this)
  //Druga se aktivira u lifecycle creation fazi, dok u lifecycle update fazi se aktivira prva.
  //Obvezna je keyword static ispred imena ove lifecycle hook.
  // Ova lifecycle hook se rijetko koristi, ni ovdje ne bi smjeli izazvati side-effects.
  //Moramo vratiti state objekt ili null.
  //VAŽNO: to ne znači da moramo vratiti ovaj parametar state nego samo neki objekt ili null koji može biti validna vrijednost state property neke komponente.
  return state;
}
  
  state = {
    prviKeyUnutarStateObjekta: 'orginalnaVrijednost',
    zaPropsKey: 'Value unutar state objekta u App.js'
  }

  promjeniStanje = () => {
    //this.name nije promjena stanja(neda mi se pisat novu metodu,a i treba testirat specifne update Lifecyle metode), vidi gori zašto nam služi...
    //btw. mijnjamo prop objekt za Mate.js
    this.name='novoValue this.name tj. jedna od vrijednost props objekta unutar Mate.js se promjenila'
    //mijenjamo prop objekt za FnBasedKomp.js
    this.lastName='nova Vrijedost Prop Objekta u FnBasedKomp'
    // ovo je promjena stanja
     this.setState({prviKeyUnutarStateObjekta: 'keyKojiJePostavio this.setState unutar App.js'});
  }

  render() {
    
    console.log('App.js, render metoda')
    //U lifecycle creation fazi ova metoda je treća po redu kao i u lifecycle upadate fazi.
    //I ovdje ne bi trebali izazivati sideeffects.
    //Ukoliko postoji neka komponenta unutar jsx koja se returna u ovoj metodi onda će se pokrenuti lifecyle creation ili upadate faza te komponete
    // prije nego što se završi lifecycle creation/update faza ove komponente.
    //Također ukoliko ta komponeta koja je napisana unutar jsx ovdje ima neku komponetu koju returna u svome renderu onda će se izvšiti i taj lifecycle.

    
    return (
      <div>
         <button onClick={this.promjeniStanje}>Botun unutar App.js koji mijenja stanje unutar App.js i vrijednosti koje ima props objekt unutar Mate.js</button>
         <p>{this.state.prviKeyUnutarStateObjekta}</p>
         {/* VAŽNO: i kad maknemo ovaj prop doli odvija se normalno redoslijed odvijanja lifecyle metoda u creation fazi i kada se promjeni state ovdje kada
         kliknemo na botun. Stoga ne vidim smisao u izjavi kada se prop value promjeni događa se re-render jer ako se negdje u app promjeni neki prop bez 
         da se negdje nije promjenio state onda se neće dogodit re-render dok kada se promjeni state u nekoj "parent" komponenti znamo da će se dogoditi
         re-render. Jedino je promjena state trigger za re-render, samo je pitanje jel se neka komponeta re-render jer se promjenio state property unutar 
         te komponente ili se promjenio state unutar nekog "parent elementa". Pod time(promjena state neke ancestor kom.) očito misle da prop change uzrokuje re-render.*/}
         
         <Mate nekiProp={this.state.zaPropsKey} jošJedanProp={this.name}/>
         {/* Note: nije bitno što ne korismo ovaj gori jošJedanProp unutar Mate.js bitno je da se cijeli props objekt untar Mate.js promjeni za naš test */}
        
         {/* VAŽNO: još jedan 'Mate' da ilustira zašto se neki se neki elementi i lifecycle hooks rendaju više puta. */}
         {/* VAŽNO: primjeti da se ante također zove kad je ovo aktivno više puta jer je to ante komponeta napisana unutar jsx Mate komponente, ali nije
         samo to zanimljivo. Također je redoslijed neočekivan u tom slučaju(creation phase). Pogledaj raspored dobro između Ante i Mate.Tek kad se obavila sva 
         četri constuructora,getDerivedStateFromProps, četri rendera se dogodio ComponentDidMount. Nije se dogodilo Mate 3-metode,Ante 4-metoda,onda na
         kraju mate compunetDidmount(bez App.js mislim) pa onda za ovaj doli element se to isto ponovi. */}
         {/* <Mate nekiProp={this.state.zaPropsKey}/> */}

         {/*JAKO VAŽNO: iskommentiraj ovdje ovaj FnBasedKomp, Ante kompnentu unutar Mate.js i uključi ovdje drugi <Mate/> najbolje će se tada vidjeti onaj 'neobičan' redoslijed */}
      
          <FnBasedKomp nekiProp={this.lastName} jošJedanProp={this.avionIme}/>
         
       
      </div>
    );
  }

 componentDidMount() {
   console.log('App.js, componentDidMount'); 
   //Ovo je zadnja tj. četvrta po redu lifecycle hook u creation fazi.Ne aktivira se u update lifecylce fazi.
   //Aktivra se tek kada kada završi lifecylce creation proces svih komponenti(i njihovih nasljednika) koje se returnaju u render metodi ovdje.
   // Služi nam da izazovemo side effetcs, znači ovdje treba napisati http requests, dodat nešto u local storage...
   //Ne smijemo ovdje mijenjati stanje naše komponente osim ako to ne napravimo na asyncrouns način, recimo unutar .then bloka nakon
   // što smo poslali http request koji returna promise.
   

   console.log('-------Kraj-Lifecycle-creation-faze(bez FnBasedKomp)--------')
   

  }

  
  //Za update fazu metode specifične metode
  //--------------------------------------------------------------------------------------------------------------

  shouldComponentUpdate(nextProps, nextState) {
    console.log('App.js, shouldComponentUpadate');
    return true;
  }  

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('App.js, getSnapShotBeforeUpadate')
    return null; 
}

 componentDidUpdate() {
  console.log('App.js, componentDidUpadate metoda')
  console.log('-------Kraj-Lifcycle-update-faze--------')
} 

}

export default App;