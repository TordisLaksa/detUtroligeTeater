import { Routes, Route } from 'react-router-dom'
import { EventList } from '../../pages/Events/Events';
import { Home } from '../../pages/Home/Home'
import { Login } from "../../pages/Login/Login";
import { NoPage } from '../../pages/NoPage';


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path='/events'>
                    <Route index element={<EventList />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}