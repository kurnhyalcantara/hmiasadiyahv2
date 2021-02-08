import '@polymer/iron-icon';
import { html, PolymerElement } from '@polymer/polymer';
import '../elements/about-block';
import '../elements/unggul-block';
import '../elements/tokoh-block';
import '../elements/testi-block';
import '../elements/gabung-block';
import '../elements/profil-hmi-asadiyah';
import '../elements/gallery-block';
import '../elements/featured-videos';
import '../elements/latest-posts-block';
import '../elements/opinion-block';
import '../elements/map-block';
import { ReduxMixin } from '../mixins/redux-mixin';
import { scrollToY } from '../utils/scrolling';

class HomePage extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: block;
          height: 100%;
        }

        hero-block {
          font-size: 24px;
          text-align: center;
        }

        .hero-logo {
          --iron-image-width: 100%;
          max-width: 240px;
        }

        .info-items {
          margin: 24px auto;
          font-size: 22px;
          font-weight: bolder;
        }

        .info-items > *:not(:first-of-type) {
          color: var(--default-primary-color);
        }

        .action-buttons {
          margin: 0 -8px;
        }

        .action-buttons paper-button {
          margin: 8px;
        }

        .action-buttons iron-icon {
          --iron-icon-fill-color: currentColor;
          margin-left: 8px;
        }

        .scroll-down {
          margin-top: 24px;
          color: currentColor;
          user-select: none;
          cursor: pointer;
        }

        .scroll-down svg {
          width: 24px;
          opacity: 0.6;
        }

        .scroll-down .stroke {
          stroke: currentColor;
        }

        .scroll-down .scroller {
          fill: currentColor;
          animation: updown 2s infinite;
        }

        @keyframes updown {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0, 5px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @media (min-height: 500px) {
          hero-block {
            height: calc(100vh + 57px);
            max-height: calc(100vh + 1px);
          }

          .home-content {
            margin-top: -48px;
          }

          .scroll-down {
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
          }
        }

        @media (min-width: 812px) {
          hero-block {
            height: calc(100vh + 65px);
          }

          .hero-logo {
            max-width: 320px;
          }

          .info-items {
            margin: 48px auto;
            font-size: 28px;
          }
        }
      </style>

      <polymer-helmet active="[[active]]"></polymer-helmet>

      <hero-block
        id="hero"
        background-image="{$ heroSettings.home.background.image $}"
        background-color="{$ heroSettings.home.background.color $}"
        font-color="{$ heroSettings.home.fontColor $}"
        active="[[active]]"
        hide-logo
      >
        <div class="home-content" layout vertical center>
          <plastic-image
            class="hero-logo"
            srcset="/images/logo.png"
            alt="{$ title $}"
          ></plastic-image>
          <div class="info-items">
            <div class="info-item">{$ heroSettings.home.description1 $}</div>
            <div class="info-item">{$ heroSettings.home.description2 $}</div>
          </div>

          <a href="/pengkaderan" layout horizontal center-justified wrap>
            <paper-button class="action-buttons" primary invert>
              {$ infoPengkaderan $}
              <iron-icon icon="hmi:open-in-new"></iron-icon>
            </paper-button>
          </a>

          <div class="scroll-down" on-click="_scrollNextBlock">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_2"
              x="0px"
              y="0px"
              viewBox="0 0 25.166666 37.8704414"
              enable-background="new 0 0 25.166666 37.8704414"
              xml:space="preserve"
            >
              <path
                class="stroke"
                fill="none"
                stroke="#c7c4b8"
                stroke-width="2.5"
                stroke-miterlimit="10"
                d="M12.5833445
                36.6204414h-0.0000229C6.3499947
                36.6204414
                1.25
                31.5204487
                1.25
                25.2871208V12.5833216C1.25
                6.3499947
                6.3499951
                1.25
                12.5833216
                1.25h0.0000229c6.2333269
                0
                11.3333216
                5.0999947
                11.3333216
                11.3333216v12.7037992C23.916666
                31.5204487
                18.8166714
                36.6204414
                12.5833445
                36.6204414z"
              ></path>
              <path
                class="scroller"
                fill="#c7c4b8"
                d="M13.0833359
                19.2157116h-0.9192753c-1.0999985
                0-1.9999971-0.8999996-1.9999971-1.9999981v-5.428606c0-1.0999994
                0.8999987-1.9999981
                1.9999971-1.9999981h0.9192753c1.0999985
                0
                1.9999981
                0.8999987
                1.9999981
                1.9999981v5.428606C15.083334
                18.315712
                14.1833344
                19.2157116
                13.0833359
                19.2157116z"
              ></path>
            </svg>
            <i class="icon icon-arrow-down"></i>
          </div>
        </div>
      </hero-block>
      <about-block></about-block>
      <unggul-block></unggul-block>
      <tokoh-block></tokoh-block>
      <testi-block></testi-block>
      <gabung-block></gabung-block>
      <profil-hmi-asadiyah></profil-hmi-asadiyah>
      <gallery-block></gallery-block>
      <featured-videos></featured-videos>
      <latest-posts-block></latest-posts-block>
      <opinion-block></opinion-block>
      <map-block></map-block>
      <footer-block></footer-block>
    `;
  }

  static get is() {
    return 'home-page';
  }

  static get properties() {
    return {
      active: Boolean,
      viewport: {
        type: Object,
      },
    };
  }

  stateChanged(state: import('../redux/store').State) {
    this.setProperties({
      viewport: state.ui.viewport,
    });
  }

  _scrollNextBlock() {
    const heroHeight = this.$.hero.getBoundingClientRect().height - 55;
    scrollToY(heroHeight, 600, 'easeInOutSine');
  }
}

window.customElements.define(HomePage.is, HomePage);
