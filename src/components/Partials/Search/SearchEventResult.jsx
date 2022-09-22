import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react"
import { Link } from "react-router-dom";
import { PriceToDK, ConvertedDate } from "../../App/Helper/Helpers";
import { SearchEvent } from "./SearchEventData"
import './SearchResult.scss'

export const SearchEventResult = () => {
    const { searchEventData } = useContext(SearchEvent);
    const [ searchEventResult, setSearchEventResult ] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            try {
                if(searchEventData){
                    const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/search/${searchEventData}`)
                    if (response.data) {
                        setSearchEventResult(response.data.items)
                    }
                }
            } catch (error) {
                console.error(`Fejl i søg ${error}`);
                
            }
        }
        getData();
    }, [searchEventData])
    
    return(    
        <>
        {searchEventResult ? (
            <>
            <h2 id="Results">Søgeresultater</h2>
            <section id="ResultWrapper">
            <article id="headerArticle">
                <h4>Dato</h4>
                <h4>Event</h4>
                <h4>Genre</h4>
                <h4>Varighed</h4>
                <h4>Scene</h4>
                <h4>Pris</h4>
            </article>
            {searchEventResult && searchEventResult.map(event => {
                return(
                    <Link key={event.id} to={`/events/${event.id}`}>
                        <article className="infoArticle">
                            <p>{ConvertedDate(event.startdate, false)} - {ConvertedDate(event.stopdate, false)}</p>
                            <p>{event.title}</p>
                            <p>{event.genre}</p>
                            <p>{event.duration_minutes} min</p>
                            <p>{event.stage_name}</p>
                            <p>{PriceToDK(event.price)} Kr.</p>
                        </article>
                    </Link>
                )
            })}
            </section>
            </>) 
            :(
                <h3 id="NoResult">Din søgning gav desværre ingen resultater</h3>                
            )
        }
        </>
    )
}