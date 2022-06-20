import {Platform} from 'react-native';

export const PHONE = "+33761705745";
export const EMAIL = "achille.mbougueng@yahoo.fr";
export const smsDivider = (): string => {
	return Platform.OS === "ios" ? "&" : "?";
}

export const phonePrefix = (): string => {
	return Platform.OS !== 'android' ? "telprompt" : "tel";
}

export const MAPBOX_API_KEY = "pk.eyJ1IjoiYWNoaWxsZW1ib3VndWVuZyIsImEiOiJja3Zvd3EzcmswaThkMnZrZ25iYmtveDBhIn0.pDR7pKL18d3iz5NoaRmWYg";
export const MAPBOX_PLACES = "https://api.mapbox.com/geocoding/v5/mapbox.places";

