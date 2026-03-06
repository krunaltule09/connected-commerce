import React from 'react';
import { useConfig } from './context/ConfigContext';

/**
 * Example component showcasing how to use ConfigContext to access assets and database.
 * Must be rendered inside ConfigProvider (wraps the app in App.js).
 */
export default function Example() {
  const config = useConfig();

  // Access assets - object mapping asset names to URLs
  const { assets } = config;

  // Access database - array of stations with screens and visualizations
  const database = config.database;

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>ConfigContext Usage Example</h1>

      {/* Example 1: Get asset URL by name */}
      <section style={{ marginBottom: 32 }}>
        <h2>1. Get asset URL by name</h2>
        <p>Use assets[assetName] to resolve a path:</p>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4, overflow: 'auto' }}>
{`const logoUrl = assets['BCM_OperateTable_EY_Logo.svg'];
<img src={logoUrl} alt="Logo" />`}
        </pre>
        {assets['BCM_OperateTable_EY_Logo.svg'] && (
          <img
            src={assets['BCM_OperateTable_EY_Logo.svg']}
            alt="EY Logo"
            style={{ height: 48, marginTop: 8 }}
          />
        )}
      </section>

      {/* Example 2: Resolve asset from database reference */}
      <section style={{ marginBottom: 32 }}>
        <h2>2. Resolve asset from database</h2>
        <p>Database references asset names; resolve them via assets:</p>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4, overflow: 'auto' }}>
{`// From database: data_set.data_set.background_video = 'Particles_loop.mp4'
const assetName = 'Particles_loop.mp4';
const url = assets[assetName] ?? assetName; // fallback if not in assets`}
        </pre>
      </section>

      {/* Example 3: Traverse database structure */}
      <section style={{ marginBottom: 32 }}>
        <h2>3. Traverse database structure</h2>
        <p>Database shape: stations → screens → visualizations → data_sets</p>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4, overflow: 'auto' }}>
{`// database is an array of stations
database.forEach((station) => {
  const { station: stationName, screens } = station;
  screens?.forEach((screen) => {
    const { screen_name, visualizations } = screen;
    visualizations?.forEach((viz) => {
      const { chart_type, data_sets } = viz;
      data_sets?.forEach((ds) => {
        const data = ds.data_set;
        // data may contain: image, background_video, background_sound, characters, etc.
      });
    });
  });
});`}
        </pre>
      </section>

      {/* Example 4: Live data from database */}
      <section style={{ marginBottom: 32 }}>
        <h2>4. Sample from database</h2>
        {database?.[0]?.screens?.[0]?.visualizations?.[0]?.data_sets?.[0]?.data_set && (
          <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4, overflow: 'auto', fontSize: 12 }}>
            {JSON.stringify(
              database[0].screens[0].visualizations[0].data_sets[0].data_set,
              null,
              2
            )}
          </pre>
        )}
      </section>

      {/* Example 5: Render character with resolved image */}
      <section style={{ marginBottom: 32 }}>
        <h2>5. Render character with resolved image</h2>
        {(() => {
          const character =
            database?.[0]?.screens?.[1]?.visualizations?.[0]?.data_sets?.[0]?.data_set
              ?.characters?.[0];
          if (!character) return <p>No character data in database.</p>;
          const imageUrl = assets[character.image] ?? character.image;
          return (
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <img
                src={imageUrl}
                alt={character.name}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
              />
              <div>
                <strong>{character.name}</strong>
                <br />
                <small>{character.shortDescription}</small>
              </div>
            </div>
          );
        })()}
      </section>
    </div>
  );
}
