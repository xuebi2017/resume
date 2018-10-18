window.Model = function(options) {
    let resourceName = options.resourceName
    return {
        init: function() {
            var APP_ID = 'HhEuKxMOUvcurXcUSROh8N3s-gzGzoHsz';
            var APP_KEY = 'RNnAQNMKDhE8slfyWm8HTUtA';
            AV.init({
              appId: APP_ID,
              appKey: APP_KEY
            });
        },
        fetch: function() {
            var query = new AV.Query(resourceName);
            return query.find()  //promise对象
        },
        save: function(object) {
            var Instance = AV.Object.extend(resourceName);
            var instance = new Instance();
            return instance.save(object)  //promise对象
        }
    }
}