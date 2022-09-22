import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../../App/Auth/Auth'
import { ConvertedDate } from "../../App/Helper/Helpers";
import { useForm } from 'react-hook-form'; 
import './Review.scss'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const Review = () => {
    const [ reviewData, setReviewData ] = useState();
    const { event_id } = useParams(0);
    useEffect(() => {
        
        const getReviews = async () =>{
            try {
                const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/reviews?event_id=${event_id}`)
                if(response.data){
                    setReviewData(response.data.items)
                    // console.log(response);
        
                } else{
                    console.log('No comment');
                }
            } catch (error) {
                
            }
        }
        getReviews()
    }, [event_id])
    
    return(
        <>
        <section id="ReviewSection">
            <h2>ANMELDELSER</h2>
            <div id="ReviewWrapper">
        {reviewData && reviewData.map(comment => {
            // console.log(comment);
            return(
                <article key={comment.id}>
                    <NumStars num_stars={comment.num_stars}/>
                    <h5>{ConvertedDate(comment.created, true)}</h5>
                    <h3>{comment.user.firstname} {comment.user.lastname}</h3>
                    <p className="highlightColor">{comment.comment}</p>
                </article>    
            )
        })}
            </div>    
            </section>
            <section id="FormWrapper">
            <PostReview id={event_id} />
            </section>
        </>
    )
}


export const PostReview = ( props ) => {
    const { loginData } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data) => {
        const options = {
            headers: {
            Authorization: `Bearer ${loginData.access_token}`,
            }
        }
    
        const formData = new FormData()
        formData.append('event_id', props.id)
        formData.append('subject', data.subject)
        formData.append('comment', data.comment)
        formData.append('num_stars', data.num_stars)
        
        // // console.log(props.id);
        try {
            const response = await axios.post('https://api.mediehuset.net/detutroligeteater/reviews', formData, options)
            if (response) {
                console.log('DO SOMETHING');
            }
        } catch (error) {
            console.error(`Fejl i Review ${error}`)
        }
    }
    return(
        <>
        <form id="PostReviewForm" onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <h2 id="ReviewH2">Skriv en anmeldelse</h2>
                <div className="CommentDiv">
                    <label htmlFor="num_stars"><h3>Antal stjerner:</h3> <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></label>< br/>
                    <input type='number' id="num_stars" placeholder="Angiv 1 til 5 &#9733;" {...register('num_stars', { required: true, min: 1, max: 5 })}></input>
                    {errors.num_stars && (
                        <><br /><span>Du skal angive 1-5 stjerner!</span></>
                        )}
                </div>
                <div className="CommentDiv">
                    <input type="text" id="subject" placeholder="Indtast en titel" {...register('subject', { required: true, maxLength: 200 })} />
                    {errors.subject && (
                        <><br /><span>Du skal skrive en titel!</span></>
                        )}
                </div>
                <div className="CommentDiv">
                    <textarea id="comment" placeholder="Skriv din kommentar her" {...register('comment', { required: true })}></textarea>
                    {errors.comment && (
                        <><br /><span>Du skal skrive en kommentar!</span></>
                        )}
                </div>
                <div className="CommentDivButtons">
                    <button>Send</button>
                </div>
            </fieldset>
        </form>
        </>
    )
}

export const NumStars = (props) => {
    const [ numStars, setNumStars ] = useState(new Array(5).fill(''));
    

    
    return(
        <div className="StarWrapper">
            {numStars && numStars.map((star, i) => {
                return(
                    <React.Fragment key={i}>
                    {i > props.num_stars - 1 ? 
                    (<>
                      <AiOutlineStar className="OutLineStar" />  
                    </>) 
                    : <AiFillStar className="FillStar" />}
                    </React.Fragment>
                    
                )
            })}
        </div>
    )
}