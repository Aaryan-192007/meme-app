import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand } from 'reactstrap';

const photos = [
  { src: '/images/Drake-Hotline-Bling.jpg' },
  { src: '/images/3pahz5.png' },
  { src: '/images/Running-Away-Balloon.jpg' },
  { src: '/images/Sad-Pablo-Escobar.jpg' },
  { src: '/images/The-Rock-Driving.jpg' },
  { src: '/images/Tuxedo-Winnie-The-Pooh.png' },
  { src: '/images/Two-Buttons.jpg' },
  { src: '/images/dank.png' },
  { src: '/images/Left-Exit-12-Off-Ramp.jpg' },
  { src: '/images/Distracted-Boyfriend.jpg' },
  { src: '/images/54hjww.jpg' },
  { src: '/images/Change-My-Mind.jpg' },
  { src: '/images/jobs.jpg' },
  { src: '/images/ned.jpeg' },
  { src: "/images/They're-The-Same-Picture.jpg" },
  { src: '/images/Buff-Doge-vs-Cheems.png' },
  { src: '/images/fry.jpg' },
  { src: '/images/Batman-Slapping-Robin.jpg' },
  { src: '/images/sponge.png' },
  { src: '/images/SpongeBobs-Wallet-10052020221404_compress19 (1).jpg' },
  { src: '/images/Woman-Yelling-At-Cat.jpg' },
  { src: '/images/2reqtg.png' },
  { src: '/images/Woman-Yelling-At-Cat.jpg' },
  { src: '/images/X-X-Everywhere.jpg' },
  { src: '/images/Finding-Neverland.jpg' },
  { src: '/images/6a9d61.png' },
  { src: '/images/5o32tt.png' },
  { src: '/images/devilgirl.jpg' }

];

const initialState = {
  toptext: "",
  bottomtext: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%"
}

class MainPage extends React.Component {
  constructor() {
    document.title = "Make Memes";
    super();
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      currentImagebase64: null,
      ...initialState
    };
  }

  openImage = (index) => {
    const image = photos[index];
    const base_image = new Image();
    base_image.src = image.src;
    const base64 = this.getBase64Image(base_image);
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64: base64,
      ...initialState
    }));
  }

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  }

  changeText = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      }
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      }
    }
    return stateObj;
  }

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener('mousemove', (event) => this.handleMouseMove(event, type));
    this.setState({
      ...stateObj
    })
  }

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging) {
        stateObj = this.getStateObj(e, type);
      }
      this.setState({
        ...stateObj
      });
    }
  };

  handleMouseUp = (event) => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  }

  convertSvgToImage = () => {
    const svg = this.svgRef;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "meme.png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  }



  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  yourFunction = () => {
    this.setState({
      close: !this.state.close,
    });
  };

  render() {
    const { close } = this.state;
    const image = photos[this.state.currentImage];
    const base_image = new Image();
    base_image.src = image.src;
    var wrh = base_image.width / base_image.height;
    var newWidth = 600;
    var newHeight = newWidth / wrh;
    const textStyle = {
      fontFamily: "Impact",
      fontSize: "50px",
      stroke: "#000",// Meme caption stroke colour
    }

    return (
      <div>
        <div className="main-content">
          <div className="sidebar">
            <NavbarBrand href="/">Make Memes</NavbarBrand>
            <p>
              Make memes within a couple of second and share them with your friends
            </p>
            <p>
              You can add top and bottom text to a meme-template, move the text around and can save the image by downloading it.
            </p>
          </div>
          <div className="content">
            {photos.map((image, index) => (
              <div className="image-holder" key={image.src}>
                <span className="meme-top-caption">Top text</span>
                <img
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    height: "100%"
                  }}
                  alt={index}
                  src={image.src}
                  onClick={() => this.openImage(index)}
                  role="presentation"
                />
                <span className="meme-bottom-caption">Bottom text</span>
              </div>
            ))}
          </div>
        </div>
        <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Unleash your creativity</ModalHeader>
          <ModalBody>
            <svg
              width={newWidth}
              id="svg_ref"
              height={newHeight}
              ref={el => { this.svgRef = el }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <image
                ref={el => { this.imageRef = el }}
                xlinkHref={this.state.currentImagebase64}
                height={newHeight}
                width={newWidth}
              />
              <text className={close ? "textStyle" : "bro"}
                style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1, color: this.state.isActive ? "black" : "white" }}
                x={this.state.topX}
                y={this.state.topY}
                dominantBaseline="middle"
                textAnchor="middle"
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
              >
                {this.state.toptext}
              </text>
              <text className={close ? "textStyle" : "bro"}
                style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1, color: this.state.isActive ? "black" : "white" }}
                dominantBaseline="middle"
                textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
              >
                {this.state.bottomtext}
              </text>
            </svg>
            <div className="meme-form">
              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
              </FormGroup>
              <button onClick={() => this.convertSvgToImage()} className="btn btn-primary">Download Meme!</button>
              <FormGroup>
                <Label for="txtcolor">Text colour</Label>
                <button onClick={() => this.yourFunction()} className={close ? "textStyle" : "bro","btn btn-primary"}>Black / White</button>
              </FormGroup>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default MainPage;
