flickerApp.factory('Flickr', function($http, $q){
        var self = this;
        self.perPage =  30;
        self.api_key = "8cf23a7036c54aa833714440e597b0d3";
        self.secret  =  "57c93980703bc680";
        self.base_url= "https://api.flickr.com/services/rest/";

        self.search = function(search, page){
            var deferred = $q.defer();
//set params for api
            var params = {
                api_key: self.api_key,
                extras:'url_m,url_c,url_l,url_h,url_o',
                per_page: self.perPage,
                format: 'json',
                nojsoncallback: 1,

                page: (page != null && page > 0) ? page : 1,
                method: (search != null && search.length > 0) ? 'flickr.photos.search' : 'flickr.photos.getRecent'
            };

            if ((search != null && search.length > 0)) {
                params.text = search;
            }
            //end 

//Call Api
            $http({method: 'GET', url: self.base_url, params: params}).
                success(function(data, status, headers, config) {
                     deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    deferred.reject(status);
                 });

            return deferred.promise;

        }
        return this;
    });