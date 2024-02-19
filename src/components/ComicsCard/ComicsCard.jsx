import { useState } from 'react';
import styles from './ComicsCard.module.scss';
import favIcon from './favourite.svg'
import notFavIcon from './not-favourite.svg'

const CARD_YEAR_KEY = 'focdate';
const NORMALIZED_DATE_ERROR = 'Invalid Date'


export const ComicsCard = ({ title, thumbnail, dates, onAddToFavs, liked }) => {
    const [isLiked, setLiked] = useState(liked);

    const composeThumbnailUrl = (thumbnail) => {
        return `${thumbnail.path}.${thumbnail.extension}`;
    }

    const getYear = (dates) => {
        const focDate = dates.find((date) => date.type.toLowerCase() === CARD_YEAR_KEY).date;
        const normalizedDate = new Date(focDate).getFullYear();

        if (normalizedDate !== NORMALIZED_DATE_ERROR && !isNaN(normalizedDate)) {
            return normalizedDate;
        } else {
            return undefined;
        }
    }

    function handleAddToFavs() {
        setLiked(!isLiked);
        onAddToFavs(!isLiked);
    }


    return (
        <article className={styles.card}>
            <img className={styles.thumbnail} src={composeThumbnailUrl(thumbnail)} alt={title} />
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.content}>
                {dates && <span className={styles.dates}>{getYear(dates)}</span>}
                <img onClick={handleAddToFavs} className={styles.fav} src={isLiked ? favIcon : notFavIcon} alt="" />
            </div>
        </article>
    )
};