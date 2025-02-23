import React, { useState, useEffect } from 'react';

export default function ApplicationForm({ app, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    enabled: true,
  });

  useEffect(() => {
    if (app) {
      setFormData(app);
    }
  }, [app]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 md:text-base">
          Application Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 md:text-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center md:mt-4">

        <input
          type="checkbox"
          checked={formData.enabled}
          onChange={(e) =>
            setFormData({ ...formData, enabled: e.target.checked })
          }
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">Enabled</label>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:px-6 md:py-3"
        >
          {app ? 'Update' : 'Create'} Application
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 md:px-6 md:py-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
