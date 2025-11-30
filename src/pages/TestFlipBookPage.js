import React from 'react';
import HTMLFlipBook from "react-pageflip";
import "./TestFlipBookPage.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image"></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

class DemoBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,
      orientation: 'portrait',
      state: 'read'
    };
  }

  nextButtonClick = () => {
    if (this.flipBook && this.flipBook.pageFlip) {
      this.flipBook.pageFlip().flipNext();
    }
  };

  prevButtonClick = () => {
    if (this.flipBook && this.flipBook.pageFlip) {
      this.flipBook.pageFlip().flipPrev();
    }
  };

  onPage = (e) => {
    this.setState({
      page: e.data,
    });
  };

  onChangeOrientation = (e) => {
    this.setState({
      orientation: e.data,
    });
  };

  onChangeState = (e) => {
    this.setState({
      state: e.data,
    });
  };

  componentDidMount() {
    // Use setTimeout to ensure the flipBook is properly initialized
    setTimeout(() => {
      if (this.flipBook && this.flipBook.pageFlip) {
        this.setState({
          totalPage: this.flipBook.pageFlip().getPageCount(),
        });
      }
    }, 100);
  }

  render() {
    return (
      <div>
        <HTMLFlipBook
          width={550}
          height={733}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={this.onPage}
          onChangeOrientation={this.onChangeOrientation}
          onChangeState={this.onChangeState}
          className="demo-book"
          ref={(el) => (this.flipBook = el)}
        >
          <PageCover>DOCUMENT VIEWER</PageCover>
          <Page number={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Page>
          <Page number={2}>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae.</Page>
          <Page number={3}>Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</Page>
          <Page number={4}>Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum.</Page>
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>

        <div className="container">
          <div>
            <button type="button" onClick={this.prevButtonClick}>
              Previous page
            </button>

            [{this.state.page} of {this.state.totalPage}]

            <button type="button" onClick={this.nextButtonClick}>
              Next page
            </button>
          </div>
          <div>
            State: <i>{this.state.state || 'n/a'}</i>, orientation: <i>{this.state.orientation || 'n/a'}</i>
          </div>
        </div>
      </div>
    );
  }
}

export default function TestFlipBookPage() {
  return (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <DemoBook />
    </div>
  );
}
