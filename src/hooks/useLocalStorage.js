export const useLocalStorage = () => {
    function setToStorage(key, value) {
        const normalizedValue = JSON.stringify(value);
        localStorage.setItem(key, normalizedValue);
    }

    function getFromStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    return {
        getFromStorage,
        setToStorage,
    }
}
