import Cookies from "js-cookie";
export const NAMES = {
  TOKEN: "componentReactExample-token",
  MAPID: "componentReactExample-mapId",
  MAPLIST: "componentReactExample-mapList",
};
// Default cookie setter, with the default expiry value:
const setCookie = (name, value, expires = 7) =>
  Cookies.set(name, value, { expires: expires });
// Token: User authentication token
export const getToken = () => Cookies.get(NAMES.TOKEN) ?? null;
export const setToken = (token) => setCookie(NAMES.TOKEN, token);
export const removeToken = () => Cookies.remove(NAMES.TOKEN);

// Map id:
export const getMapId = () => Cookies.get(NAMES.MAPID) ?? null;
export const setMapId = (token) => setCookie(NAMES.MAPID, token);
export const removeMapId = () => Cookies.remove(NAMES.MAPID);

// Map list:
export const getMapList = () => Cookies.get(NAMES.MAPLIST) ?? null;
export const setMapList = (token) => setCookie(NAMES.MAPLIST, token);
export const removeMapList = () => Cookies.remove(NAMES.MAPLIST);
