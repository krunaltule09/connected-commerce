import { createContext, useContext } from 'react';

const ConfigContext = createContext(null);

export function ConfigProvider({ config, children }) {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return config;
};

export const useAppDatabase = () => {
  const { database } = useConfig();
  return database;
};

export const useScreenData = (screenName) => {
  const database = useAppDatabase();
  const screen = database?.screens?.find(s => s.screen_name === screenName);
  return screen || null;
};

export const useVisualizationData = (screenName, visualizationName) => {
  const screen = useScreenData(screenName);
  if (!screen) return null;
  const visualization = screen.visualizations?.find(v => v.name === visualizationName);
  return visualization || null;
};

export const useScreenVisualizations = (screenName) => {
  const screen = useScreenData(screenName);
  return screen?.visualizations || [];
};

export const useVisualizationDataSet = (screenName, visualizationName) => {
  const visualization = useVisualizationData(screenName, visualizationName);
  return visualization?.data_set || null;
};
