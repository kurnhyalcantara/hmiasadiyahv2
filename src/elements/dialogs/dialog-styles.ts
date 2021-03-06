import '@polymer/polymer';

const documentContainer = document.createElement('template');

documentContainer.innerHTML = `<dom-module id="dialog-styles">
  <template>
    <style>
      :host {
        margin: 0;
        padding: 0;
        display: block;
        height: 100%;
        width: 100%;
        background: var(--primary-background-color);
        color: var(--primary-text-color);
        box-shadow: var(--box-shadow);
        --paper-input-container-focus-color: var(--default-primary-color);
        --paper-input-container-color: var(--disabled-text-color);
        --paper-input-container-label: {
          padding: 4px 0;
          background: white;
          font-weight: 600;
        };
        --paper-input-container-font-family: 'Fira Sans';
      }

      app-header {
        max-height: 56px;
        background-color: var(--primary-background-color);
        border-bottom: 1px solid var(--divider-color);
      }

      app-toolbar {
        padding: 0;
        height: auto;
      }

      .dialog-container {
        margin: 0 auto;
        width: 100%;
        padding: 20px;
        max-width: 584px;
      }

      .close-icon {
        margin: 16px 18px;
        cursor: pointer;
      }

      .header-content,
      .content {
        padding: 24px;
      }

      .content {
        min-height: 100%;
      }

      .header-content {
        position: relative;
        font-size: 18px;
      }

      .name {
        line-height: 1.2;
      }

      .tag {
        margin-top: 8px;
      }

      .float-button {
        position: fixed;
        right: 24px;
        bottom: 24px;
      }

      .content {
        position: relative;
        font-size: 15px;
        line-height: 1.87;
      }

      .meta-info {
        line-height: 1.6;
      }

      .description {
        margin: 24px 0 32px;
      }

      .action {
        margin-right: 16px;
        color: var(--primary-text-color);
        cursor: pointer;
        user-select: none;
      }

      .action iron-icon {
        margin-right: 4px;
        --iron-icon-width: 48px;
        --iron-icon-height: 48px;
      }

      .additional-sections {
        margin-top: 32px;
      }

      .section {
        margin-top: 16px;
        display: block;
        color: var(--primary-text-color);
      }

      .section-photo {
        margin-right: 16px;
        width: 48px;
        height: 48px;
        background-color: var(--secondary-background-color);
        border-radius: 50%;
        overflow: hidden;
        transform: translateZ(0);
      }

      .section-primary-text {
        margin-bottom: 4px;
        line-height: 1.2;
      }

      .section-secondary-text {
        font-size: 12px;
        line-height: 1;
      }

      @media (min-width: 812px) {
        :host {
          height: 70%;
          width: 720px;
        }

        .close-icon {
          margin: 16px;
          position: absolute;
          top: -8px;
          right: -48px;
          --iron-icon-fill-color: #fff;
        }

        .header-content,
        .content {
          padding: 24px;
        }

        .header-content {
          min-height: 160px;
        }

        .float-button {
          position: absolute;
          top: auto;
          right: 0;
          bottom: 0;
          transform: translate(50%, 50%);
        }
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild(documentContainer.content);
