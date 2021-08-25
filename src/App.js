import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
		this.state = {
			palettes: savedPalettes || seedColors
		};
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find(palette => palette.id === id);
	}
	savePalette(newPalette) {
		this.setState(
			{
				palettes: [ ...this.state.palettes, newPalette ]
			},
			this.syncLocalStorage
		);
	}
	syncLocalStorage() {
		window.localStorage.setItem(
			"palettes",
			JSON.stringify(this.state.palettes)
		);
	}
	deletePalette(id) {
		this.setState(
			st => ({ palettes: st.palettes.filter(p => p.id !== id) }),
			this.syncLocalStorage
		);
	}
	render() {
		const { palettes } = this.state;
		return (
			<div>
				<Route
					render={({ location }) => (
						<TransitionGroup>
							<CSSTransition
								key={location.key}
								classNames='fade'
								timeout={500}
							>
								<Switch location={location}>
									<Route
										exact
										path='/'
										render={routerProps => (
											<div className='page'>
												<PaletteList
													palettes={palettes}
													{...routerProps}
													deletePalette={this.deletePalette}
												/>
											</div>
										)}
									/>
									<Route
										exact
										path='/palettes/new'
										render={routerProps => (
											<div className='page'>
												<NewPaletteForm
													{...routerProps}
													palettes={palettes}
													savePalette={this.savePalette}
												/>
											</div>
										)}
									/>
									<Route
										exact
										path='/palettes/:id'
										render={routerProps => (
											<div className='page'>
												<Palette
													palette={generatePalette(
														this.findPalette(routerProps.match.params.id)
													)}
													{...routerProps}
												/>
											</div>
										)}
									/>
									<Route
										exact
										path='/palettes/:paletteId/:colorId'
										render={routerProps => (
											<div className='page'>
												<SingleColorPalette
													{...routerProps}
													palette={generatePalette(
														this.findPalette(routerProps.match.params.paletteId)
													)}
													colorId={routerProps.match.params.colorId}
												/>
											</div>
										)}
									/>
								</Switch>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
			</div>
		);
	}
}

export default App;
