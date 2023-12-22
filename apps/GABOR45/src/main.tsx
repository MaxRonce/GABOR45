import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";

defineCustomElements(window);
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<DevSupport
			ComponentPreviews={ComponentPreviews}
			useInitialHook={useInitial}
		>
			<App />
		</DevSupport>
	</React.StrictMode>
);
