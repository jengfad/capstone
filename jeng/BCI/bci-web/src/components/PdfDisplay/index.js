import "./style.scss";

import React, { PureComponent } from "react";
const pdfjsLib = window.pdfjsLib;
const pdfjsViewer = window.pdfjsViewer;

class PdfDisplay extends PureComponent {
  _source = null;
  _eventBus = null;

  state = {
    PDF: null,
    pageNumber: 1,
  };

  constructor(props) {
    super(props);

    const workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.489/pdf.worker.js";
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
    this._initEventBus();
  }

  componentDidMount() {
    this.pdfViewer = new pdfjsViewer.PDFViewer({
      container: this._$root,
      eventBus: this._eventBus,
    });

    this._refresh();
  }

  componentDidUpdate() {
    const { source } = this.props;

    if (source !== this._source) {
      this._source = source;
      this._refresh();
    }
  }

  _initEventBus() {
    const eventBus = new pdfjsViewer.EventBus();

    eventBus.on('pagechange', ({ pageNumber }) => {
      this.setState({ pageNumber });
    });

    this._eventBus = eventBus;
  }

  _refresh() {
    const { source } = this.props;
    let loadingTask;
    
    if (!source) return;

    if (typeof source === 'string') {
      loadingTask = pdfjsLib.getDocument({ url: source });
    } else {
      loadingTask = pdfjsLib.getDocument({ data: source });
    }

    loadingTask.promise.then(PDF => {
      this.setState({ PDF });
      this.pdfViewer.setDocument(PDF);
    });
  }

  _handleRootRef = $node => {
    this._$root = $node;
  };

  render() {
    const { PDF, pageNumber } = this.state;
    const numPages = (PDF || {}).numPages || 1;

    return (
      <section className="skb-pdf-component" ref={this._handleRootRef}>
        <div className="viewer" />
        <div className="page-counter">
          { `${pageNumber} / ${numPages}` }
        </div>
      </section>
    );
  }
}

export default PdfDisplay;
