import React from 'react';

interface AdminToolbarProps {
  isAdmin: boolean;
  onLogout: () => void;
  onSave: () => void;
  onCancel: () => void;
  onOpenSeoSettings: () => void;
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ isAdmin, onLogout, onSave, onCancel, onOpenSeoSettings }) => {
  if (!isAdmin) {
    return null;
  }

  // ==========================================================
  // PERUBAHAN: Link di bawah ini sudah diganti sesuai permintaan Anda.
  // ==========================================================
  const datoCmsUrl = `https://portfolio-wahyu.admin.datocms.com/editor`;

  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white p-3 flex justify-between items-center z-50 shadow-lg h-[50px]">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <p className="font-semibold text-sm">
          <span className="font-bold">Admin Mode</span>
        </p>
        <div className="flex items-center gap-2 flex-wrap">
           <button
            onClick={onOpenSeoSettings}
            className="bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            SEO Settings
          </button>
          <a
            href={datoCmsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            Edit in CMS
          </a>
          <button
            onClick={onCancel}
            className="bg-slate-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-slate-600 transition-colors text-sm"
          >
            Cancel
          </button>
           <button
            onClick={onSave}
            className="bg-sky-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-sky-700 transition-colors text-sm"
          >
            Save Changes
          </button>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminToolbar;