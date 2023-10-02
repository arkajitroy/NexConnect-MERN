import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducers";
import Head from "next/head";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}
