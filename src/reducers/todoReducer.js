
const todoReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO': return [
            ...state, {
                id: action.id,
                groupid: action.groupid,
                text: action.text,
                completed: false
            }
        ]

        case 'DELETE_TODO': 
            return state.filter(todo => {
                if(action.id === todo.id)return false
                return true
            });

        case 'TOGGLE_TODO': 
            return state.map(todo => 
                todo.id === action.id ? { ...todo, completed: !todo.completed}: todo
            ); 

        default: return state;
    }
}

export default todoReducer;