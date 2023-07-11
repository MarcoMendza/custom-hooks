import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer";

export const useTodos = () => {

    const initialState = [
        // {
        //     id: new Date().getTime(),
        //     description: 'Take the soul stone',
        //     done: false,
        // },
    ]
    
    const init = () => {
        return JSON.parse( localStorage.getItem('todos')) || [];
    }

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
        }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }
        
        dispatch( action ); 
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: 'Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: 'Toggle Todo',
            payload: id
        })
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length,
        handleDeleteTodo, 
        handleToggleTodo, 
        handleNewTodo,
    }
}