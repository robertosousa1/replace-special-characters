<p align="center">

[![Known Vulnerabilities](https://snyk.io/test/github/robertosousa1/replace-special-characters/badge.svg)](https://snyk.io/test/github/robertosousa1/replace-special-characters)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

</p>

# **Replace Special Characters**

In a validation of a very large text, there may be cases in which a word is null or undefined. To prevent this validation from being done manually, our lib is able to do it together with the normalization of the text.

 ## Install

    $ npm install replace-special-characters
or

    $ yarn add replace-special-characters

## Usage

```js
const replaceSpecialCharacters = require('replace-special-characters');

const normalizedString = replaceSpecialCharacters('JäváSçrîpt');
//=> 'JavaScript'
```

## How to contribute

-   Make a fork;
-   Create a branck with your feature:  `git checkout -b my-feature`;
-   Commit changes:  `git commit -m 'feat: My new feature'`;
-   Make a push to your branch:  `git push origin my-feature`.

After merging your receipt request to done, you can delete a branch from yours.

## License
This project is under the MIT license. See the [LICENSE]([[https://github.com/robertosousa1/replace-special-characters/blob/master/LICENSE](https://github.com/robertosousa1/replace-special-characters/blob/master/LICENSE)]) for more information.

----------

Made with by Roberto Alves  👋  [Get in touch!](https://www.linkedin.com/in/robertosousa01)
