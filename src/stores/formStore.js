import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormStore = defineStore('form', () => {
    const iframeSrc = ref('');

    const showForm = (setIframeSrc) => {
        localStorage.setItem('form_name', setIframeSrc);
        switch(setIframeSrc) {
            case "Document Control and Training":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/DocumentControlandTraining.php';
                break;
            case "Annual Review Documentation":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/AnnualReviewDocumentationForm.php';
                break;
            case "Training Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/TrainingForm.php';
                break;
            case "Facility Licensing":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/FacilityLicensing.php';
                break;
            case "FDA Reporting Job Aid":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/ReportingJobAid.php';
                break;
            case "Personnel Management":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/PersonnelManagement.php';
                break;
            case "Security":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/LegacyHealthUS-40-Security.php';
                break;
            case "Housekeeping":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/LegacyHealthUS - Housekeeping.php';
                break;
            case "Trade Partner Authentication":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/LegacyHealthUS-TradePartnerAuthentication.php';
                break;
            case "Transaction Data":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/LegacyHealthUS - 70-Transaction Data.php';
                break;
            case "Receiving and Putaway Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/ReceivingandPutawayForm.php';
                break;
            case "Suspect Product Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/SuspectProductForm.php';
                break;
            case "Illegitamate Product Process Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/IllegitimateProductProcessForm.php';
                break;
            case "Environment Controls Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/EnvironmentalControlsForms.php';
                break;
            case "Inventory Control Form":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/InventoryControlForm.php';
                break;
            case "Order Management and Shipping":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/OrderManagementandShippingForm.php';
                break;
            case "Recalls and Market Withdrawals":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/RecallsandMarketWithdrawals.php';
                break;
            case "Quarantine Process":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/QuarantineProcessForm.php';
                break;
            case "Returns and Destructions":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/ReturnsAndDestructions.php';
                break;
            case "Records":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/RecordForm.php';
                break;
            case "Crisis Operations":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/CrisisOperationsForm.php';
                break;
            case "Investigations and Reporting":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/InvestigationsReportingForm.php';
                break;
            case "Quality Management":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/QualityManagementForm.php';
                break;
            case "Incident Report":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/IncidentReportForm.php';
                break;
            default:
                return false;
        }
    }

  return {
    iframeSrc, showForm
  }
})