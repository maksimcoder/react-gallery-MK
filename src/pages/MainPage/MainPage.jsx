import md5 from "md5";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ComicsList } from "../../components/ComicsList/ComicsList";

const publicKey = process.env.REACT_APP_API_PUBLICK_KEY;
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY;
const API_BASE = `https://gateway.marvel.com:443/v1/public`;
export const FAVOURITE_FILMS_KEY = 'favourites';

export const MainPage = () => {
    const {getFromStorage } = useLocalStorage();
    const favouriteComics = getFromStorage(FAVOURITE_FILMS_KEY);
    const [comics, setComics] = useState(favouriteComics ?? []);
    const [isLoading, setLoading] = useState(true);

    const getComics = async () => {
        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);
        const url = `${API_BASE}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

        function dedublicateComics(favComics, fetchedComics) {
            const favComicsIds = favComics.map((item) => item.id)
            return fetchedComics.filter((comic) => !favComicsIds.includes(comic.id));
        }

        function convertComicsIntoLocal(fetchedComics) {
            return fetchedComics.map((fetchedComic) => {
                return {
                    ...fetchedComic,
                    liked: false
                }
            })
        }

        try {
            const promiseResult = await fetch(url);
            const { data } = await promiseResult.json();
            
            const localComics = convertComicsIntoLocal(data.results);

            setComics([...favouriteComics ?? [], ...dedublicateComics(favouriteComics ?? [], localComics)])
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    function generateHash(timeStamp) {
        return md5(timeStamp + privateKey + publicKey);
    }

    useEffect(() => {
        getComics();
    }, []);

    return (
        <div>
            <h1>MainPage</h1>
            {isLoading ? 'Loading...' : <ComicsList comics={comics} /> }
        </div>
    )
}

