
import React from 'react';
import type { Asset } from '../types';

interface ResultsTableProps {
  assets: Asset[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ assets }) => {
  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="max-h-[60vh] overflow-y-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-800 uppercase bg-gray-200/80 sticky top-0 backdrop-blur-sm">
                    <tr>
                        <th scope="col" className="px-4 py-3 w-12 text-center">STT</th>
                        <th scope="col" className="px-4 py-3">Ngân Hàng</th>
                        <th scope="col" className="px-4 py-3">Loại Tài Sản</th>
                        <th scope="col" className="px-4 py-3">Mô Tả Tài Sản</th>
                        <th scope="col" className="px-4 py-3">Chủ Sở Hữu</th>
                        <th scope="col" className="px-4 py-3 text-right">Giá Trị (Tr. VNĐ)</th>
                        <th scope="col" className="px-4 py-3 text-center">Ngày Thế Chấp</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                    <tr key={asset.stt} className="bg-white/70 border-b border-gray-200/80 hover:bg-gray-50/70 transition-colors duration-200">
                        <td className="px-4 py-3 font-medium text-gray-900 text-center">{asset.stt}</td>
                        <td className="px-4 py-3">{asset.bankName}</td>
                        <td className="px-4 py-3">{asset.assetType}</td>
                        <td className="px-4 py-3">{asset.description}</td>
                        <td className="px-4 py-3">{asset.owner}</td>
                        <td className="px-4 py-3 text-right font-mono">{asset.value.toLocaleString('en-US')}</td>
                        <td className="px-4 py-3 text-center font-mono">{asset.pledgeDate}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ResultsTable;
