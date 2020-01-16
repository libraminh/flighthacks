import Vue from "vue";
import axios from "axios";
import VueScrollTo from "vue-scrollto";
import VueLazyLoad from "vue-lazyload";
import ReactiveProvide from 'vue-reactive-provide';

// import VueInstagram from 'vue-instagram';
import Fragment from 'vue-fragment'

import utils from "./utils/utils";
// import "historyjs/scripts/bundled/html4+html5/native.history";

// -------------------------
// element-ui
// -------------------------
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
// confifg element-ui language
locale.use(lang);

import {
  // Button,
  Input,
  // InputNumber,
  Form,
  FormItem,
  Message,
  Loading,
  Select,
  Option,
  DatePicker,
  Radio,
  Pagination,
  Tooltip,
  CheckboxGroup,
  RadioGroup,
  TimePicker,
  Switch,
  Button,
  // Progress,
  Rate,
  Checkbox,
  Collapse,
  CollapseItem,
  // Table,
  // TableColumn,
  Divider,
  InfiniteScroll
} from "element-ui";

const elementComponents = {
  // Button,
  Input,
  // InputNumber,
  Form,
  FormItem,
  Select,
  Option,
  DatePicker,
  Pagination,
  Tooltip,
  CheckboxGroup,
  RadioGroup,
  Button,
  // Progress,
  Rate,
  Checkbox,
  Radio,
  Collapse,
  CollapseItem,
  TimePicker,
  Switch,
  // Table,
  // TableColumn,
  Divider,
  InfiniteScroll,
}

Object.keys(elementComponents).forEach(key => {
  Vue.use(elementComponents[key]);
});

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
// -------------------------

// Components
import { FormContact, FormDefault } from "@/components/Form";
// import { ButtonPlayYoutube, SliderDefault, SliderWithThumbnails } from "@/components/Utilities";
// import CsTabs from "@/components/Tabs";
import CsPagination from "@/components/Pagination";
// import { StackedChart, PieChart } from '@/components/Chart'
import { CardsComparisonBar, CardBox, CardsFilter, CardCtas, CardsCompareModal } from "@/components/Cards";
import Accordion from '@/components/Accordion';
import FloatCenterImg from '@/components/FloatCenterImg.vue';
import { SliderWithThumbnails, SliderDefault } from '@/components/Utilities'
import MapBox from '@/components/MapBox';
import { BaseForm } from '@/components/BaseForm';

// STYLEGUIDE
import {
  StyleguideColors,
  StyleguideSpacing,
  StyleguideTypography,
  StyleguideLayouts,
  StyleguideGrids,
  StyleguideComponents,
  TemplateStyleguideViewLayout
} from "@/components/Styleguide";

const styleguide = {
  StyleguideColors,
  StyleguideSpacing,
  StyleguideTypography,
  StyleguideLayouts,
  StyleguideGrids,
  StyleguideComponents,
  TemplateStyleguideViewLayout
}

Object.keys(styleguide).forEach(key => {
  Vue.component(key, styleguide[key]);
});

// Libs
import "assets/css/main.scss";
// import { Strong } from "gsap";

Vue.config.productionTip = false;
// Set prototype $http to use axios
Vue.prototype.$http = axios;
Vue.prototype.$utils = utils;

Vue.use(VueScrollTo, {
  offset: -90
});

Vue.use(VueLazyLoad);
Vue.use(Fragment.Plugin)

Vue.use(ReactiveProvide, {
  name: 'reactiveProvide', // default value
})

const components = {
  FormContact,
  FormDefault,
  // FormNewsletter,
  // ButtonPlayYoutube,
  SliderDefault,
  SliderWithThumbnails,
  // CsTabs,
  // CsTabPane: CsTabs.Pane,
  CsPagination,
  // StackedChart,
  // PieChart
  CardsComparisonBar,
  CardBox,
  CardsFilter,
  CardsCompareModal,
  CardCtas,
  Accordion,
  FloatCenterImg,
  MapBox,
  BaseForm,
};


Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

// CREATE DIRECTIVE FOR ADDING CLASS ON HOVER
Vue.directive('add-class-hover', {
  bind(el, binding, vnode) {
    const { value="" } = binding;
    el.addEventListener('mouseenter',()=> {
      el.classList.add(value)
    });
    el.addEventListener('mouseleave',()=> {
      el.classList.remove(value)
    });
  },
  unbind(el, binding, vnode) {
    el.removeEventListener('mouseenter');
    el.removeEventListener('mouseleave')
  }
})

import "./libs/pageTransition";
// import "./libs/hightCharts";
import App from './mixins/app';

//////////////////////////////////////////

new Vue({
  el: "#app",
  mixins: [App]
});
