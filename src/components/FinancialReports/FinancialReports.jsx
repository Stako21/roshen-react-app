import React, { useState, useEffect } from 'react';
import ProtectedPDFViewer from '../ProtectedPDFViewer/ProtectedPDFViewer';
import './FinancialReports.scss';

const FinancialReports = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const reportYears = [2023]; // Годы, за которые есть отчеты

  // Функция для поиска всех финансовых отчетов по маске fin_<year>.pdf
  const discoverPDFFiles = async () => {
    try {
      const discoveredFiles = [];
      
      // Проверяем файлы за последние 10 лет
      // const currentYear = new Date().getFullYear() - 2;
      // const yearsToCheck = Array.from({ length: 3 }, (_, i) => currentYear + i);

      for (const year of reportYears) {
        const fileName = `fin_${year}.pdf`;
        console.log(`Проверка наличия файла: ${fileName}`);
        
        try {
          const response = await fetch(`/documents/${fileName}`);
          // const response = await fetch(`${import.meta.env.BASE_URL}/documents/${fileName}`);
          console.log(`Ответ сервера для ${fileName}:`, response);
          
          if (response.ok) {
            discoveredFiles.push({
              name: fileName,
              path: `/documents/${fileName}`,
              year: year
            });
          }
        } catch (error) {
          // Файл не найден - пропускаем
        }
      }

      // Сортируем по году (от новых к старым)
      discoveredFiles.sort((a, b) => a.year - b.year);
      setPdfFiles(discoveredFiles);
    } catch (error) {
      console.error('Помилка пошуку фалу:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    discoverPDFFiles();
  }, []);

  if (loading) {
    return <div className="loading">Пошук...</div>;
  }

  return (
    <div className="financial-reports">
      {/* <h2>Фінансова звітність</h2> */}
      
      {pdfFiles.length === 0 ? (
        <div className="no-reports">
          <p>Немає доступних звітностей</p>
          {/* <small>Разместите PDF файлы в папке public/documents/ с именами fin_2024.pdf, fin_2023.pdf и т.д.</small> */}
        </div>
      ) : (
        pdfFiles.map((file, index) => (
          <ProtectedPDFViewer
            key={index}
            filePath={file.path}
            fileName={`Фінансова звітність за ${file.year} рік`}
          />
        ))
      )}
    </div>
  );
};

export default FinancialReports;