import React, { Component } from 'react';
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
        const {open, format} = this.state
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
            </div>
        )
    }
}

export default SingleColorPalette
