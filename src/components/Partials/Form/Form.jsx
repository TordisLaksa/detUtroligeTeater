import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import { useAuth } from "../../App/Auth/Auth";

import './Form.scss'
// import { SeatSelector } from './SeatSelector'

export const Form = ( ) => {
    const { event_id } = useParams();
    const { loginData } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();        
    const [seatData, setSeatData] = useState([]);
    const [lineData, setLineData] = useState([]);
    //Jeg sætter checked til at være et array med 100 elementer hvori alle værdier er "false"
    //Det kan være en ide at sætte længden af seatData ind men da det ikke er sikkert at der er data deri når linjen under bliver kørt
    //så er det blevet fyld med en værdi der bør kunne dække alle tilfælde.
    const [checked, setChecked] = useState(new Array(100).fill(false)) /*(new Array(24).fill(false));*/
    const [selectedOnly, setSelectedOnly] = useState([]);

    let limit = 2;

    const handleOnChange = (position) => {
        const updatedCheckedState = checked.map((item, index) =>
            index === position ? !item : item);
        // spørger efter om der er en værdi i 
        if (updatedCheckedState.filter(v => v).length >= limit + 1) {
            return
        }
        setChecked(updatedCheckedState);
    };

    const handleClick = (id) => {
        if (selectedOnly.length < limit) {
            if (!selectedOnly.includes(id)) {
                let tempArr = selectedOnly;
                tempArr.push(id);
                setSelectedOnly(tempArr);
            }
            else {
                let tempArr = selectedOnly.filter(value => {
                    return value != id;
                });
                setSelectedOnly(tempArr);
            }
        }
        else {
            if (selectedOnly.includes(id)) {
                let tempArr = selectedOnly.filter(value => {
                    return value != id;
                });
                setSelectedOnly(tempArr);
            }
        }
    }

    useEffect(() => {
        const getSeats = async () => {
            const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/seats/${event_id}`)
            if (response.data) {
                let temporaryArr = [];
                setSeatData(response.data.items)
                for (let i = 0; i < response.data.items[response.data.items.length - 1].line; i++) {
                    temporaryArr.push(i + 1)
                }
                console.log(response.data.items);
                setLineData(temporaryArr);
            }
        }
        getSeats();
        
    }, [event_id])
    
    const onSubmit = async (data) => {
        const options = {
            headers: {
                Authorization: `Bearer ${loginData.access_token}`,
            }
        }
        const formData = new FormData();
        
        formData.append('event_id', event_id);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('address', data.address);
        formData.append('zipcode', data.zipcode);
        formData.append('city', data.city);
        formData.append('email', data.email);
        for (let i = 0; i < selectedOnly.length; i++) {
            formData.append('seats[]', selectedOnly[i]);

        }
        try {
            const result = await axios.post(`https://api.mediehuset.net/detutroligeteater/reservations`, formData, options);
            if (result) {
                console.log(result);
            }
        } catch (error) {
            console.log('Nay')
        }
    }
    
    return(
    <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
            <div>
                <label htmlFor="firstname">Fornavn </label>
                    <input type="text" id="firstname" {...register('firstname', { required: true, maxLength: 30 })} />
                    {errors.firstname && (
                        <span>Udfyld venligst dit fornavn!</span>
                    )}
            </div>
            <div>
                <label htmlFor="lastname">Efternavn </label>
                    <input type="text" id="lastname" {...register('lastname', { required: true, maxLength: 30 })} />
                    {errors.lastname && (
                        <span>Udfyld venligst dit efternavn!</span>
                    )}
            </div>
            <div>
                <label htmlFor="address">Vejnavn & Nr </label>
                <input type="text" id="address" {...register('address', { required: true })} />
                    {errors.address && (
                        <span>Udfyld venligst din adresse!</span>
                    )}
            </div>
            <div>
                <label htmlFor="zipcode">Postnr. & By </label>
                    <input type="number" id="zipcode" {...register('zipcode', { required: true, min: 4, max: 4 })} />
                    <input type="text" id="city" {...register('city', { required: true })} />
                {(errors.zipcode || errors.city) && (
                    <span>Udfyld venligst dit postnr. & by!</span>
                )}
            </div>
            <div>
                <label htmlFor="email">Email </label>
                    <input type="email" id="email" {...register('email', { required: true })} />
                    {errors.email && (
                        <span>Udfyld venligst din email!</span>
                    )}
            </div>
            {/* ---------------------------------------------------------- */}
                <section id="SeatSeaction">
                    {lineData && lineData.map(line => {
                        return (
                            <div key={line} className={`line${line}`}>
                                <p>{line}</p>
                                {seatData && seatData.map((seat, index) => {
                                    if (seat.line == line) {
                                        return (
                                            <label key={seat.id}>{seat.id}
                                                {/* <input className={`seat${seat.number}`} type='checkbox' name="seats[]" value={seat.id}/>  */}
                                                <input
                                                    className={`seat${seat.number} reserved${seat.is_reserved}`}
                                                    onChange={() => handleOnChange(index)}
                                                    onClick={() => handleClick(seat.id)}
                                                    checked={checked[index]}
                                                    type="checkbox"
                                                    disabled={seat.is_reserved == 1}
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
            <div>
                <button>Godkend bestilling</button>
            </div>
        </fieldset>
    </form>
    )
}