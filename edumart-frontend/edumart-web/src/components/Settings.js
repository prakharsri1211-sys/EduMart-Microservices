import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-1">Manage your account preferences.</p>
            </div>
            
            <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                    <SettingsIcon size={32} />
                </div>
                <h2 className="text-xl font-semibold text-white">Settings Configuration</h2>
                <p className="text-slate-400 mt-2 text-center max-w-md">
                    This section is under construction. Settings options will appear here soon.
                </p>
            </div>
        </div>
    );
};

export default Settings;
