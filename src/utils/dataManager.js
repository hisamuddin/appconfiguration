import applicationsData from '../data/applications.json';
import configurationsData from '../data/configurations.json';

// Applications
let applications = applicationsData.applications;
let configurations = configurationsData.configurations;

export const getApplications = () => {
  return applications.filter(app => !app.isDeleted);
};

export const addApplication = (application) => {
  const newApp = {
    ...application,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    isDeleted: false
  };
  applications = [...applications, newApp];
  return newApp;
};

export const updateApplication = (id, updatedApp) => {
  applications = applications.map(app =>
    app.id === id ? { ...app, ...updatedApp, updatedAt: new Date().toISOString() } : app
  );
  return applications.find(app => app.id === id);
};

export const deleteApplication = (id) => {
  applications = applications.map(app =>
    app.id === id ? { ...app, isDeleted: true, deletedAt: new Date().toISOString() } : app
  );
};

// Configurations
export const getConfigurations = () => {
  return configurations.filter(config => !config.isDeleted);
};

export const getConfigurationsByAppId = (appId) => {
  return configurations.filter(config => config.appId === appId && !config.isDeleted);
};

export const addConfiguration = (configuration) => {
  const newConfig = {
    ...configuration,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    isDeleted: false
  };
  configurations = [...configurations, newConfig];
  return newConfig;
};

export const updateConfiguration = (id, updatedConfig) => {
  configurations = configurations.map(config =>
    config.id === id ? { ...config, ...updatedConfig, updatedAt: new Date().toISOString() } : config
  );
  return configurations.find(config => config.id === id);
};

export const deleteConfiguration = (id) => {
  configurations = configurations.map(config =>
    config.id === id ? { ...config, isDeleted: true, deletedAt: new Date().toISOString() } : config
  );
};