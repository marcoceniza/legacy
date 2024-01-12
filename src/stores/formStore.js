import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormStore = defineStore('form', () => {
    const iframeSrc = ref('');

    const showForm = (setIframeSrc) => {
        switch(setIframeSrc) {
            case "Document":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/DocumentControlandTraining.php';
                break;
            case "Annual":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/AnnualReviewDocumentationForm.php';
                break;
            case "Training":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/TrainingForm.php';
                break;
            case "Facility":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/FacilityLicensing.php';
                break;
            case "FDA":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/ReportingJobAid.php';
                break;
            case "Personnel":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/PersonnelManagement.php';
                break;
            case "Security":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/LegacyHealthUS-40-Security.php';
                break;
            case "Housekeeping":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/LegacyHealthUS - Housekeeping.php';
                break;
            case "Trade":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/LegacyHealthUS-TradePartnerAuthentication.php';
                break;
            case "Transaction":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/LegacyHealthUS - 70-Transaction Data.php';
                break;
            case "Receiving":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/ReceivingandPutawayForm.php';
                break;
            case "Suspect":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/SuspectProductForm.php';
                break;
            case "Illegitamate":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/IllegitimateProductProcessForm.php';
                break;
            case "Environment":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/EnvironmentalControlsForms.php';
                break;
            case "Inventory":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/InventoryControlForm.php';
                break;
            case "Order":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/OrderManagementandShippingForm.php';
                break;
            case "Recalls":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/RecallsandMarketWithdrawals.php';
                break;
            case "Quarantine":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/QuarantineProcessForm.php';
                break;
            case "Returns":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/ReturnsAndDestructions.php';
                break;
            case "Records":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/RecordForm.php';
                break;
            case "Crisis":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/CrisisOperationsForm.php';
                break;
            case "Investigations":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/InvestigationsReportingForm.php';
                break;
            case "Quality":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/QualityManagementForm.php';
                break;
            case "Incident":
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