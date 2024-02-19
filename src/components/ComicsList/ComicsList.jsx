import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FAVOURITE_FILMS_KEY } from "../../pages/MainPage";
import { ComicsCard } from "../ComicsCard";
import styles from './ComicsList.module.scss';

export const ComicsList = ({ comics }) => {
    const { setToStorage, getFromStorage } = useLocalStorage();

    function handleAddToFavs(comic, liked) {
        const initialComicsArray = getFromStorage(FAVOURITE_FILMS_KEY) ?? [];


        if (liked) {
            setToStorage(FAVOURITE_FILMS_KEY, [{...comic, liked}, ...initialComicsArray]);
            return;
        } else {
            const arrayWithoutDisliked = initialComicsArray.filter(item => item.id !== comic.id);
            setToStorage(FAVOURITE_FILMS_KEY, arrayWithoutDisliked);
            return;
        }
    }


    const mappedComics = comics.map((comic) => {
        return (
            <ComicsCard key={comic.id} onAddToFavs={(liked) => handleAddToFavs(comic, liked)} liked={comic.liked ?? false} {...comic} />
        );
    });
    

    return (
        <div className={styles.comicsList}>
            {mappedComics}
        </div>
    )
}