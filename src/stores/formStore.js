import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormStore = defineStore('form', () => {
    const iframeSrc = ref('');

    const showForm = (setIframeSrc) => {
        switch(setIframeSrc) {
            case "Annual":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/AnnualReviewDocumentationForm.php';
                break;
            case "Careers":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/ApplicationForm.php';
                break;
            case "Contact":
                iframeSrc.value = 'https://www.legacyhealthus.com/wp-content/themes/legacyhealthal684/forms/contactForm-Fullname.php';
                break;
            default:
                return false;
        }
    }

  return {
    iframeSrc, showForm
  }
})