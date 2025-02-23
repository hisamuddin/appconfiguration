import React from 'react';
import { Link } from 'react-router-dom';

export default function ApplicationCard({ app, onEdit, onDelete, onToggle }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{app.name}</h3>
          <p className="text-gray-600 mt-2">{app.description}</p>
          <Link
            to={`/config?appId=${app.id}`}
            className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800"
          >
            Manage Configuration →
          </Link>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(app)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(app.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
          <button
            onClick={() => onToggle(app)}
            className={`${
              app.enabled ? 'text-green-600' : 'text-gray-600'
            } hover:opacity-80`}
          >
            {app.enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
}