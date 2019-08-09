import React, {useState} from 'react';

const UserContext = React.createContext(
    [{}, () => {
    }]
);

const UserProvider = (props) => {
    const [state, setState] = useState({logged: false});
    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserProvider};
export default UserContext;

// Reference: https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react