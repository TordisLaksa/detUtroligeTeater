import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ConvertedDate } from '../../App/Helper/Helpers';
import { Layout } from '../../App/Layout/Layout'

export const EventList = () => {
    const [ eventListData, setEventListData] = useState([]);
    
    useEffect(() => {
        const getEventList = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/detutroligeteater/events')
                if (response.data) {
                    setEventListData(response.data.items);
                }
            } catch (error) {
                console.error(`Fejl i Events ${error}`)
            }
        }
        getEventList();
    }, [])
    
    return(
        <Layout title='Forestillinger og events' description='Her kan du se alle vores forestillinger og events'>
            <section>
                {eventListData && eventListData.map(event => {
                    return(
                        <article key={event.id}>
                            <figure>
                                <img src={event.image} alt={event.title} />
                                <figcaption><h2>{event.title}</h2></figcaption>
                            </figure>
                            <article>
                                <p>{event.stage_name}</p>
                                {/* ConvertedDate kommer fra min helper */}
                                <h3>{ConvertedDate(event.startdate, false)} - {ConvertedDate(event.stopdate, true )}</h3>
                            </article>
                            <article>
                                <button className='blue'><Link to={`${event.id}`}>LÆS MERE</Link></button>
                                <button className='yellow'><Link to={'/'}>KØB BILLET</Link></button>
                            </article>
                        </article>
                    )
                })}
            </section>
        </Layout>
    )
}

