import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { FAVOURITE_FILMS_KEY } from "../MainPage";
import { ComicsList } from "../../components/ComicsList/ComicsList";

export const FavouritesPage = () => {
    const { getFromStorage }  = useLocalStorage();
    const [comics, setComics] = useState([]);
    
    useEffect(() => {
        const favComics = getFromStorage(FAVOURITE_FILMS_KEY) ?? [];
        setComics(favComics);
    }, [])
    
    return (
        <div>
            <h1>FavouritesPage</h1>
            { comics.length ? <ComicsList comics={comics} /> : 'Любимых комиксов нет'}
        </div>
    )
}