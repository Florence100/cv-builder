import { exportPdf } from '@/src/features/export-pdf/api/server';

export const useExportPdf = () => {
  const handleExport = async (cvRef: React.RefObject<HTMLDivElement | null>, fileName: string) => {
    if (!cvRef.current) return;

    try {
      const styleElements = Array.from(document.querySelectorAll('style'));
      let allStyles = styleElements.map((el) => el.outerHTML).join('\n');

      const linkElements = Array.from(
        document.querySelectorAll('link[rel="stylesheet"]')
      ) as HTMLLinkElement[];
      for (const link of linkElements) {
        try {
          const response = await fetch(link.href);
          const cssText = await response.text();
          allStyles += `\n<style>\n${cssText}\n</style>`;
        } catch {
          console.warn('Failed to inline CSS from:', link.href);
        }
      }

      const htmlClasses = document.documentElement.className;
      const bodyClasses = document.body.className;

      const fullHtmlString = `
        <!DOCTYPE html>
        <html class="${htmlClasses}">
          <head>
            <meta charset="utf-8" />
            ${allStyles}
          </head>
          <body class="${bodyClasses} bg-white">
            <div class="max-w-4xl mx-auto">
              ${cvRef.current.outerHTML}
            </div>
          </body>
        </html>
      `;

      const result = await exportPdf(fullHtmlString);

      if (!result) throw new Error('No PDF data received from server');

      const base64String = result.exportPdf;
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${fileName.replace(/\s+/g, '_')}_CV.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  return { handleExport };
};
