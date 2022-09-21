//Ændrer tal til tusindtal seperator
export const PriceToDK = (num) => {
    return Number(num).toLocaleString('da-DK')
}

//Ændrer min dato til Dag(dato) - Måned - År
export const ConvertedDate = (date, withYear) => {
    const month = [
        "Januar", "Februar", "Marts", 
        "April", "Maj", "Juni", 
        "Juli", "August", "September", 
        "Oktober", "November", "December"
    ];
        
    let myDate = new Date(date)
    
    if (withYear) {
        return myDate.getDate() + '. ' + month[myDate.getMonth()] + ' ' + myDate.getFullYear();
    } else{
        return myDate.getDate() + '. ' + month[myDate.getMonth()];
    }
    
}

//Forkorter en string (bruges ift mit description meta tag)
export const StrConverter = (str) => {
    const Str = String(str);
    return Str.substring(0, 150);
}

export const DescriptionConverter = (str) => {
    const Str = String(str);
    return Str.substring(0, 350);
}