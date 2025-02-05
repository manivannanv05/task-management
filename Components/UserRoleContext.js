import { createContext, useContext, useState } from "react";

const RoleContext = createContext({
    role: 'guest', // Default value
    setRole: () => {} // Empty function to avoid errors if no provider
});

export const RolesProvider = ({ children }) => {

    const [role, setRole] = useState('guest');

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );

};

export const UserRoles = () => {
    const roleContext = useContext(RoleContext);

    if (!roleContext) {
        throw new Error('no access')
    }
    return roleContext;
}