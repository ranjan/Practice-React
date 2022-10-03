import { useContext } from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from './hooks/useWindowSize';
import DataContext from './context/DataContext';


const Header = ({ title }) => {
    const { width } = useWindowSize();
    const { isAuthenticated } = useContext(DataContext);


    return (
        <header className="Header">
            <h1>{title}</h1>
            {width < 768 ? <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                    : <FaLaptop />}
            <p style={{color: 'red'}}>{ isAuthenticated() ? `Welcome  ${JSON.parse(localStorage.getItem('user')).name} !!` : '' }</p> 
        </header>
    )
}

export default Header
