import React from 'react';
import { Link } from 'react-router-dom';

export default function ApplicationCard({ app, onEdit, onDelete, onToggle }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 md:p-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold md:text-2xl">{app.name}</h3>
          <p className="text-gray-600 mt-2 md:text-lg">{app.description}</p>
          <Link
            to={`/config?appId=${app.id}`}
            className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800 md:text-base"
          >
            Manage Configuration →
          </Link>
        </div>
        <div className="flex space-x-2">
          <button
            className="text-sm md:text-base text-blue-600 hover:text-blue-800"
            onClick={() => onEdit(app)}
          >
            Edit
          </button>
          <button
            className="text-sm md:text-base text-red-600 hover:text-red-800"
            onClick={() => onDelete(app.id)}
          >
            Delete
          </button>
          <button
            className="text-sm md:text-base hover:opacity-80"
            onClick={() => onToggle(app)}
            className={`${app.enabled ? 'text-green-600' : 'text-gray-600'}`}
          >
            {app.enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
}
