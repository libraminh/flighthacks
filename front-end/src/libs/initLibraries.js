import Util from "../utils/utils";
import initModalWindow from './codyhouse/Modal';
import initModalVideo from './codyhouse/ModalVideo';
import initLanguagePicker from "./codyhouse/LanguagePicker";
import initAnimatedMenuButton from "./codyhouse/AnimatedMenuButton";
import initNavbar from "./codyhouse/Navbar";

export default function () {
  initModalWindow();
  initModalVideo();
  initLanguagePicker();
  initAnimatedMenuButton();
  initNavbar();
}