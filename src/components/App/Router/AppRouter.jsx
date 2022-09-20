import { Routes, Route } from 'react-router-dom'
import { EventDetails } from '../../pages/Events/EventDetails';
import { EventList } from '../../pages/Events/Events';
// import { Review } from '../../pages/Events/Review';
import { Home } from '../../pages/Home/Home'
import { Login } from "../../pages/Login/Login";
import { Edit } from '../../pages/Mypage/MyPage';
import { NoPage } from '../../pages/NoPage';
import { Ticket } from '../../pages/Ticket/Ticket';


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path='/events'>
                <Route index element={<EventList />} />
                <Route path=':event_id' element={<EventDetails />} />
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/tickets/:event_id' element={<Ticket />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}