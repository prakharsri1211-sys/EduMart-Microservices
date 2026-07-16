import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-edu-dark tracking-tight uppercase">Settings</h1>
                <p className="text-edu-dark/70 mt-1 font-medium">Manage your account preferences.</p>
            </div>
            
            <div className="mt-8 bg-white rounded-2xl border border-edu-light shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-16 w-16 rounded-xl bg-edu-mint flex items-center justify-center text-edu-dark mb-4">
                    <SettingsIcon size={32} />
                </div>
                <h2 className="text-xl font-extrabold text-edu-dark uppercase tracking-wider">Settings Configuration</h2>
                <p className="text-edu-dark/70 mt-2 text-center max-w-md font-medium">
                    This section is under construction. Settings options will appear here soon.
                </p>
            </div>
        </div>
    );
};

export default Settings;
