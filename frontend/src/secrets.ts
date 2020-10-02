const isProd: boolean = window.location.hostname === 'ocelot.thientran.io';
export const CLD_FN_BASE_URL: string = `http://127.0.0.1:8000/`,
             LOGIN_CLIENT_ID: string = '373758885533-u7l9aljbkmlaa55q1u8tnug5p19lqd9u.apps.googleusercontent.com',
             MODULE_WL_URL: string = `https://raw.githubusercontent.com/umass-compsci220/ocelot-settings/master/libraries${isProd ? '' : '-beta'}.json`;
