import React from 'react';
import './header-component.css'

class HeaderComp extends React.Component{
    render(){
                return(
                    <div className="main-header">
                        <ul>
                            <li><a href='/'>trang chu</a></li>
                            <li><a href='./Products'>san pham</a></li>
                            <li><a href='./'>tin tuc</a></li>
                            <li>nong trai</li>
                            <li>lien he</li>
                        </ul>
                    </div>
                )
            }
}

export default HeaderComp