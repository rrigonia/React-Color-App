import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

class SingleColorPalette extends Component {
    constructor(props) {
		super(props);
		this.state = {format: 'hex', open: false };
		this.changeFormat = this.changeFormat.bind(this);
		this.closeSnackBar = this.closeSnackBar.bind(this);
	}
    changeFormat(e){
		this.setState({format: e.target.value, open: true})
		// alert(e.target.value)
	}
	closeSnackBar(){
		this.setState({open: false});
	}
    render() {
        const {open, format} = this.state;
        const {palette, match} = this.props
        const generateColors = () => {
            let colors = []
            for(let idx in palette.colors){
               for (let color of palette.colors[idx]){
                (color.id === match.params.colorId) && colors.push(color)
               }
            };
            console.log(colors)
            return colors;
        }
        let allColors = generateColors().filter(c => c.hex !== "#ffffff");
        return (
            <div>
                <Navbar 
					open={open} 
					format={format} 
					handleChange={this.changeFormat} 
					closeSnackBar={this.closeSnackBar}
                    isShow={false} 
				/>
                <h1>Hellos </h1>
                <div>
                    {allColors.map(color => (
                        <ColorBox name={color.name} background={color.[format]} />
                    ))}
                </div>
            </div>
        )
    }
}

export default SingleColorPalette
