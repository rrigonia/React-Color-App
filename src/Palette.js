import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";



class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500, format: 'hex', open: false };
		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
		this.closeSnackBar = this.closeSnackBar.bind(this);
	}
	changeLevel(level) {
		this.setState({ level });
	}
	changeFormat(e){
		this.setState({format: e.target.value, open: true})
		// alert(e.target.value)
	}
	closeSnackBar(){
		this.setState({open: false});
	}
	render() {
		const { colors } = this.props.palette;
		const { level, format, open } = this.state;
		const colorBoxes = colors[level].map(color => (
			<ColorBox background={color.[format]} name={color.name} />
		));
		return (
			<div className="Palette">
				<Navbar open={open} format={format} level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} closeSnackBar={this.closeSnackBar} />
				{/* navbar goes here */}
				<div className="Palette-colors">{colorBoxes}</div>
				{/* footer goes here */}
			</div>
		);
	}
}

export default Palette;
