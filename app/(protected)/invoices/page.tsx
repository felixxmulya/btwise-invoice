export default function InvoicesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
                    <p className="text-gray-600 mt-1">Manage and track your invoices</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
                    Create Invoice
                </button>
            </div>

            {/* Invoice stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-medium text-gray-900">Total Invoices</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">142</p>
                    <p className="text-sm text-gray-500 mt-1">+12 from last month</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-medium text-gray-900">Pending</h3>
                    <p className="text-3xl font-bold text-orange-600 mt-2">23</p>
                    <p className="text-sm text-gray-500 mt-1">Awaiting payment</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-medium text-gray-900">Paid</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">119</p>
                    <p className="text-sm text-gray-500 mt-1">Completed invoices</p>
                </div>
            </div>

            {/* Invoice list */}
            <div className="bg-white shadow-sm rounded-xl border border-slate-200">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h2>
                    <div className="space-y-4">
                        {/* Sample invoice items */}
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold">#{item.toString().padStart(3, '0')}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Invoice #{item.toString().padStart(3, '0')}</p>
                                        <p className="text-sm text-gray-500">Client Name {item}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">$1,{item * 234}.00</p>
                                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${item % 3 === 0 ? 'bg-green-100 text-green-800' :
                                            item % 2 === 0 ? 'bg-orange-100 text-orange-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {item % 3 === 0 ? 'Paid' : item % 2 === 0 ? 'Pending' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}