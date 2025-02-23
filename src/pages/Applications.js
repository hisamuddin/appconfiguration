import React, { useState, useEffect } from 'react';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationForm from '../components/ApplicationForm';
import { getApplications, addApplication, updateApplication, deleteApplication } from '../utils/dataManager';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const handleSubmit = (appData) => {
    if (editingApp) {
      const updated = updateApplication(editingApp.id, appData);
      setApplications(getApplications());
    } else {
      const newApp = addApplication(appData);
      setApplications(getApplications());
    }
    setShowForm(false);
    setEditingApp(null);
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deleteApplication(id);
    setApplications(getApplications());
  };

  const handleToggle = (app) => {
    const updated = updateApplication(app.id, { enabled: !app.enabled });
    setApplications(getApplications());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Application
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ApplicationForm
            app={editingApp}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingApp(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.length > 0 ? (
          applications.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
}