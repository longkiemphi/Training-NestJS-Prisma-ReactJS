import LogOut from "../auths/LogOut";
import { Outlet } from 'react-router-dom';

const LayoutAdmin = ({ children }) => {
    return (
        <>
            <header className="bg-dark text-white p-1 fixed-top pb-none">
                <div className="container d-flex justify-content-between">
                    <h2>Product Management System</h2>
                    <LogOut></LogOut>
                </div>
            </header>
            <main className="mt-2 pt-5">
                <Outlet>
                    {children}
                </Outlet>
            </main>
        </>
    );
};

export default LayoutAdmin;