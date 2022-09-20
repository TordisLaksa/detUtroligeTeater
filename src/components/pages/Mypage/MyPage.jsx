import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { useAuth } from "../../App/Auth/Auth"
import { Layout } from "../../App/Layout/Layout"
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom"

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
        
        const getEvents = async () => {
            try {
                const response = await axios.get('https://api.mediehuset.net/detutroligeteater/events')
                if (response.data.items) {
                    setMyEvents(response.data.items);                    
                }
            } catch (error) {
                
            }
        }
        getEvents()
        
       
        
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
                                    <td>{review.event_title}</td>
                                    <td>{review.subject}</td>
                                    <td>{review.num_stars}&#9733;</td>
                                    <td>
                                        <Link to={'/'}><MdModeEdit /></Link>
                                        <button><IoCloseCircleOutline /></button>   
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