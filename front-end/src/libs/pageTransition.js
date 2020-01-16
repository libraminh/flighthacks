import Vue from 'vue';
import axios from 'axios';
import { TweenMax, Expo } from "gsap/all";
import "historyjs/scripts/bundled/html4+html5/native.history";

import App from "@/mixins/app";

(function () {
  setTimeout(() => {
    History.Adapter.bind(window, 'statechange', () => {
      let State = History.getState();
      // if (!State.data)
      if (State.data.pageContent) {
        setPageContent(State.data.pageContent);
      } else {
        window.location.replace(State.url);
      }
    });

    addEventInternalLinks();

    // show #app content
    showAppContent();
  }, 1300);

  function showAppContent() {
    // let lines_wrapper = document.getElementsByClassName("loading__lines")[0];
    let loading_overlay = document.getElementById("page--loading-overlay");
    let app_layout = document.getElementById('layout');
    // document.getElementById("layout").style.opacity = 1;

    TweenMax.fromTo(loading_overlay, 1.5, {
      y: '100%',
    }, {
      y: '0%',
      ease: Expo.easeInOut
    })

    TweenMax.fromTo(loading_overlay, 1, {
      height: '100%',
    }, {
      height: '0%',
      delay: 1,
      ease: Expo.easeInOut
    })

    TweenMax.to(app_layout, 1, { opacity: 1, delay: 0 });

    setTimeout(() => {
      document.getElementById("app").classList.add("loaded");
    }, 1500);
  }

  function addEventInternalLinks() {
    let internalLinks = document.querySelectorAll('a.internal-link');

    internalLinks.forEach(element => {
      element.addEventListener('click', cbInternalLinksClick)
    });
  }

  function cbInternalLinksClick(event) {
    event.preventDefault();
    let target = !event.target.href ? event.target.parentElement : event.target;
    // const self = this;
    let url = new URL(target.href);

    document.getElementById('app').classList.remove('loaded');

    axios
      .get(url.href)
      .then(res => {
        let html = document.createElement('html');
        html.innerHTML = res.data;
        History.pushState({pageContent: html.querySelector('#layout').innerHTML}, html.querySelector('title').innerText, url.pathname)
      })

    // setPageContent(new_content);
  }

  function setPageContent(content) {
    let new_layout = document.createElement('div');
    new_layout.innerHTML = content;

    let current_layout = document.getElementById('layout');
    let loading_overlay = document.getElementById("page--loading-overlay");

    TweenMax.fromTo(loading_overlay, 1.5, {
      y: '100%',
      height: '100%',
    }, {
      y: '0%',
      height: '100%',
      ease: Expo.easeInOut
    })
    
    setTimeout(() => {
      current_layout.innerHTML = new_layout.innerHTML;

      new Vue({
        el: "#app",
        mixins: [App],
        data() {
          return {
            recreated: true
          }
        },
        created () {
          this.$scrollTo('#app');;
        },
        mounted () {
          addEventInternalLinks();
        },
      })
    }, 1500);
  }
}())