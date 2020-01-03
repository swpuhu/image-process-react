import React from 'react';
import FileMenu from '../components/FileMenu';

function Header({children}) {
    return (
        <div className="header">
            <FileMenu/>
        </div>
    )
}

export default Header;