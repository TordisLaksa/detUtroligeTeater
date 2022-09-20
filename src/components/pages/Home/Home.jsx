import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import { ConvertedDate } from "../../App/Helper/Helpers";
import { Layout } from "../../App/Layout/Layout";
import './Home.scss';

export const Home = () => {
    
    
    return(
        <>
        
        <Layout title=''>
            <MainHeroEvent />
            <HighlightedCards />
        </Layout>
        </>
    )
}


const MainHeroEvent = () => {
    const [ heroEvent, setHeroEvent ] = useState();
    
    useEffect(() => {
        const getHeroEvent = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/detutroligeteater/events?limit=1')
                if (response.data) {
                    setHeroEvent(response.data.items);
                }
                
            } catch (error) {
                console.error(`Fejl i MainHeroEvent ${error}`);
            }
        }
        getHeroEvent(); 
    }, [])
    
    return(
        <section>
            {heroEvent && heroEvent.map(item => {
            return(
                <figure key={item.id}>
                    <figcaption>
                        <article>
                            <p>{item.stage_name}</p>
                            <h4>{ConvertedDate(item.startdate)} - {ConvertedDate(item.stopdate, true)}</h4>
                            <hr />
                        </article>
                        <article>
                            <h1>{item.title}</h1>
                            <h2>{item.genre}</h2>
                        </article>
                    </figcaption>
                    <img src={item.image_medium} alt="" />
                </figure>
                )    
            })}
        </section>
    )
}

const HighlightedCards = () => {
    const [ getCardData, setCardData ] = useState();
    
    useEffect(() => {
        const getCards = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/detutroligeteater/events?orderby=rand()&limit=3')
                if (response.data) {
                    setCardData(response.data.items);
                }
            } catch (error) {
                
            }
        }
        getCards()
    }, [])
    
    return(
        <section>
            {getCardData && getCardData.map(card => {
                console.log(card);
                return(
                    <figure key={card.id}>
                        <img src={card.image_medium} alt={card.title} />
                        <figcaption>
                            <article>
                                <p>{card.stage_name}</p>
                                <h4>{ConvertedDate(card.startdate)} - {ConvertedDate(card.stopdate, true)}</h4>
                                <hr />
                            </article>
                            <article>
                                <h2>{card.title}</h2>
                                <h3>{card.genre}</h3>
                                <div>
                                    <button><Link to={`/events/${card.id}`}>LÆS MERE</Link></button>
                                    <button><Link to={`/tickets/${card.id}`}>KØB BILLET</Link></button>
                                </div>
                            </article>
                        </figcaption>
                    </figure>
                )
            })}
            <button><Link to={'/events'}>SE ALLE FORESTILLINGER</Link></button>
        </section>
    )
}