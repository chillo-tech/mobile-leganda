import React, {createContext} from 'react';
import {ApplicationContext} from './ApplicationContextProvider';
import axios from 'axios';
import {LOCAL_DNS} from '../utils';
import jwt_decode from 'jwt-decode';

export const SecurityContext = createContext(null);

function SecurityContextProvider({children}) {
	const {state, signIn, signOut} = React.useContext(ApplicationContext);
	const {authenticatedUser = {}} = state;
	const {accessToken, refreshToken, location} = authenticatedUser;
	const BACKOFFICE_URL = `${LOCAL_DNS}/api/v1`;

	const {searchCriteria} = state;
	const {page, size} = searchCriteria;

	const protectedAxios = axios.create({
		baseURL: BACKOFFICE_URL,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		params: {
			page,
			size
		}
	});

	const publicAxios = axios.create({
		baseURL: BACKOFFICE_URL,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	protectedAxios.interceptors.request.use(
		(config = {}) => {
			config.headers.Cookie = `accessToken=${accessToken};`
			return config;
		},
		error => {
			return Promise.reject(error);
		},
	)

	// Response interceptor for API calls
	protectedAxios.interceptors.response.use((response) => {
		return response
	}, async function (error) {
		const originalRequest = error.config;
		if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
			originalRequest._retry = true;
			const newAccessToken = await refreshAccessToken();
			axios.defaults.headers.common['Cookie'] = `accessToken=${newAccessToken};`;
			return protectedAxios(originalRequest);
		}
		return Promise.reject(error);
	});

	const refreshAccessToken = async () => {
		try {
			const response = await publicAxios.post(
				"refresh-token",
				{refreshToken}
			);
			const {data} = response;
			if (accessToken) {
				const decoded = jwt_decode<Profile>(accessToken);
				signIn({...decoded, accessToken: data['accessToken'], refreshToken: data['refreshToken'], location});
			}
			return accessToken;
		} catch (e) {
			signOut();
		}
	};

	return (
		<SecurityContext.Provider value={{publicAxios, protectedAxios}}>
			{children}
		</SecurityContext.Provider>
	);
}

export default SecurityContextProvider;
