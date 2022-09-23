import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../App/Auth/Auth";
import { ConvertedDate, PriceToDK } from "../../App/Helper/Helpers";
import { Layout } from "../../App/Layout/Layout";
import './Form.scss'

export const TicketForm = ( props ) => {
    const navigate = useNavigate();
    const { event_id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();        
    const [seatData, setSeatData] = useState([]);
    const [lineData, setLineData] = useState([]);
    
    //Jeg sætter checked til at være et array med 100 elementer hvori alle værdier er "false"
    //Det kan være en ide at sætte længden af seatData ind men da det ikke er sikkert at der 
    //er data deri når linjen under bliver kørt
    //så er det blevet fyld med en værdi der bør kunne dække alle tilfælde.
    const [checked, setChecked] = useState(new Array(100).fill(false)) /*(new Array(24).fill(false));*/
    const [selectedOnly, setSelectedOnly] = useState([]);
    
    const [ numTickets, setNumTickets ] = useState(0);
    const [ checkedSeats, setCheckedSeats ] = useState(false)

    //laver min handleOnChange med position som parameter 
    //(position) = det index jeg har når jeg mapper
    const handleOnChange = (position) => {
        //variabel hvor jeg tager limit (antal sæder) ind for at kunne bruge dens value
        let limit = document.getElementById('limit').value;
        //mapper over de valgte sæder (altså dem i mit array)
        const updatedCheckedState = checked.map((item, index) =>
            //hvis index er identisk med position så skal item være det modsatte (true/false)
            index === position ? !item : item);
            // spørger efter hvor mange der er i mit array, og hvis den er over limit
            if (updatedCheckedState.filter(v => v).length > limit) {
                //return for at den ikke skal gøre noget, hvis det er sandt
                return
            }
            //hvis mængden er == limit, så skal setCheckedSeats sættes til true
            if(updatedCheckedState.filter(v => v).length == limit){
                setCheckedSeats(true)
                //ellers sættes til false  ==> altså er det her spørger om det antal sæder der skal bestilles er sat
            } else{
                setCheckedSeats(false)
            }
            //retter i mit array
        setChecked(updatedCheckedState);
    };

    //laver min handleClick med (id, line, number) som parametre
    const handleClick = (id, line, number) => {
        
        //variabel for at sætte limit til den værdi der er i billet antal
        let limit = document.getElementById('limit').value;
        // hvis dem længden på dem der er valgt er mindre end limit (tal)
        if (selectedOnly.length < limit) {
            //hvis ikke har et id (så tilføjer jeg det)
            if (!selectedOnly.includes(id)) {
                //laver et midlertidigt array som jeg sætter til selected only
                let tempArr = selectedOnly;
                //jeg tager id, line og number med, da jeg skal bruge dataen ift confirmation
                tempArr.push({id: id, line: line, number:number});
                // sætter selectedOnly til det midlertidige array
                setSelectedOnly(tempArr);
            }
            else {
                //variabel hvor jeg sorterer de objecter fra med id og returnerer dem der ikke har id
                let tempArr = selectedOnly.filter(value => {
                    //altså fjerner jeg den som jeg allerede har trykket på
                    return value.id != id;
                });
                //sætter setSelectedOnly til det midlertidige array
                setSelectedOnly(tempArr);
            }
        }
        else {
            //hvis selctedOnly har id
            if (selectedOnly.includes(id)) {
                //variabel som sorterer i mit selectedOnly og fjerner den, 
                //hvis den allerede findes
                let tempArr = selectedOnly.filter(value => {
                    return value.id != id;
                });
                //sætter setSelctedOnly til mit midlertidige array
                setSelectedOnly(tempArr);
            }
        }
    }

    
    useEffect(() => {
        //asynkron arrow function
        const getSeats = async () => {
            //awaiter mit response
            const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/seats/${event_id}`)
            //hvis der kommer response.data
            if (response.data) {
                //variabel med tomt array
                let temporaryArr = [];
                //sætter setSeatData til response.data.items
                setSeatData(response.data.items)
                //looper over response.data.items linje længde -1 (fordi det er et array )
                for (let i = 0; i < response.data.items[response.data.items.length - 1].line; i++) {
                    //tilføjer en linje til mit temporaryArray
                    //dette gør jeg for at kunne mappe over mine linjer
                    temporaryArr.push(i + 1)
                }
                //sætter setLineData til temporaryArray
                setLineData(temporaryArr);
            }
        }
        //kalder funktionen
        getSeats();
        
        //dependency array med event_id
    }, [event_id])
    
    //onSubmit funktion med data som parameter
    const onSubmit = data => {
        // hvis checkedSeats er sat
        if(checkedSeats){
            //sætter jeg data og selectedSeat i localStorage for at kunne tilgå dem fra confirm siden
            localStorage.setItem('data', JSON.stringify(data))
            localStorage.setItem('selectedSeats', JSON.stringify(selectedOnly))
            
                //navigerer til confirm siden og tager eventDetail med i state den kommer fra props som er sat inde i ticket
                navigate(`/tickets/${event_id}/confirm`, { replace: true, state: {seatData: props.data} })
            }
    
    }
    
    //NumTicketChange function med event som parameter
    const NumTicketChange = event =>{
        //sætter setNumTickets til event.target.value
        //(tallet inde i mit input felt)
        setNumTickets(event.target.value)
    }
    // return form
    return(
        <form id="FormReservation" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
            <img src={props.data.image_large} alt="event-billede" />
            <div id="mainDivWrapper">
            <div className="InfoResDiv">
                <label htmlFor="firstname">Fornavn </label>
                    <input type="text" id="firstname" {...register('firstname', { required: true, maxLength: 30 })} />
                    {errors.firstname && (
                        <span>Udfyld venligst dit fornavn!</span>
                    )}
            </div>
            <div className="InfoResDiv">
                <label htmlFor="lastname">Efternavn </label>
                    <input type="text" id="lastname" {...register('lastname', { required: true, maxLength: 30 })} />
                    {errors.lastname && (
                        <span>Udfyld venligst dit efternavn!</span>
                    )}
            </div>
            <div className="InfoResDiv">
                <label htmlFor="address">Vejnavn & Nr </label>
                <input type="text" id="address" {...register('address', { required: true })} />
                    {errors.address && (
                        <span>Udfyld venligst din adresse!</span>
                    )}
            </div>
            <div className="InfoResDiv">
                <label htmlFor="zipcode">Postnr. & By </label>
                    <input type="number" id="zipcode" {...register('zipcode', { required: true, min: 1000, max: 9999 })} />
                    <input type="text" id="city" {...register('city', { required: true })} />
                    {errors.zipcode && (
                        <span>Udfyld venligst dit postnr. !</span>
                    )}
                    {errors.city && (
                        <span>Udfyld venligst dit by!</span>
                    )}
            </div>
            <div className="InfoResDiv">
                <label htmlFor="email">Email </label>
                    <input type="email" id="email" {...register('email', { required: true })} />
                    {errors.email && (
                        <span>Udfyld venligst din email!</span>
                    )}
            </div>
            <div className="InfoResDiv">
                <label htmlFor="limit">Antal</label>
                <input type="number" id="limit"  onClick={NumTicketChange} {...register('limit', { required: true, min: 1 })}/>
                <div>
                    {/** PriceToDK er en priskonverterer jeg har lavet i min helper 
                     * her ganger jeg den med numTickets for at få prisen af x billetter  */}
                    <h3>Pris: {PriceToDK(props.price * numTickets)}kr.</h3>
                    <p>PRIS INKL. MOMS</p>
                </div>
            </div>
                    {/** Her laver jeg en span, der fortæller at kunden skal vælge x sæder  / Den forsvinder når sæderne er valgte*/}
                {!checkedSeats ? <span>{`Du skal vælge ${numTickets} sæder`}</span> : null}
            </div>
            
            
            {/* --------------Her Kommer Sæde Selectionen---------------- */}
                <section id="SeatSeaction">
                    {/**mapper over sædelinjerne */}
                    {lineData && lineData.map(line => {
                        return (
                            <div key={line} className={`line${line}`}>
                                <p>{line}</p>
                                {/** mapper over sæderne */}
                                {seatData && seatData.map((seat, index) => {
                                    if (seat.line == line) {
                                        return (
                                            <label key={seat.id}>{seat.id}
                                                <input
                                                    className={`seat${seat.number} reserved${seat.is_reserved}`}
                                                    //kalder handleOnChange med index som argument
                                                    onChange={() => handleOnChange(index)}
                                                    //kalder handleClick med seat.id, seat.line og seat.number som argumenter
                                                    onClick={() => handleClick(seat.id, seat.line, seat.number)}
                                                    checked={checked[index]}
                                                    type="checkbox"
                                                    disabled={seat.is_reserved >= 1}
                                                    name="seats[]"
                                                    value={seat.id} />
                                            </label>
                                        )
                                    }
                                })}
                                <p>{line}</p>
                            </div>
                        )
                    })}
                </section>
            {/* ---------------------------------------------------------- */}
            
        </fieldset>
            <div>
                <button>Godkend bestilling</button>
            </div>
    </form>
    )
}

//laver mit Confirm component
export const Confirm = () => {
    const navigate = useNavigate();
    const { loginData } = useAuth();
    const { event_id } = useParams(0);
    
    //variabel hvor jeg henter data og selected seats fra localStorage
    //de skal JSON.parse da de var blevet stringified og nu ønsker jeg at det bliver et objekt igen
    const data = JSON.parse(localStorage.getItem('data'))
    const seats = JSON.parse(localStorage.getItem('selectedSeats'))
    
    const location = useLocation()
    const { seatData } = location.state;
    
    //Submit asynkron arrow function
    const Submit = async () => {
            //tager min access_token ind i options
            const options = {
                headers: {
                    Authorization: `Bearer ${loginData.access_token}`,
                }
            }
            
            //laver formdata
            const formData = new FormData();

            //appender min data
            formData.append('event_id', event_id);
            formData.append('firstname', data.firstname);
            formData.append('lastname', data.lastname);
            formData.append('address', data.address);
            formData.append('zipcode', data.zipcode);
            formData.append('city', data.city);
            formData.append('email', data.email);
            
            //looper over antal sæder
            for (let i = 0; i < seats.length; i++) {
                //appender sæde data ind for hvert i
                formData.append('seats[]', seats[i].id);
                
            }
            //try catch error handling
            try {
                //await post med endpoint, formData og options
                const result = await axios.post(`https://api.mediehuset.net/detutroligeteater/reservations`, formData, options);
                //hvis det lykkes
                if (result) {
                    //skal brugeren sendes videre til receipt siden
                    navigate('/receipt', { replace: true });
                }
            } catch (error) {
                console.error(`Fejl i confirm: ${error}`)
            }
            //her rydder jeg så local storage igen, da det ikke er aktuelt at den bliver liggende
            localStorage.clear();
    }
    return(
        <section>
            <Layout title='Godkend ordre'>
            <figure>
                <img src= {seatData.image_medium} alt="event-poster" />
                <figcaption>
                    <article id="EventInfo">
                        <h2>Produkter</h2>
                        <h3>Forestilling: <div className="thin">{seatData.title}</div></h3>
                        <h3>Scene: <div className="thin">{seatData.stage_name}</div></h3>
                        <h3>Dato: <div className="thin">{ConvertedDate(seatData.startdate, true)} Kl. {(seatData.starttime).substring(0, 5)}</div></h3>
                    </article>
                    <article id="TicketInfo">
                        <div>
                            <h3>Sæde</h3>
                            <h3>Række</h3>
                            <h3>Pris</h3>                            
                        </div>
                        <div>
                            {seats && seats.map((seat, i) => {
                                return(
                                    <div className="ticketRow" key={i}>
                                    <p>{seat.number}</p>                            
                                    <p>{seat.line}</p>
                                    <p>{PriceToDK(seatData.price)} Kr.</p>
                                    </div>
                                )
                            })}
                        </div>
                    </article>
                </figcaption>
            </figure>
            {console.log(seatData)}
            {console.log(seats)}
            <button onClick={Submit}>Click</button>
            </Layout>
        </section>
    )
}


//Receipt component
export const Receipt = () => {
    return(
        <Layout title='Tak for din bestilling' />
    )
}