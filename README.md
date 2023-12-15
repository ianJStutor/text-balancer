> NOTE: This was written before the CSS property <code>text-wrap</code> had its experimental value <code>balance</code>. This JavaScript comes close to replicating the behavior now available in CSS. If your browser supports <code>text-wrap: balance</code>, consider using that instead.

# Text Balancer

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Description

Dynamic Text can be "ragged" along one or both vertical edges or may have only one word on its last line. This tool can help.

"Balance" here means that each line of text is as close as possible to a uniform width.

Since balancing requires multiple lines of text, this tool does not work on a single line of text.

Built with vanilla JavaScript, my favorite flavor!

## Author

> [Ian Marshall](https://ianjstutor.github.io/ian-marshall/)

## Live Site

> [https://ianjstutor.github.io/text-balancer/](https://ianjstutor.github.io/text-balancer/)

## Usage

Include <code>text-balancer.js</code> in your project. Import the JS into your main JavaScript file and call <code>balanceText(element)</code>, where <code>element</code> is an HTML element containing text you want to balance.

### HTML

```html
<head>
    <style>
        p {
            width: 100px;
            padding: 5px;
        }
    </style>
    <script defer type="module" src="main.js"></script>
</head>
<body>
    <p>Does all this filler text make me look big?</p>
</body>
```

### JavaScript

```js
//main.js
import { balanceText } from "./text-balancer.js";
const element = document.querySelector("p");
balanceText(element);
```

## Documentation

### Module Export

```js
export { balanceText };
```

### Public Method

```js
function balanceText(elementWithText) {}
```

The <code>elementWithText</code> is an HTML element containing text. Its <code>textContent</code> property will be read, as well as its width, height, and padding. <code>balanceText</code> will then find the best padding-left and padding-right (with the minimum being the existing values for padding-left and padding-right) for the lines of text to balance within the element without overflow. The CSS values for <code>padding-left</code> and <code>padding-right</code> will be set as inline CSS directly on the <code>elementWithText</code>.
