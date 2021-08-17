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
		const { colors, paletteName, emoji,id } = this.props.palette;
		const { level, format, open } = this.state;
		const colorBoxes = colors[level].map(color => (
			<ColorBox key={color.id} background={color.[format]} name={color.name} palette={id} id={color.id} />
		));
		return (
			<div className="Palette">
				<Navbar 
					open={open} 
					format={format} 
					level={level} 
					changeLevel={this.changeLevel} 
					handleChange={this.changeFormat} 
					closeSnackBar={this.closeSnackBar}
					isShow="true" 
				/>
				<div className="Palette-colors">{colorBoxes}</div>
				<footer className="Palette-footer">
					{paletteName}
					<span className="footer-emoji">{emoji}</span>
				</footer>
			</div>
		);
	}
}

export default Palette;
