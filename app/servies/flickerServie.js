flickerApp.factory('Flickr', function($http, $q){
      
        this.perPage =  30;
        this.api_key = "8cf23a7036c54aa833714440e597b0d3";
        this.secret  =  "57c93980703bc680";
        this.base_url= "https://api.flickr.com/services/rest/";

        this.search = function(search, page){
            var deferred = $q.defer();
//set params for api
            var params = {
                api_key: this.api_key,
                extras:'url_m,url_c,url_l,url_h,url_o',
                per_page: this.perPage,
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
            $http({method: 'GET', url: this.base_url, params: params}).
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