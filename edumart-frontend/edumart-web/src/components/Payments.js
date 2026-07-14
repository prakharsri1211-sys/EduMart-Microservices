import React from 'react';
import { CreditCard } from 'lucide-react';

const Payments = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Payments</h1>
                <p className="text-slate-400 mt-1">Manage your billing and transaction history.</p>
            </div>
            
            <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                    <CreditCard size={32} />
                </div>
                <h2 className="text-xl font-semibold text-white">No transactions</h2>
                <p className="text-slate-400 mt-2 text-center max-w-md">
                    You have no payment history available at this time.
                </p>
            </div>
        </div>
    );
};

export default Payments;
