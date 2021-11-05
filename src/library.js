import Button from './components/Button.vue';
import Captcha from './components/Captcha.vue';
import Checkbox from './components/Checkbox.vue';
import CheckboxGroup from './components/CheckboxGroup.vue';
import ContentModal from './components/ContentModal.vue';
import ContinueBar from './components/ContinueBar.vue';
import CountrySelect from './components/CountrySelect.vue';
import CurrencyInput from './components/CurrencyInput.vue';
import DistributionBar from './components/DistributionBar.vue';
import DynamicTagWrapper from './components/DynamicTagWrapper.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import DateInput, {
  afterDateValidator,
  beforeDateValidator,
  distantFutureValidator,
  distantPastValidator,
  futureDateValidator,
  pastDateValidator,
} from './components/DateInput.vue';
import DigitInput, {
  digitValidator,
} from './components/DigitInput.vue';
import FacilityNumberInput from './components/FacilityNumberInput.vue';
import FileUploader from './components/FileUploader.vue';
import Input from './components/Input.vue';
import Loader from './components/Loader.vue';
import MotorVehicleAccidentClaimNumberInput, {
  motorVehicleAccidentClaimNumberValidator,
} from './components/MotorVehicleAccidentClaimNumberInput.vue';
import NumberInput, {
  intValidator,
  floatValidator,
  negativeNumberValidator,
  positiveNumberValidator,
  nonZeroNumberValidator,
  dollarNumberValidator,
} from './components/NumberInput.vue';
import NumberSelect from './components/NumberSelect.vue';
import PageContent from './components/PageContent.vue';
import PageStepper from './components/PageStepper.vue';
import PhnInput, { phnValidator } from './components/PhnInput.vue';
import PhoneNumberInput from './components/PhoneNumberInput.vue';
import PostalCodeInput from './components/PostalCodeInput.vue';
import PractitionerNumberInput from './components/PractitionerNumberInput.vue';
import PromptModal from './components/PromptModal.vue';
import Radio from './components/Radio.vue';
import RegionSelect from './components/RegionSelect.vue';
import Select, {
  selectOptionsMonths,
} from './components/Select.vue';
import Textarea from './components/Textarea.vue';
import TimeInput from './components/TimeInput.vue';
import {
  formatDate,
  formatISODate,
  calculateAge,
  getBCTimestamp,
  getISODateString,
  isValidISODateString,
} from './helpers/date';
import {
  capitalCaseWord,
  convertNumberToFormattedString,
  padLeadingZeros,
  replaceAt,
  replaceSpecialCharacters,
  stripSpaces,
} from './helpers/string';
import {
  alphanumericValidator,
  alphaValidator,
  bcPostalCodeValidator,
  optionalValidator,
  phoneValidator,
  postalCodeValidator,
  specialCharacterValidator,
} from './helpers/validator';
import { cloneDeep } from './helpers/utils';
import windowWidthMixin from './mixins/window-width-mixin';

// CSS
import './styles/styles.css';

export {
  Button,
  Captcha,
  Checkbox,
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
  Footer,
  Header,
  Input,
  Loader,
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
  Radio,
  RegionSelect,
  Select,
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
  formatDate,
  formatISODate,
  futureDateValidator,
  calculateAge,
  getBCTimestamp,
  getISODateString,
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
  specialCharacterValidator,
  stripSpaces,
  windowWidthMixin,
};
