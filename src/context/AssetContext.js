import { createContext, useContext } from 'react';
import DEFAULT_ASSETS from '../data/assetPaths';

export const AssetContext = createContext(DEFAULT_ASSETS);

export const useAssets = () => useContext(AssetContext);
