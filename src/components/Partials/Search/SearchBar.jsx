import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { SearchEvent } from "./SearchEventData";
import './SearchBar.scss'
import { IoSearchOutline } from "react-icons/io5";

export const SearchBar = () => {
    const navigate = useNavigate();
    const { setSearchEventData } = useContext(SearchEvent);
    const { register, handleSubmit } = useForm();

    const getResults = (data) => {
        setSearchEventData(data.SearchItem);
        navigate('/search', { replace: true });
    };

    return (
        <form onSubmit={handleSubmit(getResults)} id='SearchForm'>
            <input id='searchItem' type="text" 
                {...register('SearchItem', { required: true, })} />
            <button><IoSearchOutline id="SearchLoop"/></button>
        </form>
    )
}