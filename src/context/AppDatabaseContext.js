import { createContext, useContext } from 'react';

const AppDatabaseContext = createContext(null);

export function AppDatabaseProvider({ appDatabase, children }) {
  return (
    <AppDatabaseContext.Provider value={appDatabase}>
      {children}
    </AppDatabaseContext.Provider>
  );
}

/**
 * Hook to access the entire app database
 * @returns {Array} The app database array
 */
export const useAppDatabase = () => {
  const appDatabase = useContext(AppDatabaseContext);
  if (!appDatabase) {
    throw new Error('useAppDatabase must be used within an AppDatabaseProvider');
  }
  return appDatabase;
};

/**
 * Hook to get screen data by screen name
 * @param {string} screenName - The name of the screen (e.g., 'landing_page', 'financial_dashboard')
 * @returns {Object|null} The screen data object or null if not found
 */
export const useScreenData = (screenName) => {
  const appDatabase = useAppDatabase();
  
  // Get the first persona (we only have one)
  const persona = appDatabase[0];
  
  // Find the screen by name
  const screen = persona?.screens?.find(s => s.screen_name === screenName);
  
  return screen || null;
};

/**
 * Hook to get visualization data by screen name and visualization name
 * @param {string} screenName - The name of the screen
 * @param {string} visualizationName - The name of the visualization
 * @returns {Object|null} The visualization data object or null if not found
 */
export const useVisualizationData = (screenName, visualizationName) => {
  const screen = useScreenData(screenName);
  
  if (!screen) return null;
  
  // Find the visualization by name
  const visualization = screen.visualizations?.find(v => v.name === visualizationName);
  
  return visualization || null;
};

/**
 * Hook to get all visualizations for a screen
 * @param {string} screenName - The name of the screen
 * @returns {Array} Array of visualizations or empty array if not found
 */
export const useScreenVisualizations = (screenName) => {
  const screen = useScreenData(screenName);
  return screen?.visualizations || [];
};

/**
 * Hook to get data_set from a specific visualization
 * @param {string} screenName - The name of the screen
 * @param {string} visualizationName - The name of the visualization
 * @returns {Object|null} The data_set object or null if not found
 */
export const useVisualizationDataSet = (screenName, visualizationName) => {
  const visualization = useVisualizationData(screenName, visualizationName);
  return visualization?.data_set || null;
};
