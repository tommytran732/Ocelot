const isProd: boolean = window.location.hostname === 'ocelot.thientran.io';
export const CLD_FN_BASE_URL: string = `https://ocelotbackend.thientran.io/`,
             LOGIN_CLIENT_ID: string = '373758885533-u7l9aljbkmlaa55q1u8tnug5p19lqd9u.apps.googleusercontent.com',
             MODULE_WL_URL: string = `https://raw.githubusercontent.com/umass-compsci220/ocelot-settings/master/libraries${isProd ? '' : '-beta'}.json`;
