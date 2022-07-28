export const saveDataToLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`${key} saved in LocalStorage`);
};

export const getDataFromLocal = (key) => {
    try{
        let localData = localStorage.getItem(key) || undefined;
        return localData;
    }catch(err){
        console.log(err);
    }
};

export const removeDataFromLocal = (key) => {
    try{
        localStorage.removeItem(key);
        console.log(`${key} removed from LocalStorage`);
    }catch(err){
        console.log(err);
    }
};

