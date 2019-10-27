import React from 'react'
import { connect } from 'react-redux';
import './App.css';
import uuidv1 from 'uuid/v1';
import { Link, withRouter } from 'react-router-dom';

const Group = ({onAddGroup, groups, onDeleteGroup, todos}) => {
    let input;
    console.log(groups);
    const groupList = groups.map(g => {
        const remove = (e) =>{
            e.preventDefault();
            onDeleteGroup(g.id);
        }
       
        const allTodo = todos.filter(todo => {
            if(todo.groupid === g.id){
                return true
            }
            return false
        })
        const completedTodo = todos.filter(todo => {
            if(todo.groupid === g.id && todo.completed === true){
                return true
            }
            return false
        })
        const incompleteTodo = todos.filter(todo => {
            if(todo.groupid === g.id && todo.completed === false){
                return true
            }
            return false
        })
     
        return (
                <div key={g.id}>
                <Link  to={'/' + g.id}><h2>{g.name}</h2></Link>
                <h4>All: {allTodo.length} Completed: {completedTodo.length} Incompleted: {incompleteTodo.length}</h4>
                <button  type="button" onClick={remove} className="close">x</button>
                </div>
        );
    });

    return (
    <div>
        <form onSubmit={e => {
            e.preventDefault();
            if(!input.value.trim()){
                return;
            }
            onAddGroup(input.value)
            input.value = ''
        }}>
                <input type="text" className="input" placeholder="Add Group..." ref={node => (input = node)} />
                <button type="submit" value="Submit" className="submit">Submit</button>

        </form>
        <h3>{groupList}</h3>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        groups : state.groupReducer,
        todos: state.todoReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddGroup: (value) => dispatch({type: 'ADD_GROUP', name: value, id: uuidv1()}),
        onDeleteGroup: (gid) => dispatch({type: 'DELETE_GROUP', id: gid})
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Group));