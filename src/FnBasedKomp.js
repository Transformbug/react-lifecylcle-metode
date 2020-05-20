import React,{useEffect, useState} from 'react'
// import Ante from './Ante.js'
import ClassKompZaFnBasedKomp from './ClassKompZaFnBasedKomp';

function fnBasedKomp(props) {

    //Kada mijenjamo state sa fn. koju useState returna u fn. based komponetama razlika u odnosu na setState u class based komponetama je u tome što će totalno overwirtati ovo stari state
    // i da recimo prijašnji state ima još proeprty koji se zove nekiDrugikey onda se to ne bi updajtalo nego bi se izbirsali skozr ako ne ponovimo taj key i value kad mijenjao
    //state sa ovom drugom fukcijom koju returana useState.
    //Možemo imati nekoliko useState poziva, također ne moramo ubacio objekt nego može biti string default state i upadajtni state kasnije.
    //VAŽNO: kada zovemo fn. promjeni state ako ubacimo fn. unutar toga poziva automaski ćemo dobiti prevState parametar koji će defintivno biti točan.
    //To treba uvijek koristit kad ovisnomo o prijašnjem stanju, recimo imamo neki iznost kojemu treba dodatni još neki broj, onda treba garatirati da imamo ispravno prošlo stanje.
    let [početniState ,promjeniState]=useState({
        key: 'početniStateValue'
    }) 
    
    //VAŽNO: ovisno o tome gdje se u App.js <FnBasedKomp/> korisit ovisi kad točno u redoslijedi će se ova fnBasedKomp prvi put rendati.Ako je iznda svih ostalih jsx komponeti unutar
    //render metoda u returnu onda će se aktivira nakon što se App.js render metoda aktivira i prije svih ostalih komponeti. Ako je iza Mate.js komponete onda će se aktivirati nakon što
    //se aktivira render metoda Ante.js(koja je child komponeta Mate.js)
    //VAŽNO: kad se ovo aktivira tj. ova se fnBasedKomop prvi put mounta, onda nakon toga će se pokrenuti constuructor,getDeriverteStateFromProps,render metoda ClassKompZaFnBasedKomp
    //Ako je <FnBasedKomp/> u App.js ispred mate onda je componetDidMount od ClassBasedKompZaFnBasedKomp biti ispred ostalih ComponeteDidMout, a ako je <FnBasedKomp/> iza Mate u App.js
    //onda će biti iza Mate i Ante componetedDidMount.
    console.log('fnBasedKomp, izvan useEffecta, kad se ovo aktivira');
    
    //useEffect nam služi za obavljanje sideeffects.
    //Kada ne stavimo drugi argument onda će se useEffect aktivirati svaki put kad se ova komponeted bude rendala. Takavo ponašanje zovu sličnim componetDidUpadate, naravno, razlika
    //je u tome što componeteDidUpadte se ne aktivira za taj inicijalni prvi render. Kada ubacimo [] u drugi argument onda će se useEffect() aktivirat taj incijalni prvi render i
    //kada se komponenta bude un-mountala.Ako dodamo neku varijbalu ili varijable u taj [] onda će se useEffect uz ta dva puta kad se uvijek renda(mounting and unmouting) još aktivirati
    //ako se promjene vrijednosti tih varijable tj. depenedncies koje smo naveli. Tako ponašanje zovu slični componentDidMount
    //VAŽNO: ako nešto returnamo iz useEffecta onda moramo returna funckiju. Ta funckija koju returnamo se neće aktivirati nakon prvog rendera tj. kad se prvi put useEffect aktivira
    // i returna tu funkciju. Ta funckija služi za 'clean up' i ona će se aktivirati PRIJE nego se useEffect aktivira po drugi put kada neki trigger izazove re-render. 
    //VAŽNO:Ako ne postoji neki trigger koji je aktivirati useEffect po drugi put onda će se ta funkcija koju je useEffect returno aktivirati prije useEffect kad se dogodti un-mounting tj.
    //ako se uopće dogodi un-mouting.
    //VAŽNO: možemo imati više useEffect() poziva u jednoj komponenti.
    //VAŽNO: aktivira se iza svih componetDidMount metoda class based komponeti.
     useEffect(()=>{
        console.log('prvi useEffect')
        console.log('početniState var. unutar useEffect',početniState)
        console.log('props objektu unutar useEffect', props)

    },[početniState])

    //VAŽNO: iako ne možemo korisiti shouldComponetUpade ovdje u fn. based komponenti možemo korisiti React memo.
    //Ne moramo ga uvesti, samo omotamo export fn. based komponetne u React.memo().
    //Ako nema promjena u vrijednosti koje su postvljenje na keysima props objekta onda se neće ta komponetea koja korisiti React.memo() aktivira. Vidi moj video.

   
    // Clean up work with useEffect primjer
    // VAŽNO: iz nekog razloga ovo ne radi, ali bar radeslijed radi i ova fn. koja se returna se aktivira prije cijele ove useEffect fn.
    // ne aktivira se iz nekog razloga u nakon creation faze.

    // useEffect(()=>{
    //     console.log('drugi useEffect')
       
    //  const timer=setTimeout(() => {
    //     console.log('unuterSetTimoutTimer',timer)
    //     alert('poslano nešto na server u drugom useEffectu')   
    //    }, 3000);
       
       
    //    return ()=>{
    //      console.log('unuser return funckije Timer gdje je clearTimeout',timer)
        
    //      clearTimeout(timer)
    //      console.log('ovo je unutar fn. koju returna useEffect callback fn.Služi za clean up')
    //  }

    // })



    //VAŽNO: pazi tamo kad klikneš na ono ukloni antu da ne klikne i na botun koji aktiivra ovaj useEffect, pa se čudiš zašto je ovo aktivno iako se
    // ancestor nije aktivirao
     
    //Treba importati useEffect i pozvati ga, ubaciti obvezno callback fn. i ako želimo ubaciti drugi argumnet koji mora biti array. 
    //Ako ne stavimo drugi argument onda će se useEffect aktivirtati svaki put nakon lifecyle creation ili lifecycle update faze class based komponeti.
    //S obzirom na tom kad se aktivira, onda unutar useEffecta možemo napraviti side effects 
    //VAŽNO:useEffect će se aktivirati no matter what nakon što se izvrši lifecylce creation faza class based komponenti. Bez obzira što god stavimo u taj drugi arg.
    //VAŽNO: mislim da će se aktivirati također kada se unmounta njegov parent ili ova komponenta, bez obzira na drugi argument.
    //Ako stavimo [] tj. prazne brackets onda će se aktivirati samo na tom početku(mislim i kad bude unmount ancestora). 
    //Ako stavimo recimo props unutar [] onda će se aktivirat taj prvi put i kad se bilo koji props promjeni. 
    //Ako stavimo recimo props.nekoPropsIme onda se se aktivira taj prvi put i kada se dogodi promjena toga prop.
    //VAŽNO: možemo staviti i ovu varijablu 'početniState' unutar [] pa će se useEffet aktivirati prvi put i kada se promjenit 'početniState' ovdje.
    //VAŽNO: da ne bude zabune, da bi se useEffect aktivirao, mora se negdje promjeniti state, ovdje u ovoj komponeit ili nekoj ancestor komponeti.
    //VAŽNO: Kada kažem aktivira se kad se prop promjeni onda mislim da se dogodi neka promjena state negdje te se ujedno promjeni i vrijednost prop objekta ovdje. 
    //VAŽNO: možemo imati koliko god želimo useEffect() poziva u nekoj komponeti 

    let metoda=()=>{
         
        promjeniState({
           key: 'nakonPromjeniStateVrijedostKeyPropertya'
        })
    }
    
    return (
        <div>
            <ClassKompZaFnBasedKomp/>
        <button onClick={metoda}>
            Ovo je fnBasedKomp botun i on aktivira onu fn. koju useState returna da promjeni stanje onog objekta koje smo ubacili u useState tj. prvi parameter
        </button>
        {/* dodali smo antu da potrdimo da se normalno događa aktivacija desecentes, i da kada smo kliknu na boton da se samo ovaj useEffect akivario bez 
        ičega drugog jer nije bilo descented komponeti ovdje dok App.js normanlo neće aktvirta na promjenu state u svojoj child komponeti. */}
        {/* <Ante/> */}
        </div>
    )
}

export default fnBasedKomp
