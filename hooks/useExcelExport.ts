
import { useCallback } from 'react';
import * as xlsx from 'xlsx';
import type { Asset } from '../types';

const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

export const useExcelExport = (assets: Asset[], customerName: string) => {
  const exportToExcel = useCallback(() => {
    if (!assets || assets.length === 0) {
      console.error("No data available to export.");
      return;
    }

    // Map data to the required column headers and order
    const dataForExport = assets.map(asset => ({
      'STT': asset.stt,
      'NGÂN HÀNG': asset.bankName,
      'LOẠI TÀI SẢN': asset.assetType,
      'MÔ TẢ TÀI SẢN': asset.description,
      'CHỦ SỞ HỮU': asset.owner,
      'GIÁ TRỊ': asset.value,
      'NGÀY THẾ CHẤP': asset.pledgeDate,
    }));

    const worksheet = xlsx.utils.json_to_sheet(dataForExport);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Tài sản bảo đảm');
    
    // Set column widths
    worksheet['!cols'] = [
        { wch: 5 },   // STT
        { wch: 40 },  // NGÂN HÀNG
        { wch: 30 },  // LOẠI TÀI SẢN
        { wch: 50 },  // MÔ TẢ TÀI SẢN
        { wch: 30 },  // CHỦ SỞ HỮU
        { wch: 15 },  // GIÁ TRỊ
        { wch: 15 },  // NGÀY THẾ CHẤP
    ];


    const today = formatDate(new Date());
    const fileName = `CIC Tài sản_${customerName.replace(/ /g, '_')}_${today}.xlsx`;

    xlsx.writeFile(workbook, fileName);
  }, [assets, customerName]);

  return { exportToExcel };
};
