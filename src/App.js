import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
		this.state = {
			palettes: savedPalettes || seedColors
		};
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find(palette => palette.id === id);
	}
	savePalette(newPalette) {
		this.setState({
			palettes: [ ...this.state.palettes, newPalette ]
		}, this.syncLocalStorage);
		
	}
	syncLocalStorage() {
		window.localStorage.setItem(
			"palettes",
			JSON.stringify(this.state.palettes)
		);
	}
	render() {
		const { palettes } = this.state;
		return (
			<div>
				<Switch>
					<Route
						exact
						path='/'
						render={routerProps => (
							<PaletteList palettes={palettes} {...routerProps} />
						)}
					/>
					<Route
						exact
						path='/palettes/new'
						render={routerProps => (
							<NewPaletteForm
								{...routerProps}
								palettes={palettes}
								savePalette={this.savePalette}
							/>
						)}
					/>
					<Route
						exact
						path='/palettes/:id'
						render={routerProps => (
							<Palette
								palette={generatePalette(
									this.findPalette(routerProps.match.params.id)
								)}
								{...routerProps}
							/>
						)}
					/>
					<Route
						exact
						path='/palettes/:paletteId/:colorId'
						render={routerProps => (
							<SingleColorPalette
								{...routerProps}
								palette={generatePalette(
									this.findPalette(routerProps.match.params.paletteId)
								)}
								colorId={routerProps.match.params.colorId}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
