import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    // const [users, setUsers] = useState([])
    // const [loading, setLoading] = useState(true)

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState) 
        //dispatch an action to our reducer


        const searchUsers = async (text) => {
            
            setLoading() // text is written by users
            

            const params = new URLSearchParams({
                q:text
            })


            const response = await fetch(`${GITHUB_URL}/search/users?${params}`,
                {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}` // send bearer token also
                    },
                })
        
            const {items} = await response.json()
    
            dispatch({
                type: 'GET_USERS',
                payload:items,
            })
        }
        
    
    // Clear user
    const clearUsers = () => dispatch({type:'CLEAR_USERS'})
        
    
    // Get users but for testing purposes
    const fetchUsers = async () => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users`,
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}` // send bearer token also
                },
            })
    
        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload:data,
        })
    }

    const setLoading = () => dispatch({type:'SET_LOADING'})


    const getUser = async (login) => {
            
        setLoading() // text is written by users
        
        const response = await fetch(`${GITHUB_URL}/users/${login}`,
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}` // send bearer token also
                },
            })

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
            console.log("Please")
            dispatch({
                type: 'GET_USER',
                payload:data,
            })
        }
    }

    const getUserRepos = async (login) => {
            
        setLoading() // text is written by users
        
        const params = new URLSearchParams({
            sort: 'created',
            per_page:10
        })


        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}` // send bearer token also
                },
            })
    
        const data = await response.json()

        dispatch({
            type: 'GET_REPOS',
            payload:data,
        })
    }






    return <GithubContext.Provider value={{users:state.users, loading:state.loading, user:state.user,repos:state.repos, searchUsers, clearUsers, getUser,getUserRepos}}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;