import React from 'react'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import {withRouter, useParams} from 'react-router-dom'

const Todo = ({todos, onAddTodo, onToggleTodo, onDeleteTodo, filters, onFilterAll, onFilterCompleted, onFilterInComplete}) => {
    let input;
    console.log(todos);
    let {id} = useParams();

    const filterAll = () => onFilterAll()
    const filterCompleted = () => onFilterCompleted()
    const filterIncompleted = () => onFilterInComplete()

    const groupFilter = todos.filter(todo => {
        return todo.groupid === id
    })

    const filterTodos = groupFilter.filter((todo) => {
        if(filters === 'all') return true
        if(filters === 'completed') return todo.completed
        if(filters === 'incomplete') return !todo.completed
        return false
    })

    const todoList = filterTodos.map(t => {
        const toggle = (e) =>{
            e.preventDefault();
            onToggleTodo(t.id);
        }
        const remove = (e) =>{
            e.preventDefault();
            onDeleteTodo(t.id);
        }

        return (
                <div key={t.id} style={{ textDecoration: t.completed ? 'line-through' : 'none' }} className="todo">
                    {t.text} 
                    <button type="button" onClick={toggle} className="complete">Toggle</button>
                    <button type="button" onClick={remove} className="close">x</button>
                </div>
                );
    });

    let completedTodos = 0 
    let incompleteTodos = 0
    todos.filter(todo => {
        if(todo.completed === true && todo.groupid === id) return completedTodos++
        if(todo.completed === false && todo.groupid === id) return incompleteTodos++
        return todo
    })
    let allTodos = completedTodos + incompleteTodos

    return (
        <div>
            <form onSubmit={e => {
            e.preventDefault();
            if(!input.value.trim()){
                return;
            }
            onAddTodo(input.value, id)
            input.value = ''
            }}>
                <input type="text" className="input" ref={node => (input = node)} placeholder="Add todo..." />
                <button type="submit" value="Submit" className="submit">Submit</button>
            </form>
            <button  onClick={filterAll}  className="submit">All</button>
            <button  onClick={filterCompleted} className="submit">Completed</button>
            <button  onClick={filterIncompleted} className="submit">InCompleted</button>
            <h3>{todoList}</h3>
            <h4>All: {allTodos} Completed: {completedTodos} Incompleted: {incompleteTodos}</h4>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        todos: state.todoReducer,
        filters: state.filterReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        onAddTodo: (value,id) => dispatch({type: 'ADD_TODO', text: value, id: uuidv1(), groupid: id}),
        onDeleteTodo: (id) => dispatch({type: 'DELETE_TODO', id: id}),
        onToggleTodo: (id) => dispatch({type: 'TOGGLE_TODO', id: id}),
        onFilterCompleted: () => dispatch({type: 'FILTER_COMPLETED'}),
        onFilterInComplete: () => dispatch({type: 'FILTER_INCOMPLETE'}),
        onFilterAll: () => dispatch({type: 'FILTER_All'})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Todo));