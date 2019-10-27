const filterReducer = (state = 'all', action) => {
    switch(action.type) {
        case 'FILTER_All': 
            return state = 'all';
        case 'FILTER_COMPLETED': 
            return state = 'completed';
        case 'FILTER_INCOMPLETE': 
            return state = 'incomplete';
        default: return state;  
    }
}

export default filterReducer;