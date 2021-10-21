import Button from './components/Button.vue';
import Captcha from './components/Captcha.vue';
import ContinueBar from './components/ContinueBar.vue';
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
import Select, {
  selectOptionsMonths,
} from './components/Select.vue';
import Textarea from './components/Textarea.vue';
import TimeInput from './components/TimeInput.vue';
import {
  formatDate,
  formatISODate,
  getBCTimestamp,
  getISODateString,
  isValidISODateString,
} from './helpers/date';
import {
  capitalCaseWord,
  padLeadingZeros,
  replaceAt,
  replaceSpecialCharacters,
  stripSpaces,
} from './helpers/string';
import {
  alphanumericValidator,
  alphaValidator,
  optionalValidator,
  phoneValidator,
  bcPostalCodeValidator,
  postalCodeValidator,
} from './helpers/validator';
import { cloneDeep } from './helpers/utils';

import './styles/styles.css';

export {
  Button,
  Captcha,
  ContinueBar,
  DateInput,
  DigitInput,
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
  Select,
  Textarea,
  TimeInput,
  afterDateValidator,
  alphanumericValidator,
  alphaValidator,
  phoneValidator,
  bcPostalCodeValidator,
  postalCodeValidator,
  beforeDateValidator,
  capitalCaseWord,
  cloneDeep,
  digitValidator,
  distantFutureValidator,
  distantPastValidator,
  dollarNumberValidator,
  floatValidator,
  formatDate,
  formatISODate,
  futureDateValidator,
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
  positiveNumberValidator,
  replaceAt,
  replaceSpecialCharacters,
  selectOptionsMonths,
  stripSpaces,
};
