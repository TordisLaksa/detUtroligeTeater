import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { authHeader } from "../../../AppService/AuthHeader";
import { ConvertedDate } from "../../App/Helper/Helpers";

export const Review = () => {
    const [ reviewData, setReviewData ] = useState();
    const { event_id } = useParams(0);
    useEffect(() => {
        const getReviews = async () =>{
            try {
                const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/reviews?event_id=${event_id}`, {
                    headers: authHeader()
                })
                if(response.data){
                    setReviewData(response.data.items)
                    console.log(response);
        
                } else{
                    console.log('No comment');
                }
            } catch (error) {
                
            }
        }
        getReviews()
    }, [event_id])
    
    return(
        <section>
            <h2>ANMELDELSER</h2>
        {reviewData && reviewData.map(comment => {
            console.log(comment);
            return(
                <article key={comment.id}>
                    <p>{comment.num_stars} stjerner</p>
                    <p>{ConvertedDate(comment.created_friendly)}</p>
                    <p><strong>{comment.user.firstname} {comment.user.lastname}</strong></p>
                    <p className="highlightColor">{comment.comment}</p>
                </article>    
            )
        })}
        </section>
    )
}