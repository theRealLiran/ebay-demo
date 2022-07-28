import { defineConfig } from 'cypress'
import XLSX from 'xlsx';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        writeCSV(data: unknown[]) {
          let wb = XLSX.utils.book_new()
          wb.Props = {
            Title: 'Apple Products'
          }
          wb.SheetNames.push('Items')
          wb.Sheets['Items'] = XLSX.utils.json_to_sheet(data)
          XLSX.writeFileXLSX(wb, `./cypress/output/apple-macbook-air.csv`, { type: 'file' })
          return null
        }
      })
    },
    baseUrl: 'https://www.ebay.com'
  }
})
