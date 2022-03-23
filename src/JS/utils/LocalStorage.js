const LocalStorage = () => {
    const get = (key) => {
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    };
    
    const set = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const remove = (key) => {
        localStorage.removeItem(key);
    };
    
    return {
        get,
        set,
        remove,
    };
}

export default LocalStorage;