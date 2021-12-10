import React from "react";
import { Provider } from "react-redux";

import Footer from "./components/footer";
import Header from "./components/header";
import "./style/style.scss";
import HomePage from "./pages/home";
import { store } from "./store/store";

const App = () => (
	<Provider store={store}>
		<div className="gtr-flex gtr-flex-col">
			<Header />
			<HomePage />
			<div id="gtr-bottom-menu" />
			<Footer />
		</div>
	</Provider>
);

export default App;
