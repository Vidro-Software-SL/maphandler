# Map Component React Integration

#### Feb, 2025

## Getting Started

This example is a basic mapComponent integration based in React 19 and Next.js

Requirements:

Node & npm ^19. We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage multiple Node versions on a single server.


>Install project

```bash
npm install
```
>Run

```bash
npm run dev
```
You can create an `.env` file with default values for the API URL, user, and password. Simply rename `.env.sample` to `.env`:

```
NEXT_PUBLIC_APIURL="https://your api url"
NEXT_PUBLIC_USER="your user"
NEXT_PUBLIC_PWD="your password"
```

This example uses [Tailwindcss](https://tailwindcss.com) for layout


## Example flow

1. **Signs in to the Maps API**  

   The API sign-in request returns an authentication token and a list of maps the user can access.  

   If the sign-in is successful, a dropdown with available maps will be populated.  

2. **Select a map and click `Load map`**  

   The selected map will be loaded. 😉  

## Project structure

- **pages**
	- **index.js** is the main file

- **contexts**
	- **auth.js** handles user's sign in and sign out
	- **map.js** handles map info
	- **messajes** handles communication with map component (mapHandler integration)

- **hooks**
	- **useMapEvents** - custom hook for handling map events


- **components**
	- **AuthComponent** component with auth
	- **MapList** component with available maps
	- **MapIframe** component with map iframe
	- **MapButtons** component with map buttons
	- **MapLayers** component with map layers, with toggle button
	- **MapInfo** component for display map info
	- **MapFilters** component for handle filters

- **shared**
	- **constants.js** file with constants to minimize typos

	
## Step by step
* `components/SessionComponent` interacts with `contexts/auth.js` to handle sign-in and load the map list. Maps and the authentication token are stored in context state variables `projects` and `token`.  
* If sign-in is successful, `components/SessionComponent` displays a dropdown with the map list and a `Load Map` button.  
* When `Load Map` is clicked, it calls the `GetMap` method from `contexts/maps`. This sends a request to the maps API and retrieves the iframe URL along with the session token. The API response looks something like this:


```
{
    "message": {
        "sessionToken": "eyJ0eXAiOiJKV1QiLC.... very long",
        "iframe": "https:\/\/your.domain.com\/yourcomponent\/"
    }
}
```

* `contexts/maps` sets context vars `map` and `sessionToken`. `map` will contain the url required by the iframe:

```
 setSessionToken(message.essionToken);
      setMap(
        `${message.iframe}?sessionToken=${message.sessionToken}`
      );
``` 

* `components/MapIframe` will render the iframe and start the mapHandler library:

```
  useEffect(() => {
    if (!sessionToken) return;
    start(sessionToken); //starts communicator
  }, [sessionToken]);
```

* `hooks/useMapEvents` listens to map events. When the map is loaded, a `loaded` event is emitted, and a context variable `mapReady` is set to `true`. This ensures that all child components recognize when the map is ready for interaction.  


```
 useEffect(() => {
    if (!message) return;
    switch (message.type) {
      case MAP_EVENTS.LOADED:
        if (message.what === "map") {
          console.log("useMapEvents Map loaded and ready");
          setMapReady(true);
        }
        setMessage(null);
        break;
    }
  }, [message]);
```
  
 
Map is ready and buttons active!


## Map Events

The map emits several events. To avoid race conditions caused by concurrent events, we use a message queue.

In `contexts/messages.js` we manage this queue.

We have to state vars:

```
  const [message, setMessage] = useState(null);
  const [messageQueue, setMessageQueue] = useState([]);
```
 

We set listeners for the events we need:

``` 
useEffect(() => {
    if (!communicator) return;
    communicator.on(MAP_EVENTS.ZOOM_CHANGE, onMapEvent);
    communicator.on(MAP_EVENTS.LOADED, onMapEvent);

    return () => {
      if (!communicator) return;
      communicator.off(MAP_EVENTS.ZOOM_CHANGE, onMapEvent);
      communicator.off(MAP_EVENTS.LOADED, onMapEvent);
     
      setCommunicator(null);
    };
  }, [communicator, events]);
  
``` 
Each time an event is received we add the event to the queue

``` 
  const onMapEvent = (data) => {
    console.log(`onMapEvent`, { type: data.type, data });
    setMessageQueue((prevQueue) => [...prevQueue, data]);
  };
```
When `messageQueue` or `message` changes to `null`, we pick the next message in the queue `messageQueue[0]` 

```

  useEffect(() => {
    if (message) return;
    if (messageQueue.length === 0) {
      return;
    }
    setMessage(messageQueue[0]);
    setMessageQueue((prevQueue) => {
      return prevQueue.slice(1);
    });
  }, [messageQueue, message]);
```

In this project, all events are handled in `hooks/useMapEvents` , each event, when is handled sets `message` to `null` -> `setMessage(null)`, for example:

```
 useEffect(() => {
    if (!message) return;
    switch (message.type) {
      case MAP_EVENTS.LOADED:
        if (message.what === "map") {
          console.log("useMapEvents Map loaded and ready");
          setMapReady(true);
        }
        setMessage(null);
        break;
     
      default:
        setMessage(null);
        break;
    }
  }, [message, displayedLayers]);
```

## Adding elements to map

There's an example of how to add a point to map.

Button `Add point` starts the map component add point flow. 

```
const { drawPoint } = useMessages();
<button
    onClick={(e) => {
     console.log("Draw point");
     drawPoint({});
    }}
 >
Add point
</button>
```
When point is added, in `hooks/useMapEvents` we receive the event and we draw the geometry:

```
  useEffect(() => {
    if (!message) return;
    switch (message.type) {
 case MAP_EVENTS.GEOM_ADDED:
        console.log("GeomAdded", message);
        setCurrentMapAction(null);
        //Highlight the added geom
        Highlight(
          {
            feature_type: "HIGHLIGHT",
            geom: message?.geom_astext,
          },
          2,
          {
            duration: 1500,
            repeat: true,
          },
          0,
          null
        );
        if (message?.geom_astext === null) {
          setMessage(null);
          return;
        }
      }, [message, displayedLayers]);
```
 
Check [Highlight method documentation](https://github.com/Vidro-Software-SL/maphandler?tab=readme-ov-file#higlight) to understand method params

## Filtering layers

In `components/MapFilters` there's an example of how to apply filters

Method `applyFilter`:

- Checks if there is an active layer selected.
- Constructs a filter object based on the selected layer and filter criteria.
- Sends the filter to the mapComponent to be applied on the map.

## Next.js 

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

## Tailwindcss

o learn more about Tailwindcss, take a look [https://tailwindcss.com](https://tailwindcss.com)


## Support

Join us in [Discord](https://discord.com/channels/1305257097843179642/1305257098313072714) 

![](public/logo.png)

