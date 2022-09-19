import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ConvertedDate, PriceToDK, StrConverter } from "../../App/Helper/Helpers"
import { Layout } from "../../App/Layout/Layout"

export const EventDetails = () => {
    const [ eventDetail, setEeventDetail ] = useState({})
    const { event_id } = useParams(0);
    
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

    return(
        <>
        {eventDetail ? (
        <section>
            <figure>
                <img src={eventDetail.image} alt={eventDetail.title} />
                <figcaption>
                    <article className="detailDivider">
                        <div>
                            <p>{eventDetail.stage_name}</p>
                            <h3>{ConvertedDate(eventDetail.startdate, false)} - {ConvertedDate(eventDetail.stopdate, true)}</h3>
                        </div>
                        <h3>BILLETPRIS: {PriceToDK(eventDetail.price)} KR</h3>
                    </article>
                    <article>
                    <Layout title={eventDetail.title} description={StrConverter(eventDetail.description)}>
                        <button><Link to={'/'}>KØB BILLET</Link></button>
                    </Layout>
                    <p>{eventDetail.genre}</p>
                    </article>
                    <article>
                        <p className="nl2br">{eventDetail.description}</p>
                    </article>
                </figcaption>
            </figure>
            <article>
                <h3>MEDVIRKENDE</h3>
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
            </article>
        </section> ) : <>...loading</>}
        </>
    )
}