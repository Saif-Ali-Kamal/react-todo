const groupReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_GROUP': 
            return [
                ...state, {
                    id: action.id,
                    name: action.name
                    }
            ];
        case 'DELETE_GROUP':
            return state.filter(group => {
                if(action.id === group.id)return false
                return true
            });
        default: return state;
    }
}

export default groupReducer;