export default [
    {
        url: 'files/upload',
        type: 'post',
        response: () => {
            return {
                code: 20000,
                data: 'fileTest'
            }
        }
    },
    {
        url: /files\/get\/.*/,
        type: 'get',
        response: (config) => {
            console.log(config);
            return {
                code: 20000,
                data: ''
            }
        }
    }
];