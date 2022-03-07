import React, {useContext, useEffect, useState} from 'react';
import {colors, FAVORITE_ENDPOINT, PLUS_FAVORITES_UPDATED, REMOVE_FAVORITES_UPDATED} from '../../utils';
import IconButton from './IconButton';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {SecurityContext} from '../../context/SecurityContextProvider';

function FavoriteButton({selectedId, favoriteCallBack}) {
	const {protectedAxios} = useContext(SecurityContext);
	const {state: {ad}, updateUserInfos} = useContext(ApplicationContext);
	const [isFavorite, setIsFavorite] = useState(false);

	const setButtonState = async () => {
		const {data: favoritesIds} = await protectedAxios.get(
			`${FAVORITE_ENDPOINT}`
		);
		setIsFavorite(favoritesIds.includes(ad?.profile?.id));
		updateUserInfos(favoritesIds);
	}
	const handleFavorite = async () => {
		try {
			const action = isFavorite ? "REMOVE" : "ADD";
			const message = isFavorite ? REMOVE_FAVORITES_UPDATED : PLUS_FAVORITES_UPDATED;
			await protectedAxios.put(
				`${FAVORITE_ENDPOINT}/toggle`,
				{
					id: selectedId,
					action
				}
			);
			favoriteCallBack(message);
			setButtonState();
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(() => {
		setButtonState();
	}, [ad]);

	return (
		<IconButton icon={isFavorite ? "heart" : "hearto"} size={24}
					color={isFavorite ? colors.warning : colors.primary} onclick={handleFavorite}/>
	);
}

export default FavoriteButton;
