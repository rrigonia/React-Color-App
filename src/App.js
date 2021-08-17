import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";
import { Switch, Route, NavLink } from "react-router-dom";
import PaletteList from "./PaletteList";


function findPalette(id){
	return seedColors.find(palette => (palette.id === id))
}

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/" render={(routerProps) => <PaletteList palettes={seedColors} {...routerProps}  />} />
				<Route 
					exact 
					path="/palettes/:id" 
					render={routerProps =>
							<Palette 
								palette={generatePalette(
									findPalette(routerProps.match.params.id)
								)}
								{...routerProps} 
							/> }
				/>
			</Switch>
		</div>
	);
}

export default App;
