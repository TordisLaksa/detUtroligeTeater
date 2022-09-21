import { Layout } from "../../App/Layout/Layout"
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './ActorDetails.scss'

export const ActorDetails = () => {
    const [ actorData, setActorData ] = useState({});
    const { actor_id } = useParams();
    
    useEffect(() => {
        const getActor = async () => {
            try {
                const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/actors/${actor_id}`)
                if (response.data) {
                    setActorData(response.data.item);
                }
            } catch (error) {
                console.error(`Fejl i ActorDetails ${error}`);
            }
        }
        getActor();
    }, [actor_id])
    
    return(
        <section id="ActorDetailSection">
            <div id="detailWrapper">
            <Layout title='Skuespillere'>
                {actorData ? (
                    <figure>
                        <img src={actorData.image} alt={actorData.name} />
                        <figcaption>
                            <article>
                                <h2>{actorData.name}</h2>
                                <p className="nl2br">{actorData.description}</p>
                            </article>
                        </figcaption>
                    </figure>
                ) : <>...loading</>}
            </Layout>
            </div>
            <button id="ActorDetailButton"><Link to={'/actors'}>ALLE SKUESPILLERE</Link></button>
        </section>
    )
}