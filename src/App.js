import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { Component } from "react";


class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			palettes: seedColors
		}
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find(palette => palette.id === id);
	}
	savePalette(newPalette){
		this.setState({
			palettes: [...seedColors, newPalette]
		})
	}
	render(){
		
		return (
			<div>
				<Switch>
					<Route
						exact
						path="/"
						render={routerProps => (
							<PaletteList palettes={this.state.palettes} {...routerProps} />
						)}
					/>
					<Route exact path="/palettes/new" render={(routerProps) => <NewPaletteForm {...routerProps} savePalette={this.savePalette} /> } />
					<Route
						exact
						path="/palettes/:id"
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
						path="/palettes/:paletteId/:colorId"
						render={routerProps => (
							<SingleColorPalette
								{...routerProps}
								palette={generatePalette(this.findPalette(routerProps.match.params.paletteId))}
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
