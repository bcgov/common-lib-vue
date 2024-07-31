import AddressDoctorInput from "./components/AddressDoctorInput.vue";
import ButtonComponent from "./components/ButtonComponent.vue";
import CaptchaComponent from "./components/CaptchaComponent.vue";
import CheckboxComponent from "./components/CheckboxComponent.vue";
import CheckboxGroup from "./components/CheckboxGroup.vue";
import ContentModal from "./components/ContentModal.vue";
import ContinueBar from "./components/ContinueBar.vue";
import CountrySelect from "./components/CountrySelect.vue";
import CurrencyInput from "./components/CurrencyInput.vue";
import DistributionBar from "./components/DistributionBar.vue";
import DynamicTagWrapper from "./components/DynamicTagWrapper.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import DateInput, {
  afterDateValidator,
  beforeDateValidator,
  distantFutureValidator,
  distantPastValidator,
  futureDateValidator,
  pastDateValidator,
} from "./components/DateInput.vue";
import DigitInput, { digitValidator } from "./components/DigitInput.vue";
import FacilityNumberInput from "./components/FacilityNumberInput.vue";
import FileUploader from "./components/FileUploader.vue";
import IconCheckCircle from "./components/icons/IconCheckCircle.vue";
import IconInfoCircle from "./components/icons/IconInfoCircle.vue";
import IconPencil from "./components/icons/IconPencil.vue";
import IconPrint from "./components/icons/IconPrint.vue";
import IconTimesCircle from "./components/icons/IconTimesCircle.vue";
import InputComponent from "./components/InputComponent.vue";
import LoaderComponent from "./components/LoaderComponent.vue";
import MotorVehicleAccidentClaimNumberInput, {
  motorVehicleAccidentClaimNumberValidator,
} from "./components/MotorVehicleAccidentClaimNumberInput.vue";
import NumberInput, {
  intValidator,
  floatValidator,
  negativeNumberValidator,
  positiveNumberValidator,
  nonZeroNumberValidator,
  dollarNumberValidator,
} from "./components/NumberInput.vue";
import NumberSelect from "./components/NumberSelect.vue";
import PageContent from "./components/PageContent.vue";
import PageStepper from "./components/PageStepper.vue";
import PhnInput, { phnValidator } from "./components/PhnInput.vue";
import PhoneNumberInput from "./components/PhoneNumberInput.vue";
import PostalCodeInput from "./components/PostalCodeInput.vue";
import PractitionerNumberInput from "./components/PractitionerNumberInput.vue";
import PromptModal from "./components/PromptModal.vue";
import RadioComponent from "./components/RadioComponent.vue";
import RegionSelect from "./components/RegionSelect.vue";
import SelectComponent, { selectOptionsMonths } from "./components/SelectComponent.vue";
import SINInput, { sinValidator } from "./components/SINInput.vue";
import Textarea from "./components/TextareaComponent.vue";
import TimeInput from "./components/TimeInput.vue";
import {
  formatDate,
  formatISODate,
  calculateAge,
  getBCTimestamp,
  getISODateString,
  isValidISODateString,
} from "./helpers/date";
import {
  capitalCaseWord,
  convertNumberToFormattedString,
  formatArray,
  padLeadingZeros,
  replaceAt,
  replaceSpecialCharacters,
  stripPhoneFormatting,
  stripSpaces,
} from "./helpers/string";
import {
  alphanumericValidator,
  alphaValidator,
  bcPostalCodeValidator,
  optionalValidator,
  phoneValidator,
  postalCodeValidator,
  specialCharacterValidator,
} from "./helpers/validator";
import { cloneDeep } from "./helpers/utils";
import { getProvinceNameByCode, truncateAddressLines } from "./helpers/address";
import windowWidthMixin from "./mixins/window-width-mixin";

// Global polyfills.
import "core-js/actual/array/flat-map";

// CSS
import "../src/styles/styles.css";

export {
  AddressDoctorInput,
  ButtonComponent,
  CaptchaComponent,
  CheckboxComponent,
  CheckboxGroup,
  ContentModal,
  ContinueBar,
  CountrySelect,
  CurrencyInput,
  DateInput,
  DigitInput,
  DistributionBar,
  DynamicTagWrapper,
  FacilityNumberInput,
  FileUploader,
  FooterComponent,
  HeaderComponent,
  IconCheckCircle,
  IconInfoCircle,
  IconPencil,
  IconPrint,
  IconTimesCircle,
  InputComponent,
  LoaderComponent,
  MotorVehicleAccidentClaimNumberInput,
  NumberInput,
  NumberSelect,
  PageContent,
  PageStepper,
  PhnInput,
  PhoneNumberInput,
  PostalCodeInput,
  PractitionerNumberInput,
  PromptModal,
  RadioComponent,
  RegionSelect,
  SelectComponent,
  SINInput,
  Textarea,
  TimeInput,
  afterDateValidator,
  alphanumericValidator,
  alphaValidator,
  bcPostalCodeValidator,
  beforeDateValidator,
  capitalCaseWord,
  cloneDeep,
  convertNumberToFormattedString,
  digitValidator,
  distantFutureValidator,
  distantPastValidator,
  dollarNumberValidator,
  floatValidator,
  formatArray,
  formatDate,
  formatISODate,
  futureDateValidator,
  calculateAge,
  getBCTimestamp,
  getISODateString,
  getProvinceNameByCode,
  intValidator,
  isValidISODateString,
  motorVehicleAccidentClaimNumberValidator,
  negativeNumberValidator,
  nonZeroNumberValidator,
  optionalValidator,
  padLeadingZeros,
  pastDateValidator,
  phnValidator,
  phoneValidator,
  positiveNumberValidator,
  postalCodeValidator,
  replaceAt,
  replaceSpecialCharacters,
  selectOptionsMonths,
  sinValidator,
  specialCharacterValidator,
  stripPhoneFormatting,
  stripSpaces,
  truncateAddressLines,
  windowWidthMixin,
};
