import '@polymer/iron-icon';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import { dialogsActions, subscribeActions } from '../redux/actions';
import { DIALOGS } from '../redux/constants';
import { store } from '../redux/store';
import './hoverboard-icons';
import './shared-styles';

class GabungBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: flex;
          width: 100%;
          background: var(--primary-gradient);
          color: #fff;
          padding: 16px 0;
        }

        .images {
          height: 100%;
          margin: 8px 8px;
        }

        .description {
          font-size: 24px;
          line-height: 1.5;
          margin: 0 0 16px;
          text-align: center;
        }

        paper-button {
          color: #fff;
          border: 1px solid #fff;
        }

        paper-button[disabled] {
          background: var(--default-primary-color);
          color: #fff;
        }

        @media (min-width: 640px) {
          :host {
            padding: 32px 0;
          }

          .images {
            height: 100%;
          }

          .description {
            font-size: 32px;
            margin: 0 0 24px;
          }
        }
      </style>

      <div class="container" layout vertical center>
        <plastic-image class="images" srcset="/images/action-hmi.png"></plastic-image>
        <div class="description">
          {$ gabungBlock.callToAction.description $}
        </div>
        <div>
          <paper-button
            class="animated icon-right"
            disabled$="[[subscribed]]"
            on-click="_subscribe"
            ga-on="click"
            ga-event-category="attendees"
            ga-event-action="subscribe"
            ga-event-label="subscribe block"
            primary-text
          >
            <span class="cta-label">{$ gabungBlock.callToAction.label $}</span>
            <iron-icon icon$="hoverboard:[[ctaIcon]]"></iron-icon>
          </paper-button>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'gabung-block';
  }

  private user: { signedIn?: boolean; email?: string; displayName?: string } = {};
  private viewport = {};
  private subscribed = false;
  private ctaIcon = 'arrow-right-circle';
  private ctaLabel = '{$  subscribeBlock.callToAction.label $}';

  static get properties() {
    return {
      user: {
        type: Object,
      },
      viewport: {
        type: Object,
      },
      subscribed: {
        type: Boolean,
        observer: '_handleSubscribed',
      },
      ctaIcon: {
        type: String,
        value: 'arrow-right-circle',
      },
      ctaLabel: {
        type: String,
        value: '{$  subscribeBlock.callToAction.label $}',
      },
    };
  }

  stateChanged(state: import('../redux/store').State) {
    this.setProperties({
      subscribed: state.subscribed,
      user: state.user,
      viewport: state.ui.viewport,
    });
  }

  _handleSubscribed(subscribed) {
    if (subscribed) {
      this.ctaIcon = 'checked';
      this.ctaLabel = '{$  subscribeBlock.subscribed $}';
    } else {
      this.ctaIcon = 'arrow-right-circle';
      this.ctaLabel = '{$  subscribeBlock.callToAction.label $}';
    }
  }

  _subscribe() {
    let userData: {
      firstFieldValue?: string;
      secondFieldValue?: string;
    } = {};

    if (this.user.signedIn) {
      const fullNameSplit = this.user.displayName.split(' ');
      userData = {
        firstFieldValue: fullNameSplit[0],
        secondFieldValue: fullNameSplit[1],
      };
    }

    if (this.user.email) {
      this._subscribeAction(Object.assign({}, { email: this.user.email }, userData));
    } else {
      dialogsActions.openDialog(DIALOGS.SUBSCRIBE, {
        title: '{$ subscribeBlock.formTitle $}',
        submitLabel: ' {$ subscribeBlock.subscribe $}',
        firstFieldLabel: '{$ subscribeBlock.firstName $}',
        secondFieldLabel: '{$ subscribeBlock.lastName $}',
        firstFieldValue: userData.firstFieldValue,
        secondFieldValue: userData.secondFieldValue,
        submit: (data) => this._subscribeAction(data),
      });
    }
  }

  _subscribeAction(data) {
    store.dispatch(subscribeActions.subscribe(data));
  }
}

window.customElements.define(GabungBlock.is, GabungBlock);