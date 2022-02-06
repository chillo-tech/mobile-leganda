import React, {createContext} from 'react';
import {ApplicationContext} from './ApplicationContextProvider';
import axios from 'axios';
import {LOCAL_DNS} from '../utils';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import jwt_decode from 'jwt-decode';

export const SecurityContext = createContext(null);

function SecurityContextProvider({children}) {
	const {state, signIn, signOut} = React.useContext(ApplicationContext);
	const {authenticatedUser = {}} = state;
	const {accessToken, refreshToken} = authenticatedUser;
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

	const refreshAuthLogic = failedRequest => {
		const options = {
			method: 'POST',
			data: {
				refreshToken,
			},
			url: `${BACKOFFICE_URL}/refresh-token`,
		};

		return axios(options)
			.then(async tokenRefreshResponse => {
				console.log({tokenRefreshResponse})
				const {data: {accessToken, refreshToken}} = tokenRefreshResponse;
				failedRequest.response.config.headers.Cookie = `accessToken=${accessToken};`
				console.log({accessToken, refreshToken})
				if (accessToken) {
					const decoded = jwt_decode<Profile>(accessToken);
					signIn({...decoded, accessToken, refreshToken});
				}
				return Promise.resolve();
			})
			.catch(() => {
				signOut();
			});
	};

	createAuthRefreshInterceptor(protectedAxios, refreshAuthLogic, {});

	return (
		<SecurityContext.Provider value={{publicAxios, protectedAxios}}>
			{children}
		</SecurityContext.Provider>
	);
}

export default SecurityContextProvider;
