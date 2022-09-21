import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { useAuth } from "../../App/Auth/Auth"
import { Layout } from "../../App/Layout/Layout"
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form'

export const MyPage = () => {
    return(
        <Layout title='Min side'>
            <MyReviews />
        </Layout>
    )
}

const MyReviews = () => {
    const [ myReviewData, setMyReviewData ] = useState([]);
    const [ myEvents, setMyEvents ] = useState([]);
    const { loginData } = useAuth();

    
    
    useEffect(() => {
        const getReviewList = async () =>{
            try {
                const response = await axios.get('https://api.mediehuset.net/detutroligeteater/reviews')
                if(response.data){
                    setMyReviewData(response.data.items);
                }
            } catch (error) {
                console.log(134);
            }
        }
        getReviewList()     
        
    }, [])
    

    return(
        <section>
            <h2>Anmeldelser</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Forestilling</th>
                        <th>Emne</th>
                        <th>Antal &#9733;</th>
                        <th>Rediger</th>
                    </tr>
                    <tr><td><hr /></td></tr>
                {myReviewData && myReviewData.map((review, i) => {
             
                    if (review.user_id == loginData.user_id) {
                        return(
                            <React.Fragment key={i}>
                                <tr>
                                    <td>{review.event_title}, {review.stage_name}</td>
                                    <td>{review.subject}</td>
                                    <td>{review.num_stars}&#9733;</td>
                                    <td>
                                        <Link to={`/edit/${review.id}`} state={{ commentData: review }}><MdModeEdit /></Link>
                                        <Delete id={review.id}/> 
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    }
                })}
                </tbody>
            </table>
        </section>
    )
}

export const Edit = () => {
    const { id } = useParams(0)
    const { loginData } = useAuth();
    const location = useLocation();
    const { commentData } = location.state;
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data) => {
        const options = {
            headers: {
                Authorization: `Bearer ${loginData.access_token}`,
            }
        }
        
        const formData = new URLSearchParams();
        
        formData.append('id', id)
        formData.append('subject', data.subject)
        formData.append('comment', data.comment)
        formData.append('num_stars', data.num_stars)
        formData.append('active', 1)
        
        try {
            const response = await axios.put(`https://api.mediehuset.net/detutroligeteater/reviews`, formData, options)
            if (response) {
                navigate('/login', { replace: true })
            }
        } catch (error) {
            console.log('Nay');

        }
    }
    
    return(
        <Layout title='Rediger anmeldelse' description='Her kan du ændre i din anmeldelse'>
            <form onSubmit={handleSubmit(onSubmit)} id='putForm'>
                <fieldset>
                    <div>
                        <legend><h2>Her kan du ændre i din kommentar</h2></legend>
                        <div className="PutCommentDiv">
                            <input type="text" id="subject" placeholder="Indtast din nye titel" {...register('subject', { required: true, maxLength: 200 })} defaultValue={commentData.subject} />
                            {errors.subject && (
                                <><br /><span>Skriv din nye titel!</span></>
                            )}
                        </div>
                        <div className="PutCommentDiv">
                            <textarea id="comment" placeholder="Skriv din nye kommentar her" {...register('comment', { required: true })} defaultValue={commentData.comment}></textarea>
                            {errors.comment && (
                                <><br /><span>Skriv din nye kommentar!</span></>
                            )}
                        </div>
                        <div className="PutCommentDiv">
                            <input type='number' id="num_stars" placeholder="Angiv 1 til 5 &#9733;" {...register('num_stars', { required: true, min: 1, max: 5 })} defaultValue={commentData.num_stars}></input>
                            {errors.num_stars && (
                                <><br /><span>Du skal angive 1-5 stjerner!</span></>
                            )}
                        </div>
                        <div className="PutCommentDivButtons">
                            <button>Gem</button>
                            <button type="reset">Fortryd</button>
                        </div>
                    </div>
                    <div id='positionsDiv'>
                        <p>Hvis du ændrer mening og ikke vil ændre i din kommentar, så skal du trykke på <i>Gå tilbage </i> knappen</p>
                        <Link to={'/login'}><button>Gå tilbage</button></Link>
                    </div>
                </fieldset>
            </form>
        </Layout>
    )
}

const Delete = ( props ) => {
    const { loginData } = useAuth();


    
    const onSubmit = async () => {
        const options = {
            headers: {
                Authorization: `Bearer ${loginData.access_token}`,
            }
        }
        try {
            const response = await axios.delete(`https://api.mediehuset.net/detutroligeteater/reviews/${props.id}`, options)
            if (response) {
                console.log('deleted');
            }
        } catch (error) {
            console.error(`Fejl i MyPage Delete: ${error}`)
        }
    }
    
    return (
        <IoCloseCircleOutline onClick={onSubmit}/>
    )
}