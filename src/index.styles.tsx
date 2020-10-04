import styled, { createGlobalStyle } from "styled-components";
import UniversFont from "./Assets/UniversLTStd.otf";
import UniversBold from "./Assets/UniversLTStd-Bold.otf";
export const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Univers';
    src: url(${UniversFont}) format("opentype");
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Univers';
    src: url(${UniversBold}) format("opentype");
    font-weight: bold;
    font-style: normal;
}
* {
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
}
html,
body {
  font-family: 'Univers', sans-serif;
  width: 100vw;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-style: normal; 
  background: rgba(242, 242, 242, 0.9); 
  }
  h1,h2,h3,h4,h5,h6 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    }
  a {
    text-decoration: none;
    color: black;
  }
  h1 {
  margin-bottom: 1.45rem;
  font-size: 2.5rem;
  line-height: 1.1;
}
h2 {
  margin-bottom: 1.45rem;
  font-size: 1.62671rem;
  line-height: 1.1;
}
h3 {
  margin-bottom: 1.45rem;
  font-size: 1.38316rem;
  line-height: 1.1;
}
h4 {
  margin-bottom: 1.45rem;
  font-size: 1rem;
  line-height: 1.1;
}
h5 {
  margin-bottom: 1.45rem;
  font-size: 0.85028rem;
  line-height: 1.1;
}
h6 {
  margin-bottom: 1.45rem;
  font-size: 0.78405rem;
}
img {
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
}
p{
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  font-size: 1.15em;
  line-height: 1.3;
}
li {
  list-style-type: lower-roman;
}

.video-react-loading-spinner{
  /* display:none !important; */
  opacity: 0;
}

`;
