import PropTypes from 'prop-types'



const UserItem = ({ user:{login, avatar_url} }) => {

    return <div className='card shadow-md compact side bg-base-100'>
    
        <div>
        
        
            <div className='avatar'>
            
            
                <div className="rounded-full shadow w-14 h-14">
                    <img src={avatar_url} alt="Profile"/>        
                </div>
            </div>    
        </div>
    
    </div>


}


UserItem.propTypes = {
    user:PropTypes.object.isRequired,
}

 
export default UserItem;