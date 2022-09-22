import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../App/Layout/Layout'
import { Form } from '../../Partials/Form/Form'

export const Ticket = () => {
    const [eventDetail, setEeventDetail] = useState({})
    const { event_id } = useParams(0);

    useEffect(() => {
        const getDetailData = async () => {
            try {
                const response = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`)
                if (response.data) {
                    setEeventDetail(response.data.item);
                }
            } catch (error) {
                console.error(`Fejl i Event details ${error}`);
            }
        }
        getDetailData();
    }, [event_id])
    
    return(
        <Layout>
            <Form price={eventDetail.price}/>
        </Layout>
    )
}