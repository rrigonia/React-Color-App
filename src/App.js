import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";

function findPalette(id) {
	return seedColors.find(palette => palette.id === id);
}

function App() {
	return (
		<div>
			<Switch>
				<Route
					exact
					path="/"
					render={routerProps => (
						<PaletteList palettes={seedColors} {...routerProps} />
					)}
				/>
				<Route
					exact
					path="/palettes/:id"
					render={routerProps => (
						<Palette
							palette={generatePalette(
								findPalette(routerProps.match.params.id)
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
							palette={generatePalette(findPalette(routerProps.match.params.paletteId))}
							colorId={routerProps.match.params.colorId}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
