import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getApplications,
  getConfigurations,
  getConfigurationsByAppId,
  addConfiguration,
  updateConfiguration,
  deleteConfiguration
} from '../utils/dataManager';

export default function Configuration() {
  const [searchParams] = useSearchParams();
  const [configs, setConfigs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [formData, setFormData] = useState({
    appId: '',
    key: '',
    value: '',
    description: '',
  });

  useEffect(() => {
    const appId = searchParams.get('appId');
    if (appId) {
      setFormData(prev => ({ ...prev, appId }));
      setShowForm(true);
      setConfigs(getConfigurationsByAppId(appId));
    } else {
      setConfigs(getConfigurations());
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingConfig) {
      updateConfiguration(editingConfig.id, formData);
    } else {
      addConfiguration(formData);
    }
    const appId = formData.appId;
    setConfigs(appId ? getConfigurationsByAppId(appId) : getConfigurations());
    setShowForm(false);
    setEditingConfig(null);
    setFormData({ appId: '', key: '', value: '', description: '' });
  };

  const handleDelete = (id) => {
    deleteConfiguration(id);
    const appId = searchParams.get('appId');
    setConfigs(appId ? getConfigurationsByAppId(appId) : getConfigurations());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Configuration - <span className="font-bold italic">{formData.appId}</span>
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Configuration
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Application
            </label>
            <select
              value={formData.appId}
              onChange={(e) => setFormData({ ...formData, appId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select an application</option>
              {getApplications().filter(app => !app.isDeleted).map(app => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Key
            </label>
            <input
              type="text"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingConfig ? 'Update' : 'Create'} Configuration
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingConfig(null);
                setFormData({ appId: '', key: '', value: '', description: '' });
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App ID
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application Name
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {configs.map((config) => (
              <tr key={config.id}>
                <td className="px-6 py-4 whitespace-nowrap">{config.appId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{config.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{config.value}</td>
                <td className="px-6 py-4 whitespace-nowrap">{config.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditingConfig(config);
                      setFormData(config);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(config.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
