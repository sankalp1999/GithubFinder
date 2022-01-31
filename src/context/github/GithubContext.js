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


        
    
    // Get users but for testing purposes
    const fetchUsers = async () => {
       
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

    // return <GithubContext.Provider value={{users:state.users, loading:state.loading, user:state.user,repos:state.repos, searchUsers, clearUsers, getUser,getUserRepos}}>
    //     {children}
    // </GithubContext.Provider>

    return <GithubContext.Provider value={{...state, dispatch}}>
    {children}
</GithubContext.Provider>
}

export default GithubContext;