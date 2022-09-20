import { useLocation } from "react-router-dom"

export const Actors = () => {
    const location = useLocation();
    const { actorData } = location.state;
    return(
        <h1>DET VIRKER</h1>
    )
}