import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { getStoredFinancials, saveFinancialRecord } from '../services/storage';
import { FinancialRecord } from '../types';
import { Wallet, Plus, Download, TrendingUp, TrendingDown, DollarSign, Calendar, X } from 'lucide-react';

export const FinancialDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [records, setRecords] = useState<FinancialRecord[]>(getStoredFinancials);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form
  const [crop, setCrop] = useState('Tomato (Hybrid Shivam)');
  const [season, setSeason] = useState<FinancialRecord['season']>('Kharif 2026');
  const [category, setCategory] = useState<FinancialRecord['category']>('Fertilizer');
  const [type, setType] = useState<FinancialRecord['type']>('Expense');
  const [amount, setAmount] = useState(5000);
  const [date, setDate] = useState('2026-10-30');
  const [notes, setNotes] = useState('');

  const totalExpense = records
    .filter(r => r.type === 'Expense')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalRevenue = records
    .filter(r => r.type === 'Revenue')
    .reduce((sum, r) => sum + r.amount, 0);

  const netFarmProfit = totalRevenue - totalExpense;
  const roiPercent = totalExpense > 0 ? ((netFarmProfit / totalExpense) * 100).toFixed(1) : '0';

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newR: FinancialRecord = {
      id: `fin-${Date.now()}`,
      crop,
      season,
      category,
      amount,
      type,
      date,
      notes
    };
    saveFinancialRecord(newR);
    setRecords(getStoredFinancials());
    setIsAddOpen(false);
    setNotes('');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,ID,Crop,Season,Category,Type,Amount,Date,Notes\n' +
      records
        .map(
          r =>
            `"${r.id}","${r.crop}","${r.season}","${r.category}","${r.type}",${r.amount},"${r.date}","${r.notes}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MandiAI_Financial_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>Farm Enterprise Accounting & Profit & Loss Statement</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{t.nav.finance}</h1>
          <p className="text-sm text-slate-500">
            Track input expenditures (seeds, fertilizer, labour, diesel) against mandi sales realization for clean seasonal accounting.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        </div>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Mandi Revenue</span>
          <div className="text-2xl font-black text-emerald-800 font-mono mt-1">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">From APMC auctions</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Cultivation Expense</span>
          <div className="text-2xl font-black text-rose-600 font-mono mt-1">
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Seeds, labor, fertilizers</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Net Farm Profit</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">
            ₹{netFarmProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">
            {netFarmProfit >= 0 ? '+ Positive Realization' : '- Net Deficit'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Seasonal ROI</span>
          <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
            {roiPercent}%
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Return on Investment</span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <span className="font-bold text-sm text-slate-800">
            Farm Financial Ledger ({records.length} Transactions)
          </span>
          <span className="text-xs text-slate-500">Season: Kharif 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description / Notes</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-mono text-xs text-slate-500">{r.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{r.crop}</td>
                  <td className="py-3 px-4 text-slate-700">{r.category}</td>
                  <td className="py-3 px-4 text-slate-600 text-xs">{r.notes || '-'}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    ₹{r.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                        r.type === 'Revenue'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {r.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Record Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddRecord}
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Add Farm Transaction</h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Transaction Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as FinancialRecord['type'])}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Expense">Expense (ವೆಚ್ಚ / खर्च)</option>
                    <option value="Revenue">Sales Revenue (ಆದಾಯ / राजस्व)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as FinancialRecord['category'])}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Seeds">Seeds / Seedlings</option>
                    <option value="Fertilizer">Fertilizer & Nutrients</option>
                    <option value="Labour">Labour & Weeding</option>
                    <option value="Irrigation">Irrigation & Power</option>
                    <option value="Transport">Transport / Freight</option>
                    <option value="Pesticides">Pesticides & Sprays</option>
                    <option value="Sales Revenue">Sales Revenue</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Crop</label>
                <input
                  type="text"
                  required
                  value={crop}
                  onChange={e => setCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notes / Voucher Details</label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Nursery bill #42, or APMC auction slip"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer shadow-xs"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
