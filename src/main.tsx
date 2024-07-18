import React from "react"
import ReactDOM from "react-dom/client"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"

import App from "./App.tsx"
import "./index.css"

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:3001/shop-api"
})

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
)
