import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { DescriptionConverter } from "../../App/Helper/Helpers";
import { Layout } from "../../App/Layout/Layout";
import './Actors.scss'

export const Actors = () => {
    const location = useLocation();
    const [ actorData, setActorData ] = useState();
    
    useEffect(() => {
        const getActors = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/detutroligeteater/actors')
                if(response.data){
                    setActorData(response.data.items);
                }
            } catch (error) {
                console.error(`Fejl i actors ${error}`)
            }
        }
        getActors();
    }, [])
    
    return(
        <section id="ActorSection">
            <Layout title='Skuespillere'>
                <div id="actorWrapper">
                {actorData && actorData.map(actor => {
                    // console.log(actor);
                    return(
                        <figure key={actor.id}>
                            <img src={actor.image} alt={actor.name} />
                            <figcaption>
                                <article>
                                    <h2>{actor.name}</h2>
                                    <p className="nl2br">{DescriptionConverter(actor.description)}....</p>
                                </article>
                                <button><Link to={actor.id}>LÆS MERE</Link></button>
                            </figcaption>
                        </figure>
                    )
                })}
                </div>
            </Layout>
        </section>
    )
}