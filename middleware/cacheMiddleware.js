var cacheInit =  require('express-expeditious')({
    namespace: 'expresscache',
    engine: require('expeditious-engine-memory')(),
    statusCodeExpires: {
        404: (30 * 1000),
        500: (60 * 1000)
    },    
    defaultTtl: '1 minute'
});

module.exports = cacheInit;