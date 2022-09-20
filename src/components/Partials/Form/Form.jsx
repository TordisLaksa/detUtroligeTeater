import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import './Form.scss'

export const Form = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    
    return(
    <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
            <div>
                <label htmlFor="firstname">Fornavn </label>
                    <input type="text" id="firstname" {...register('first', { required: true, maxLength: 30 })} />
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
                <label htmlFor="zipcodeCiry">Postnr. & By </label>
                <input type="text" id="zipcodeCity" {...register('zipcode', { required: true })} />
                {errors.phonenumber && (
                    <span>Udfyld venligst dit telefonnummer!</span>
                )}
            </div>
            <div>
                <label htmlFor="email">Email </label>
                    <input type="email" id="email" {...register('email', { required: true })} />
                    {errors.email && (
                        <span>Udfyld venligst din email!</span>
                    )}
            </div>
            <SeatSelector/>
            <div>
                <button>Godkend bestilling</button>
            </div>
        </fieldset>
    </form>
    )
}


export const SeatSelector = ( ) => {
    const [ seatData, setSeatData ] = useState();
    const { event_id } = useParams();
    
    useEffect(() => {
        const getSeats = async () => {
            const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/seats/${event_id}`)
            if (response.data) {
               setSeatData(response.data.items)
            }
        }
        getSeats();
    }, [event_id])
      

        return (
            <section id="SeatSeaction">

                
            </section>
        )
        
}
