import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { ConvertedDate } from "../../App/Helper/Helpers";
import { Layout } from "../../App/Layout/Layout";

export const Home = () => {
    
    
    return(
        <>
        
        <Layout title=''>
            <MainHeroEvent />
        </Layout>
        </>
    )
}


const MainHeroEvent = () =>{
    const [ heroEvent, setHeroEvent ] = useState();
    
    useEffect(() => {
        const getHeroEvent = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/detutroligeteater/events?orderby=rand()&limit=1')
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