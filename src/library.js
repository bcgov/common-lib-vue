import Button from './components/Button.vue';
import Captcha from './components/Captcha.vue';
import ContinueBar from './components/ContinueBar.vue';
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
import FacilityNumberInput from './components/FacilityNumberInput.vue';
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
} from './helpers/date';
import {
  capitalCaseWord,
  replaceAt,
  replaceSpecialCharacters,
  stripSpaces,
} from './helpers/string';
import {
  alphanumericValidator,
  alphaValidator,
  optionalValidator,
} from './helpers/validator';
import { cloneDeep } from './helpers/utils';

import './styles/styles.css';

export {
  Button,
  Captcha,
  ContinueBar,
  DateInput,
  FacilityNumberInput,
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
  beforeDateValidator,
  capitalCaseWord,
  cloneDeep,
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
  motorVehicleAccidentClaimNumberValidator,
  negativeNumberValidator,
  nonZeroNumberValidator,
  optionalValidator,
  pastDateValidator,
  phnValidator,
  positiveNumberValidator,
  replaceAt,
  replaceSpecialCharacters,
  selectOptionsMonths,
  stripSpaces,
};
