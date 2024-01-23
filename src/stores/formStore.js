import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormStore = defineStore('form', () => {
    const iframeSrc = ref('');

    const showForm = (setIframeSrc) => {
        localStorage.setItem('form_name', setIframeSrc);
        switch(setIframeSrc) {
            case "Document Control and Training":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Document_Control_and_Training.pdf';
                break;
            case "Annual Review Documentation":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Annual_Review_Documentation.pdf';
                break;
            case "Training Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Training_Form.pdf';
                break;
            case "Facility Licensing":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Facility_Licensing.pdf';
                break;
            case "FDA Reporting Job Aid":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/FDA_Reporting_Job_Aid.pdf';
                break;
            case "Personnel Management":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Personnel_Management.pdf';
                break;
            case "Security":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Security.pdf';
                break;
            case "Housekeeping":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Housekeeping.pdf';
                break;
            case "Trade Partner Authentication":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Trade_Partner_Authentication.pdf';
                break;
            case "Transaction Data":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Transaction_Data.pdf';
                break;
            case "Receiving and Putaway Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Receiving_and_Putaway.pdf';
                break;
            case "Suspect Product Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Suspect_Product.pdf';
                break;
            case "Illegitamate Product Process Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Illegitamate_Product_Process.pdf';
                break;
            case "Environment Controls Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Environment_Controls.pdf';
                break;
            case "Inventory Control Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Inventory_Control.pdf';
                break;
            case "Order Management and Shipping":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Order_Management_and_Shipping.pdf';
                break;
            case "Recalls and Market Withdrawals":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Recalls_and_Market_Withdrawals.pdf';
                break;
            case "Quarantine Process":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Quarantine_Process.pdf';
                break;
            case "Returns and Destructions":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Returns_and_Destructions.pdf';
                break;
            case "Records":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Records.pdf';
                break;
            case "Crisis Operations":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Crisis_Operations.pdf';
                break;
            case "Investigations and Reporting":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Investigations_and_Reporting.pdf';
                break;
            case "Quality Management":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Quality_Management.pdf';
                break;
            case "Incident Report":
                iframeSrc.value = 'https://www.legacyhealthus.com/api/uploads/pdfs/Incident_Report.pdf';
                break;
            default:
                return false;
        }
    }

  return {
    iframeSrc, showForm
  }
})