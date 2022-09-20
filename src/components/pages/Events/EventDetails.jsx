import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ConvertedDate, PriceToDK, StrConverter } from "../../App/Helper/Helpers"
import { Layout } from "../../App/Layout/Layout"
import { Review } from "./Review"
import './EventDetails.scss';
import { Login } from '../Login/Login'
import { useAuth } from "../../App/Auth/Auth"

export const EventDetails = () => {
    const [ eventDetail, setEeventDetail ] = useState({})
    const { event_id } = useParams(0);
    const { loginData } = useAuth();
    
    useEffect(() => {
        const getDetailData = async () => {
            try {
                const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`)
                if (response.data) {
                    setEeventDetail(response.data.item);
                }
            } catch (error) {
                console.error(`Fejl i Event details ${error}`);
            }
        }
        getDetailData();
    }, [event_id])

    const Message = () => {
        return( 
            <section id="ReviewLogin">
                <h4>Du skal være logget ind for at skrive en anmeldelse</h4>
                <Login />
            </section>
        )
    }
    return(
        <>
        {eventDetail ? (
        <>
        <div id="DetailWrapper">
            <figure id="figureHero">
                <img src={eventDetail.image} alt={eventDetail.title} />
                <figcaption id="heroCaption">
                    <article className="detailDivider">
                        <div>
                            <p>{eventDetail.stage_name}</p>
                            <h3>{ConvertedDate(eventDetail.startdate, false)} - {ConvertedDate(eventDetail.stopdate, true)}</h3>
                        </div>
                        <h3 className="moveRight">BILLETPRIS: {PriceToDK(eventDetail.price)} KR.</h3>
                    </article>
                </figcaption>
            </figure>
            <section id="detailSection">
                <article id="specificEvent">
                    <div id="buyTicketWrapper">
                    <Layout title={eventDetail.title} description={StrConverter(eventDetail.description)}>
                    <p>{eventDetail.genre}</p>
                    </Layout>
                    </div>
                        <button><Link to={'/'}>KØB BILLET</Link></button>
                </article>
                <article>
                        <p className="nl2br">{eventDetail.description}</p>
                </article>
                <article id="EventActors">
                    <h3>MEDVIRKENDE</h3>
                        <div className="EventActorsWrapper">   
                    {eventDetail.actors && eventDetail.actors.map((actor, i) => {
                        return(
                            <figure key={i}>
                                <img src={actor.image} alt={actor.name} />
                                <figcaption>
                                    <h4>{actor.name}</h4>
                                </figcaption>
                            </figure>
                        )
                    })}
                    </div>
                </article>
            </section>
        </div> 
        {!loginData ? <Message /> : <Review /> }
        </>) : <>...loading</>}
        </>
    )
}

