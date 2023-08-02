import { createGlobalStyle } from 'styled-components';

export const COLORS = {
  orange: '#FC991A',
  light_gray: '#C3CED6',
  silver: '#a7a7a7',
  pure_white: '#FFFFFF',
  off_white: '#FAFAFA',
  charcoal: '#58595B'
}

export const FONTS = {
  h1: '40px',
  h2: '32px',
  h3: '24px',
  h4: '20px',
  regular16: '16px',
  caption: '14px',
  sub: '30px'
}

export const GlobalStyles = createGlobalStyle`

:root {
  background-color: ${COLORS.off_white};
  h1 {
    font-size: ${FONTS.h1};
    font-weight: 700;
  }
  h3 {
    font-size: ${FONTS.h3};
    font-weight: 700;
  }
  h4 {
    font-size: ${FONTS.h4};
    font-weight: 700;
  }
}

/* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
*/

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub,
sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption,
tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer,
header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, input {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
  text-decoration: none;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  overflow-x: hidden;
  font-family: 'B612', sans-serif;
  margin: 20px 100px 40px;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after, q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;