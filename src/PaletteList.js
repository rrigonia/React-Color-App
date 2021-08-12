import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PaletteList.css'


export class Home extends Component {
    render() {
        const {palettes} = this.props;
        const links = palettes.map(p => (
            <li className="Home-items">
                <Link className="Home-links" to={`/palettes/${p.id}`}>
                    {p.paletteName.toUpperCase()} <span className="Home-emoji">{p.emoji}</span>
                </Link>
            </li>
        ));

        return (
            <div className="Home">
                <h1 className="Home-title">Color Palettes</h1>
               <ul className="Home-palettes">
                    {links}
                </ul>
            </div>
        )
    }
}

export default Home
