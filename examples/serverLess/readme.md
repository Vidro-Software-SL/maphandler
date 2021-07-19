# Map Handler ServerLess Demo

#### Version 1.0.0 - July 2021

Simple server less map integration. 

Loads a BMAPS map with custom logo and one layer rendered.
On map click, performs an wms info and shows a property value.


## Installation

Open a terminal/shell:

```
cd examples/serverLess
```
Install dependencies

```
npm install
```

Edit your credentials in `examples/serverLess/main.js` :

```
const apiUrl = "<YOUR API URL>";
const user = "<YOUR USER>";
const pwd = "<YOUR USER PASSWORD>";
const customLogo ="<YOUR LOGO URL>";
```

Run

```
npm start
```

View

Open a web broser with this url: `http://localhost:1234/`