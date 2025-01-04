##### Image to ArrayBuffer


>Helper function to fetch image as ArrayBuffer

```
const fetchImageAsArrayBuffer = async (path) => {
    try {
      const response = await fetch(path); // Fetch the image from the path
      const buffer = await response.arrayBuffer(); // Convert response to ArrayBuffer
      return buffer; // Return the binary data
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error;
    }
  };
```

>Helper function to set image as ArrayBuffer with vanilla js


```
// Simulate a call to Dropbox or other service that can
// return an image as an ArrayBuffer.
var xhr = new XMLHttpRequest();

// Use JSFiddle logo as a sample image to avoid complicating
// this example with cross-domain issues.
xhr.open( "GET", "http://fiddle.jshell.net/img/logo.png", true );

// Ask for the result as an ArrayBuffer.
xhr.responseType = "arraybuffer";

xhr.onload = function( e ) {
    // Obtain a blob: URL for the image data.
    var arrayBufferView = new Uint8Array( this.response );
    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );
    var img = document.querySelector( "#photo" );
    img.src = imageUrl;
};

xhr.send();
```